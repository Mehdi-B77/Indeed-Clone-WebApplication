import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEdit, FaFileContract, FaDownload, FaPen } from "react-icons/fa";
import { Popup } from "./Popup";
import { axiosInstance } from "../util/axios";

export function TableauConventionEmployeur({ data, onDelete }) {

    const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
    const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedEtablissement, setSelectedEtablissement] = useState(null);
    const [selectedChercheur, setSelectedChercheur] = useState(null);
    const [selectedEmployeur, setSelectedEmployeur] = useState(null);
    const [showRienmodifier, setShowRienmodifier] = useState(false);
    const [selectedStatus, setselectedStatus] = useState(null);

    const [ShowAddToConvention, setShowAddToConvention] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    const handleConfirm = async () => {
        try {
            let accessToken = localStorage.getItem("accessToken");

            // Lire le contenu du fichier PDF sous forme de chaîne base64
            const reader = new FileReader();
            reader.readAsDataURL(pdfFile);
            reader.onload = async function () {
                const pdfData = reader.result.split(',')[1]; // Récupérer uniquement la partie encodée en base64

                // Envoyer le contenu encodé en base64 au serveur
                const response = await axiosInstance.post("/conventions/employeur/add", {
                    selectedId,
                    selectedEtablissement,
                    selectedChercheur,
                    pdfData // Envoyer le contenu base64 du fichier PDF
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log('Fichier PDF envoyé avec succès !');
                setShowAddToConvention(false);
                setPdfFile(null);
            };
        } catch (error) {
            console.error('Erreur lors de l\'envoi du fichier PDF :', error);
        }
    };
    const handleValide = async () => {
        let accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.post("/conventions/employeur/valide", { selectedId, selectedEtablissement, selectedChercheur, selectedStatus }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        setShowRienmodifier(false);
        if (response.request.status === 200) {
            window.location.href = "/employeur/conventions";
        }
    };

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);
    };
    const downloadPDF = async (conventionId) => {
        try {
            // Faites une requête GET au backend pour récupérer le PDF
            const response = await axiosInstance.get(`/conventions/${conventionId}/pdf`, {
                responseType: 'arraybuffer' // Spécifiez le type de réponse comme tableau d'octets
            });

            // Créez un objet Blob à partir des données du PDF
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Générer une URL pour le Blob
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Créer un lien de téléchargement
            const downloadLink = document.createElement('a');
            downloadLink.href = pdfUrl;
            downloadLink.download = `convention_${conventionId}.pdf`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // Retourne l'URL du PDF (au cas où vous auriez besoin de le manipuler davantage)
            return pdfUrl;
        } catch (error) {
            console.error('Erreur lors de la récupération du PDF:', error);
            throw error; // Gérer l'erreur en conséquence dans votre composant
        }
    };
    return (
        <div>
            <div className='w-full mt-6 space-y-1'>
                <div className='grid grid-cols-8 text-center bg-bleuF items-center p-2 rounded-lg'>
                    <p className='text-violet text-sm font-bold'>Employeur</p>
                    <p className='text-violet text-sm font-bold'>chercheur</p>
                    <p className='text-violet text-sm font-bold'>etablissement</p>
                    <p className='text-violet text-sm font-bold'>Date de création</p>
                    <p className='text-violet text-sm font-bold'>Status</p>
                    <p className='text-violet text-sm font-bold'>Actions</p>


                </div>
                <div className='w-full space-y-1'>
                    {data.map((item) => (
                        <div
                            key={item._id}
                            className='grid grid-cols-8 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer'
                        >
                            <p className='text-bleuF text-sm font-semibold'>{item.employeur.entreprise}</p>
                            <p className='text-bleuF text-sm font-semibold'>{item.chercheur.nom}</p>
                            <p className='text-bleuF text-sm font-semibold'>{item.etablissement.nom}</p>
                            <p className='text-bleuF text-sm font-semibold'>{new Date(item.createdAt).toLocaleString()}</p> {/* Affiche la date de création */}
                            <p className={`
                            ${(item.status === "Attente Etablissement" || item.status === "Attente employeur" || item.status === "Attente etablissement") ? "text-[#E9C700]" : ""
                                } ${(item.status === "Annulé par stagiaire" || item.status === "Annulé par employeur" || item.status === "Annulé par etablissement")
                                    ? "text-[#DB1B17]"
                                    : ""
                                } ${item.status === "procédure terminée" ? "text-[#3EB54C]" : ""
                                } `}>{item.status}</p>

                            <div className='text-bleuF text-sm font-semibold' style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', width: '200px' }}>
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
                                {(item.status === "Attente employeur") && (
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
                                                setSelectedChercheur(item.chercheur._id);
                                                setSelectedId(item._id);
                                                e.stopPropagation();
                                                setShowAddToConvention(true);
                                            }}
                                        />
                                        <button onClick={(e) => {
                                            setSelectedEtablissement(item.etablissement._id);
                                            setSelectedChercheur(item.chercheur._id);
                                            setselectedStatus(item.status)
                                            setSelectedId(item._id);
                                            e.stopPropagation();
                                            setShowRienmodifier(true);
                                        }} style={{ marginRight: '10px' }}>
                                            Rien à Modifier
                                        </button>
                                        <FaDownload size={20} onClick={() => downloadPDF(item._id)} style={{ cursor: 'pointer' }} />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showRefuseConfirmation && (
                <Popup
                    Titre={"Confirmation"}
                    Texte={"Êtes-vous sûr de vouloir refuser cette convention ?"}
                    onConfirm={() => onDelete(selectedId)}
                    onDismiss={() => setShowRefuseConfirmation(false)}
                />
            )}


            {ShowAddToConvention && (
                <Popup
                    Titre={"Confirmation"}
                    Texte={"Déposer la convention pour ce stage"}
                    onConfirm={handleConfirm}
                    onDismiss={() => setShowAddToConvention(false)}
                />
            )}

            {showRienmodifier && (
                <Popup
                    Titre={"Confirmation"}
                    Texte={"Êtes-vous sûr de vouloir rien modifier pour cette convention"}
                    onConfirm={handleValide}
                    onDismiss={() => setShowRienmodifier(false)}
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
