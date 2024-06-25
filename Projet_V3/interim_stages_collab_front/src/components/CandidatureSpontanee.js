import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaFlag } from "react-icons/fa";
import { RiEdit2Fill , FiExternalLink } from "react-icons/fi";
import { ButtonRond } from "./ButtonRond";
import cv from "../assets/cv.png";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";
import { MotivationForm } from "./MotivationForm";
import { CommentaireForm } from "./CommentaireForm";
import { Map } from "./Map";
import { axiosInstance } from "../util/axios";

export function CandidatureSpontanee({
	candidature,
	onDelete,
	onContact,
	onUpdate,
}) {
	// let Candidature = {
	// 	Id: "1",
	// 	Candidat: "Brahami Lamine",
	// 	"Titre de l'offre": "Jardinier",
	// 	Statut: "En attente",
	// 	"Date d'envoi": "13 Février 2024",
	// };
	const [showMessageTab, setShowMessageTab] = useState(false);
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

	return (
		<div className='grid grid-cols-3 gap-2'>
			<div className='bg-white rounded-lg px-10 py-4 border border-bleuF'>
				<div className='flex'>
					<div>
						<p className='text-bleuF font-bold text-xl'>
							{candidature.chercheur ? candidature.chercheur.nom : ""}{" "}
							{candidature.chercheur ? candidature.chercheur.prenom : ""}
						</p>
						<div className='flex'>
							<p className='text-bleuF'>
								{candidature.createdAt
									? candidature.createdAt.split("T")[0]
									: ""}
							</p>
						</div>
					</div>
				</div>
				<div className='flex justify-between mt-6'>
					{candidature.dossier ? (
						candidature.dossier.cv ? (
							<div>
								<FiExternalLink
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={handleExternalLinkClick}
								/>
								<object
									data={candidature.dossier ? url + candidature.dossier.cv : ""}
									type='application/pdf'
									width='100%'
									height='400px'
								/>
							</div>
						) : (
							"Aucun CV"
						)
					) : (
						""
					)}

					<div className='px-10 col-span-3 space-y-6 '>
						<div className='flex-col space-y-4'>
							<div className='flex flex-col space-y-1'>
								<p className='text-sm text-bleuF '>Nom</p>
								<p className=' text-bleuF font-bold'>
									{candidature.chercheur ? candidature.chercheur.nom : ""}
								</p>
							</div>
							<div className='flex flex-col space-y-1'>
								<p className='text-bleuF text-sm '>Prénom</p>
								<p className=' text-bleuF font-bold'>
									{candidature.chercheur ? candidature.chercheur.prenom : ""}
								</p>
							</div>
							<div className='flex flex-col space-y-1'>
								<p className='text-bleuF text-sm'>Nationalité</p>
								<p className=' text-bleuF font-bold'>
									{candidature.chercheur
										? candidature.chercheur.nationalite
										: ""}
								</p>
							</div>
							<div className='flex flex-col space-y-1'>
								<p className='text-bleuF text-sm'>Ville</p>
								<p className=' text-bleuF font-bold'>
									{candidature.chercheur ? candidature.chercheur.ville : ""}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-span-2 space-y-2'>
				<div className='bg-white rounded-lg px-10 py-4 border border-bleuF'>
					<div className='flex flex-col justify-center'>
						<p className='text-rouge text-sm '>Liste des employeurs</p>
						<div className='flex-col space-y-4'>
							{candidature.employeurs
								? candidature.employeurs.map((item) => (
										<p className='text-lg text-bleuF font-bold'>
											{item.entreprise}
										</p>
								  ))
								: ""}
						</div>
					</div>
				</div>
				<div className='bg-white rounded-lg px-10 py-4 border border-bleuF'>
					<div className='flex flex-col justify-center'>
						<p className='text-rouge text-sm'>Liste des métiers</p>
						<div className='flex-col space-y-4'>
							{candidature.metiers
								? candidature.metiers.map((item) => (
										<p className='text-lg text-bleuF font-bold'>{item.nom}</p>
								  ))
								: ""}
						</div>
					</div>
				</div>
				<div className='bg-white rounded-lg px-10 py-4 border border-bleuF'>
					<div className='flex flex-col justify-center'>
						<p className='text-rouge text-sm '>Période</p>
						<div className='flex-col space-y-4'>
							<p className='text-lg text-bleuF'>
								Du <b>{candidature.date_debut}</b> au{" "}
								<b>{candidature.date_fin}</b>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
