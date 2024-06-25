import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaExclamationTriangle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { ButtonRond } from "./ButtonRond";
import { axiosInstance } from "../util/axios";
import { Popup, MessageTab } from "../components";

export function CadreUtilisateurC({ data, onBloque, onDebloque, onAvertir }) {
	const [showBloqueConfirmation, setShowBloqueConfirmation] = useState(false);
	const [showDebloqueConfirmation, setShowDebloqueConfirmation] =
		useState(false);
	const [showAvertissementTab, setShowAvertissementTab] = useState(false);

	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/auth");
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

	return (
		<div className='w-full bg-violet rounded-lg px-4 py-4'>
			<div className='flex'>
				<img
					className='rounded-full w-12 h-12 border border-bleuF'
					src={data ? url + data.image : ""}
				></img>
				<div className='ml-4'>
					<p className='text-bleuF font-bold text-xl'>
						{data.nom} {data.prenom}{" "}
						{data.bloque ? <span className='text-rouge'>(Bloqué)</span> : ""}
					</p>
					<div className='flex items-center'>
						<MdLocationOn color='#465475' />
						<p className='text-bleuF'>{data.ville}</p>
					</div>
				</div>
				<div className='flex items-center ml-auto'>
					<ButtonRond
						couleur={"bleuF"}
						couleurTexte={"violet"}
						contenu={<FaExclamationTriangle />}
						width={"fit border border-bleuF"}
						height={"h-8"}
						onClick={() => setShowAvertissementTab(true)}
					></ButtonRond>
				</div>
			</div>
			<div className='py-6 space-y-4'>
				<p className='text-bleuF font-bold text-lg'>A propos de l'étudiant</p>
				<div className='grid grid-cols-4'>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nom</p>
						<p className='text-sm text-bleuF'>{data.nom}</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Prénom</p>
						<p className='text-sm text-bleuF'>{data.prenom}</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Date de naissance</p>
						<p className='text-sm text-bleuF'>{data.date_naissance}</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nationalité</p>
						<p className='text-sm text-bleuF'>{data.nationalite}</p>
					</div>
				</div>
				<div className='grid grid-cols-4'>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Email</p>
						<p className='text-sm text-bleuF'>{data.email}</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Téléphone</p>
						<p className='text-sm text-bleuF'>{data.numero}</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Ville</p>
						<p className='text-sm text-bleuF'>{data.ville}</p>
					</div>
				</div>
			</div>

			<div className='flex justify-end space-x-2'>
				{data.bloque ? (
					<ButtonRond
						couleur={"vertF"}
						couleurTexte={"violet"}
						contenu={"Débloquer"}
						width={"fit"}
						height={"fit"}
						onClick={() => setShowDebloqueConfirmation(true)}
					/>
				) : (
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Bloquer"}
						width={"fit"}
						height={"fit"}
						onClick={() => setShowBloqueConfirmation(true)}
					/>
				)}
			</div>

			{showBloqueConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir bloquer cet utilisateur ?"}
					onConfirm={() => onBloque()}
					onDismiss={() => setShowBloqueConfirmation(false)}
				/>
			)}

			{showDebloqueConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir débloquer cet utilisateur ?"}
					onConfirm={() => onDebloque()}
					onDismiss={() => setShowDebloqueConfirmation(false)}
				/>
			)}

			{showAvertissementTab && (
				<MessageTab
					titre={"Avertissement"}
					onConfirm={(titre, contenu) => onAvertir(titre, contenu)}
					onDismiss={() => setShowAvertissementTab(false)}
				/>
			)}
		</div>
	);
}
