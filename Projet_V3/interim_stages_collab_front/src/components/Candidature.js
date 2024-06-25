import React, { useState, useEffect, useRef } from "react";
import {
	FaEllipsisV,
	FaDollarSign,
	FaFlag,
	FaBan,
	FaTag,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import cv from "../assets/cv.png";
import { MessageTab } from "./MessageTab";
import { Popup } from "./Popup";
import { axiosInstance } from "../util/axios";
import { FiExternalLink } from "react-icons/fi";
import { BloqueForm } from "./BloqueForm";
import { EtiquetteForm } from "./EtiquetteForm";
import { DocumentViewer } from "./DocumentViewer";

export function Candidature({
	candidature,
	onContact,
	onAccept,
	onRefuse,
	onSignal,
	onBloque,
	onAddEtiquette,
}) {
	// let Candidature = {
	// 	Id: "1",
	// 	Candidat: "Brahami Lamine",
	// 	"Titre de l'offre": "Jardinier",
	// 	Statut: "En attente",
	// 	"Date d'envoi": "13 Février 2024",
	// };
	const [showMessageTab, setShowMessageTab] = useState(false);
	const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
	const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
	const [showSignal, setShowSignal] = useState(false);
	const [showBloque, setShowBloque] = useState(false);
	const [showEtquetteForm, setShowEtiquetteForm] = useState(false);

	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/candidatures");
			if (response.status === 200) {
				console.log(response.data);
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUrl();
	}, []);

	const handleExternalLinkClick = () => {
		window.open(url + candidature.dossier.cv, "_blank");
	};

	const iframeRef = useRef(null);

	return (
		<div className='w-full bg-violet rounded-lg px-10 py-4'>
			<div className='flex'>
				<div>
					<div className='flex items-center space-x-2'>
						<p className='text-bleuF font-bold text-xl'>
							{candidature.chercheur ? candidature.chercheur.nom : ""}{" "}
							{candidature.chercheur ? candidature.chercheur.prenom : ""}
						</p>
						<div className='flex items-center space-x-2'>
							{candidature.etiquettes
								? candidature.etiquettes.map((item) => (
										<p className='text-violet bg-bleuF font-semibold p-1 rounded-lg'>
											{item.nom}
										</p>
								  ))
								: ""}
							<FaTag
								color='465475'
								size={15}
								className='cursor-pointer'
								onClick={() => setShowEtiquetteForm(true)}
							/>
						</div>
					</div>
					<div className='flex'>
						<p className='text-bleuF'>
							{candidature.createdAt ? candidature.createdAt.split("T")[0] : ""}
						</p>
						<p className='text-bleuF ml-4'>
							{candidature.chercheur ? candidature.chercheur.ville : ""}
						</p>
					</div>
				</div>
				<div className='flex items-center space-x-6 ml-auto my-auto'>
					<ButtonRond
						couleur={"violet"}
						couleurTexte={"bleuF"}
						contenu={"Répondre"}
						width={"fit border border-bleuF"}
						height={"h-8"}
						onClick={() => setShowMessageTab(true)}
					></ButtonRond>
					<ButtonRond
						couleur={"bleuF"}
						couleurTexte={"violet"}
						contenu={<FaFlag />}
						width={"fit"}
						height={"h-8"}
						onClick={() => setShowSignal(true)}
					></ButtonRond>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={<FaBan />}
						width={"fit"}
						height={"h-8"}
						onClick={() => setShowBloque(true)}
					></ButtonRond>
				</div>
			</div>
			<div className='grid grid-cols-4 gap-x-4'>
				{candidature.dossier ? (
					candidature.dossier.cv ? (
						<div>
							<FiExternalLink
								size={10}
								color={"#FF584D"}
								className='cursor-pointer'
								onClick={handleExternalLinkClick}
							/>
							<iframe
								ref={iframeRef}
								src={candidature.dossier ? url + candidature.dossier.cv : ""}
								width='100%'
								height='350px'
							/>
						</div>
					) : (
						"Aucun CV"
					)
				) : (
					""
				)}
				<div className='px-10 col-span-3 space-y-6'>
					<p className='text-bleuF font-bold text-lg'>A propos du condidat</p>
					<div className='grid grid-cols-4'>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Nom</p>
							<p className='text-sm text-bleuF'>
								{candidature.chercheur ? candidature.chercheur.nom : ""}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Prénom</p>
							<p className='text-sm text-bleuF'>
								{candidature.chercheur ? candidature.chercheur.prenom : ""}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Nationalité</p>
							<p className='text-sm text-bleuF'>
								{candidature.chercheur ? candidature.chercheur.nationalite : ""}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Ville</p>
							<p className='text-sm text-bleuF'>
								{candidature.chercheur ? candidature.chercheur.ville : ""}
							</p>
						</div>
					</div>
					<div>
						<p className='text-bleuF font-bold'>Motivation</p>
						<p className='text-sm text-bleuF'>
							{candidature.dossier ? candidature.dossier.motivation : ""}
						</p>
					</div>
					<div>
						<p className='text-bleuF font-bold'>Commentaires</p>
						<p className='text-sm text-bleuF'>
							{candidature.dossier ? candidature.dossier.commentaire : ""}
						</p>
					</div>
				</div>
			</div>

			{candidature.status === "En attente" ? (
				<div className='flex justify-end m-4 space-x-2'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Refuser"}
						width={"fit"}
						height={"fit"}
						onClick={() => setShowRefuseConfirmation(true)}
					/>
					<ButtonRond
						couleur={"vertF"}
						couleurTexte={"violet"}
						contenu={"Accepter"}
						width={"fit"}
						height={"fit"}
						onClick={() => setShowAcceptConfirmation(true)}
					/>
				</div>
			) : null}
			{showMessageTab && (
				<MessageTab
					onConfirm={(titre, contenu) =>
						onContact(candidature._id, titre, contenu)
					}
					onDismiss={() => setShowMessageTab(false)}
				/>
			)}
			{showSignal && (
				<MessageTab
					titre={"Signaler cette personne"}
					onConfirm={(titre, contenu) =>
						onSignal(titre, contenu, candidature.chercheur._id)
					}
					onDismiss={() => setShowSignal(false)}
				/>
			)}
			{showBloque && (
				<BloqueForm
					titre={
						'Bloquer "' +
						candidature.chercheur.nom +
						" " +
						candidature.chercheur.prenom +
						'"'
					}
					onConfirm={(motif) => onBloque(motif, candidature.chercheur._id)}
					onDismiss={() => setShowBloque(false)}
				/>
			)}
			{showEtquetteForm && (
				<EtiquetteForm
					titre={"Ajouter une étiquette"}
					onConfirm={(nom) => onAddEtiquette(nom, candidature._id)}
					onDismiss={() => setShowEtiquetteForm(false)}
				/>
			)}
			{showRefuseConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir refuser cette candidature ?"}
					onConfirm={() => onRefuse(candidature._id)}
					onDismiss={() => setShowRefuseConfirmation(false)}
				/>
			)}

			{showAcceptConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir d'accepter cette candidature ?"}
					onConfirm={() => onAccept(candidature._id)}
					onDismiss={() => setShowAcceptConfirmation(false)}
				/>
			)}
		</div>
	);
}
