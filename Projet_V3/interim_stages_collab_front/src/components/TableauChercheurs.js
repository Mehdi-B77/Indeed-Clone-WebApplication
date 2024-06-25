import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";

export function TableauChercheurs({
	data,
	onRowClick,
	onBloque,
	onDebloque,
	onAvertir,
	vide,
}) {
	const [selectedId, setSelectedId] = useState(null);

	const [showBloqueConfirmation, setShowBloqueConfirmation] = useState(false);
	const [showDebloqueConfirmation, setShowDebloqueConfirmation] =
		useState(false);
	const [showAvertissementTab, setShowAvertissementTab] = useState(false);

	return (
		<div>
			<div className='w-full mt-6 space-y-1'>
				{data.length === 0 ? (
					<>
						<div
							className={`grid grid-cols-7 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Nom</p>
							<p className='text-violet text-sm font-bold'>Email</p>
							<p className='text-violet text-sm font-bold'>Date</p>
							<p className='text-violet text-sm font-bold'>Etat</p>
							<p className='text-violet text-sm font-bold'>Nb signal</p>
							<p className='text-violet text-sm font-bold'>Nb Avert</p>
							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<p className='text-bleuF text-lg font-bold'>
							{vide ? "Aucune inscription" : ""}
						</p>
					</>
				) : (
					<>
						<div
							className={`grid grid-cols-7 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Nom</p>
							<p className='text-violet text-sm font-bold'>Email</p>
							<p className='text-violet text-sm font-bold'>Date</p>
							<p className='text-violet text-sm font-bold'>Etat</p>
							<p className='text-violet text-sm font-bold'>Nb signal</p>
							<p className='text-violet text-sm font-bold'>Nb Avert</p>
							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<div className='w-full space-y-1'>
							{data.map((item, itemIndex) => (
								<div
									key={itemIndex}
									className={`grid grid-cols-7 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
									onClick={() => onRowClick(item._id)}
								>
									<p className='text-bleuF text-sm font-semibold'>
										{item.nom} {item.prenom}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.email}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.createdAt.split("T")[0]} |{" "}
										{item.createdAt.split("T")[1].split(".")[0]}
									</p>

									<p
										className={`text-sm font-semibold ${
											item.bloque ? "text-rouge" : "text-vertF"
										}`}
									>
										{item.bloque ? "Bloqué" : "Actif"}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.signalements ? item.signalements.length : 0}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.avertissements ? item.avertissements.length : 0}
									</p>

									<div className='flex justify-center items-center space-x-4'>
										{item.bloque ? (
											<>
												<FaCheckCircle
													size={12}
													color={"#30CA3F"}
													className='cursor-pointer'
													onClick={(e) => {
														setSelectedId(item._id);
														console.log(item._id);
														e.stopPropagation();
														setShowDebloqueConfirmation(true);
													}}
												/>
												<FaExclamationTriangle
													size={12}
													color={"f59e0b"}
													className='cursor-pointer'
													onClick={(e) => {
														setSelectedId(item._id);
														console.log(item._id);
														e.stopPropagation();
														setShowAvertissementTab(true);
													}}
												/>
											</>
										) : (
											<>
												<FaTimesCircle
													size={14}
													color={"#FF584D"}
													className='cursor-pointer'
													onClick={(e) => {
														setSelectedId(item._id);
														console.log(item._id);
														e.stopPropagation();
														setShowBloqueConfirmation(true);
													}}
												/>
												<FaExclamationTriangle
													size={12}
													color={"f59e0b"}
													className='cursor-pointer'
													onClick={(e) => {
														setSelectedId(item._id);
														console.log(item._id);
														e.stopPropagation();
														setShowAvertissementTab(true);
													}}
												/>
											</>
										)}
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>
			{showBloqueConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir bloquer cet utilisateur ?"}
					onConfirm={() => onBloque(selectedId)}
					onDismiss={() => setShowBloqueConfirmation(false)}
				/>
			)}

			{showDebloqueConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir débloquer cet utilisateur ?"}
					onConfirm={() => onDebloque(selectedId)}
					onDismiss={() => setShowDebloqueConfirmation(false)}
				/>
			)}

			{showAvertissementTab && (
				<MessageTab
					titre={"Avertissement"}
					onConfirm={(titre, contenu) => onAvertir(selectedId, titre, contenu)}
					onDismiss={() => setShowAvertissementTab(false)}
				/>
			)}
		</div>
	);
}
