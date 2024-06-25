import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { ButtonRond } from "./ButtonRond";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";

export function CadreUtilisateurE({ data, onBloque, onDebloque, onAvertir }) {
	const [showBloqueConfirmation, setShowBloqueConfirmation] = useState(false);
	const [showDebloqueConfirmation, setShowDebloqueConfirmation] =
		useState(false);
	const [showAvertissementTab, setShowAvertissementTab] = useState(false);

	return (
		<div className='w-full bg-violet rounded-lg px-4 py-4'>
			<div className='flex'>
				<div>
					<p className='text-bleuF font-bold text-xl'>
						{data.entreprise}{" "}
						{data.bloque ? <span className='text-rouge'>(Bloqué)</span> : ""}
					</p>
					<div className='flex items-center'>
						<MdLocationOn color='#465475' />
						<p className='text-bleuF'>
							{data.adresse ? data.adresse.rue : ""},{" "}
							{data.adresse ? data.adresse.ville : ""}
						</p>
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
				<p className='text-bleuF font-bold text-lg'>A propos de l’empoyeur</p>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Entreprise</p>
						<p className='text-sm text-bleuF'>{data.entreprise}</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Nom d’un service/département</p>
						<p className='text-sm text-bleuF'>{data.service}</p>
					</div>
					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>
							Nom d’un sous service/sous département
						</p>
						<p className='text-sm text-bleuF'>{data.sous_service}</p>
					</div>
				</div>
				<div className='grid grid-cols-3'>
					<div className='flex flex-col col-span-2 space-y-1'>
						<p className='text-bleuF font-bold'>
							Numéro nationale de l’entité dépositaire d’annonces
						</p>
						<p className='text-sm text-bleuF'>{data.numero_EDA}</p>
					</div>

					<div className='flex flex-col space-y-1'>
						<p className='text-bleuF font-bold'>Adresse</p>
						<p className='text-sm text-bleuF'>
							{data.adresse ? data.adresse.rue : ""},{" "}
							{data.adresse ? data.adresse.ville : ""}
						</p>
					</div>
				</div>
				{data.contacts
					? data.contacts.map((item, index) => (
							<div className='grid grid-cols-3'>
								<div className='flex flex-col space-y-1'>
									<p className='text-bleuF font-bold'>
										Nom personne contact {index + 1}
									</p>
									<p className='text-sm text-bleuF'>{item.nom}</p>
								</div>
								<div className='flex flex-col space-y-1'>
									<p className='text-bleuF font-bold'>
										Adresse mail {index + 1}{" "}
									</p>
									<p className='text-sm text-bleuF'>{item.email}</p>
								</div>
								<div className='flex flex-col space-y-1'>
									<p className='text-bleuF font-bold'>
										Numéro téléphone {index + 1}
									</p>
									<p className='text-sm text-bleuF'>{item.numero}</p>
								</div>
							</div>
					  ))
					: "Pas de contacts"}
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
