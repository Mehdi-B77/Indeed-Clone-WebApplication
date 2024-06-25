import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { ButtonRond } from "./ButtonRond";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";
import { axiosInstance } from "../util/axios";

export function CadreInscription({ data, onAccept, onRefuse, onContact }) {
	const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
	const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
	const [showMessageTab, setShowMessageTab] = useState(false);

	return (
		<div className='w-full bg-violet rounded-lg px-4 py-4 space-y-6'>
			<div className='flex'>
				<div>
					<div className='flex'>
						<p className='text-bleuF font-bold text-xl'>{data.entreprise}</p>

						{data.valide === "Validé" ? (
							<p className='text-vertF font-bold text-xl ml-6'>Validée</p>
						) : (
							""
						)}

						{data.valide === "Refusé" ? (
							<p className='text-rouge font-bold text-xl ml-6'>Refusée</p>
						) : (
							""
						)}
					</div>
					<div className='flex items-center'>
						<MdLocationOn color='#465475' />
						<p className='text-bleuF'>
							{data.adresse.rue}, {data.adresse.ville}
						</p>
					</div>
				</div>
				<div className='flex items-center space-x-6 ml-auto my-auto'>
					<ButtonRond
						couleur={"violet"}
						couleurTexte={"bleuF"}
						contenu={"Contacter"}
						width={"fit border border-bleuF"}
						height={"h-8"}
						onClick={() => {
							setShowMessageTab(true);
						}}
					></ButtonRond>
					<div>
						<FaEllipsisV />
					</div>
				</div>
			</div>
			<div className='space-y-4 border border-bleuF rounded-lg p-4 relative'>
				<p className='text-bleuF font-bold text-lg absolute top-0 -mt-4 bg-violet px-4'>
					A propos de l’empoyeur
				</p>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nom de l’entreprise</p>
						<p className='text-sm text-bleuF'>{data.entreprise}</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nom d’un service/département</p>
						<p className='text-sm text-bleuF'>
							{data.service === "" ? "-" : data.service}
						</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>
							Nom d’un sous service/sous département
						</p>
						<p className='text-sm text-bleuF'>
							{data.sous_service === "" ? "-" : data.sous_service}
						</p>
					</div>
				</div>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col col-span-2 space-y-1'>
						<p className='text-bleuF font-bold'>
							Numéro nationale de l’entité dépositaire d’annonces
						</p>
						<p className='text-sm text-bleuF'>
							{data.numero_EDA === "" ? "-" : data.numero_EDA}
						</p>
					</div>

					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Adresse</p>
						<p className='text-sm text-bleuF'>
							{data.adresse.rue}, {data.adresse.ville}
						</p>
					</div>
				</div>
			</div>
			<div className='py-6 space-y-4 border border-bleuF rounded-lg p-4 relative'>
				<p className='text-bleuF font-bold text-lg absolute top-0 -mt-4 bg-violet px-4'>
					Contacts{" "}
				</p>
				{data.contacts.map((item, index) => (
					<div className='grid grid-cols-3'>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Nom {index + 1}</p>
							<p className='text-sm text-bleuF'>{item.nom}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Adresse mail {index + 1}</p>
							<p className='text-sm text-bleuF'>{item.email}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<p className='text-bleuF font-bold'>Téléphone {index + 1}</p>
							<p className='text-sm text-bleuF'>{item.numero}</p>
						</div>
					</div>
				))}
			</div>
			<div className='py-6 space-y-4 border border-bleuF rounded-lg p-4 relative'>
				<p className='text-bleuF font-bold text-lg absolute top-0 -mt-4 bg-violet px-4'>
					Liens publics
				</p>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Site web</p>
						<p className='text-sm text-bleuF'>
							{data.site_web === "" ? "-" : data.site_web}
						</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Facebook</p>
						<p className='text-sm text-bleuF'>
							{data.facebook === "" ? "-" : data.facebook}
						</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Linkedin</p>
						<p className='text-sm text-bleuF'>
							{data.linkedin === "" ? "-" : data.linkedin}
						</p>
					</div>
				</div>
			</div>

			{data.valide === "En attente" ? (
				<div className='flex justify-end m-4 space-x-2'>
					<ButtonRond
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Refuser"}
						width={"fit"}
						height={"fit"}
						onClick={() => {
							setShowRefuseConfirmation(true);
						}}
					/>
					<ButtonRond
						couleur={"vertF"}
						couleurTexte={"violet"}
						contenu={"Accepter"}
						width={"fit"}
						height={"fit"}
						onClick={() => {
							setShowAcceptConfirmation(true);
						}}
					/>
				</div>
			) : (
				""
			)}
			{showMessageTab && (
				<MessageTab
					onConfirm={(titre, contenu) => onContact(data._id, titre, contenu)}
					onDismiss={() => setShowMessageTab(false)}
				/>
			)}

			{showRefuseConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir refuser cette inscription ?"}
					onConfirm={() => onRefuse(data._id)}
					onDismiss={() => setShowRefuseConfirmation(false)}
				/>
			)}

			{showAcceptConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir d'accepter cette inscription ?"}
					onConfirm={() => onAccept(data._id)}
					onDismiss={() => setShowAcceptConfirmation(false)}
				/>
			)}
		</div>
	);
}
