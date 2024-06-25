import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEdit, FaFileContract, FaFileUpload, FaDownload } from "react-icons/fa";
import { Popup } from "./Popup";
import { axiosInstance } from "../util/axios";

export function TableauConventionsChercheur({ data, onDelete }) {
    const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
    const [showRienModifier, setShowRienModifier] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedEtablissement, setSelectedEtablissement] = useState(null);
    const [selectedEmployeur, setSelectedEmployeur] = useState(null);

    const [showAddToConvention, setShowAddToConvention] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    const handleConfirm = async () => {
        try {
            let accessToken = localStorage.getItem("accessToken");

            const reader = new FileReader();
            reader.readAsDataURL(pdfFile);
            reader.onload = async function () {
                const pdfData = reader.result.split(',')[1];

                const response = await axiosInstance.post("/conventions/chercheur/add", {
                    selectedId,
                    selectedEtablissement,
                    selectedEmployeur,
                    pdfData
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log('PDF file sent successfully!');
                setShowAddToConvention(false);
                setPdfFile(null);
            };
        } catch (error) {
            console.error('Error sending PDF file:', error);
        }
    };

    const handleValide = async () => {
        let accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.post("/conventions/chercheur/valide", { selectedId, selectedEtablissement, selectedEmployeur, selectedStatus }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        setShowRienModifier(false);
        if (response.request.status === 200) {
            window.location.href = "/chercheur/conventions";
        }
    };

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    const downloadPDF = async (conventionId) => {
        try {
            const response = await axiosInstance.get(`/conventions/${conventionId}/pdf`, {
                responseType: 'arraybuffer'
            });

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);

            const downloadLink = document.createElement('a');
            downloadLink.href = pdfUrl;
            downloadLink.download = `convention_${conventionId}.pdf`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            return pdfUrl;
        } catch (error) {
            console.error('Error downloading PDF:', error);
            throw error;
        }
    };

    return (
        <div className="w-full mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-bleuF text-white">
                <tr>
                    <th className="py-3 px-6 text-left">Employeur</th>
                    <th className="py-3 px-6 text-left">Chercheur</th>
                    <th className="py-3 px-6 text-left">Etablissement</th>
                    <th className="py-3 px-6 text-left">Date de création</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                    <tr key={item._id} className="bg-violet text-bleuF font-semibold cursor-pointer hover:bg-violetF">
                        <td className="py-3 px-6">{item.employeur.entreprise}</td>
                        <td className="py-3 px-6">{item.chercheur.nom}</td>
                        <td className="py-3 px-6">{item.etablissement.nom}</td>
                        <td className="py-3 px-6">{new Date(item.createdAt).toLocaleString()}</td>
                        <td className={`
                            ${(item.status === "Attente Etablissement" || item.status === "Attente employeur" || item.status === "Attente etablissement") ? "text-[#E9C700]" : ""
                                } ${(item.status === "Annulé par stagiaire" || item.status === "Annulé par employeur" || item.status === "Annulé par etablissement")
                                    ? "text-[#DB1B17]"
                                    : ""
                                } ${item.status === "procédure terminée" ? "text-[#3EB54C]" : ""
                                } `}>{item.status}</td>

                        <td className="py-3 px-6 flex justify-start items-center space-x-4">

                                {item.status === "procédure terminée" ? (
                                    <>
                                        <FaDownload size={20} onClick={() => downloadPDF(item._id)} style={{ cursor: 'pointer' }} />
                                    </>
                                ) : (
                                    ""
                                )}
                                {item.status === "Attente Etablissement" ? (
                                    <>
                                        <FaTimesCircle
                                            size={20}
                                            color={"#FF584D"}
                                            className='cursor-pointer'
                                            onClick={() => {
                                                setSelectedId(item.Id);
                                                setShowRefuseConfirmation(true);
                                            }}
                                        />
                                    </>
                                ) : (
                                    ""
                                )}
                                {(item.status === "Attente stagiaire") && (
                                    <>
                                        <FaTimesCircle
                                            size={20}
                                            color={"#FF584D"}
                                            className='cursor-pointer'
                                            onClick={() => {
                                                setSelectedId(item._id);
                                                setShowRefuseConfirmation(true);
                                            }}
                                            style={{ marginRight: '10px' }}
                                        />

                                        <label htmlFor="pdfInput" style={pdfInputLabelStyle}>
                                            <FaFileContract size={20} color={"#465475"} />
                                        </label>
                                        <input
                                            type="file"
                                            id="pdfInput"
                                            accept="application/pdf"
                                            style={{ ...pdfInputStyle, marginRight: '10px' }}
                                            onChange={handleFileChange}
                                        />

                                        <FaCheckCircle
                                            size={20}
                                            color={"#30CA3F"}
                                            className='cursor-pointer'
                                            style={{ display: pdfFile ? 'inline-block' : 'none', marginRight: '10px' }}

                                            onClick={(e) => {
                                                setSelectedEtablissement(item.etablissement._id);
                                                setSelectedEmployeur(item.employeur._id);
                                                setSelectedId(item._id);
                                                e.stopPropagation();
                                                setShowAddToConvention(true);
                                            }}
                                        />
                                        <button onClick={(e) => {
                                            setSelectedEtablissement(item.etablissement._id);
                                            setSelectedEmployeur(item.employeur._id);
                                            setSelectedId(item._id);
                                            e.stopPropagation();
                                            setShowRienModifier(true)
                                        }} style={{ marginRight: '10px' }}>
                                            Rien à Modifier
                                        </button>
                                        <FaDownload size={20} onClick={() => downloadPDF(item._id)} style={{ cursor: 'pointer' }} />
                                    </>
                                )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showRefuseConfirmation && (
                <Popup
                    Titre={"Confirmation"}
                    Texte={"Êtes-vous sûr de vouloir refuser cette convention ?"}
                    onConfirm={() => onDelete(selectedId)}
                    onDismiss={() => setShowRefuseConfirmation(false)}
                />
            )}

            {showAddToConvention && (
                <Popup
                    Titre={"Confirmation"}
                    Texte={"Déposer la convention pour ce stage"}
                    onConfirm={handleConfirm}
                    onDismiss={() => setShowAddToConvention(false)}
                />
            )}

            {showRienModifier && (
                <Popup
                    Titre={"Confirmation"}
                    Texte={"Êtes-vous sûr de vouloir rien modifier pour cette convention"}
                    onConfirm={handleValide}
                    onDismiss={() => setShowRienModifier(false)}
                />
            )}
        </div>
    );
}
const pdfInputLabelStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    color: '#465475',
    fontSize: '14px',
    cursor: 'pointer'
};

const pdfInputStyle = {
    display: 'none'
};
