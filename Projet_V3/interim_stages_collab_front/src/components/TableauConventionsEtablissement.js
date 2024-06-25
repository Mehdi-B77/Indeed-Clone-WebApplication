import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEdit, FaFileContract, FaFileUpload, FaDownload } from "react-icons/fa";
import { Popup } from "./Popup";
import { axiosInstance } from "../util/axios";

export function TableauConventionsEtablissement({ data }) {
    const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedChercheur, setSelectedChercheur] = useState(null);
    const [selectedEmployeur, setSelectedEmployeur] = useState(null);

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
                const response = await axiosInstance.post("/conventions/etablissement/add", {
                    selectedId,
                    selectedChercheur,
                    selectedEmployeur,
                    pdfData // Envoyer le contenu base64 du fichier PDF
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log('Fichier PDF envoyé avec succès !');
                setShowAddToConvention(false);
                setPdfFile(null);
                if (response.request.status === 200) {
                    window.location.href = "/etablissement/conventions";
                }
            };
        } catch (error) {
            console.error('Erreur lors de l\'envoi du fichier PDF :', error);
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
                            <p className='text-bleuF text-sm font-semibold'>{new Date(item.createdAt).toLocaleString()}</p>
                            <p className={`
                            ${(item.status === "Attente Etablissement" || item.status === "Attente employeur" || item.status === "Attente etablissement") ? "text-[#E9C700]" : ""
                                } ${(item.status === "Annulé par stagiaire" || item.status === "Annulé par employeur" || item.status === "Annulé par etablissement")
                                    ? "text-[#DB1B17]"
                                    : ""
                                } ${item.status === "procédure terminée" ? "text-[#3EB54C]" : ""
                                } `}>{item.status}</p>
                            <div className='flex justify-center items-center space-x-4'>
                                {item.status !== "Attente Etablissement" && (
                                    <>
                                        <FaDownload onClick={() => downloadPDF(item._id)} style={{ cursor: 'pointer' }} />

                                    </>
                                )}

                                {item.status === "Attente stagiaire" && item.status !== "Attente employeur"  (
                                    <>
                                        <FaTimesCircle
                                            size={14}
                                            color={"#FF584D"}
                                            className='cursor-pointer'
                                            onClick={() => {
                                                setSelectedId(item._id);
                                                setShowRefuseConfirmation(true);
                                            }}
                                        />

                                    </>
                                )}
                                {item.status === "Attente Etablissement" && (
                                    <>
                                        <FaTimesCircle
                                            size={14}
                                            color={"#FF584D"}
                                            className='cursor-pointer'
                                            onClick={() => {
                                                setSelectedId(item._id);
                                                setShowRefuseConfirmation(true);
                                            }}
                                        />

                                        <label htmlFor="pdfInput" style={pdfInputLabelStyle}>
                                            <FaFileContract size={12} color={"#465475"} />
                                        </label>
                                        <input
                                            type="file"
                                            id="pdfInput"
                                            accept="application/pdf"
                                            style={pdfInputStyle}
                                            onChange={handleFileChange}
                                        />

                                        <FaCheckCircle
                                            size={12}
                                            color={"#30CA3F"}
                                            className='cursor-pointer'
                                            style={{ display: pdfFile ? 'inline-block' : 'none' }}

                                            onClick={(e) => {
                                                setSelectedChercheur(item.chercheur._id);
                                                setSelectedEmployeur(item.employeur._id);
                                                setSelectedId(item._id);
                                                e.stopPropagation();
                                                setShowAddToConvention(true);
                                            }}
                                        />
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
                    onConfirm={() => {
                        // Logique pour refuser la convention
                        setShowRefuseConfirmation(false);
                    }}
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
        </div>
    );
}

// Styles en ligne pour l'input de fichier PDF et son label
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
