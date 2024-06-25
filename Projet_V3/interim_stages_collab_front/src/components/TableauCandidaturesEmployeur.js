import React, { useState } from "react";
import { FaCheckCircle, FaEnvelope, FaTimesCircle } from "react-icons/fa";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";
import { FaMessage } from "react-icons/fa6";

export function TableauCandidaturesEmployeur({
	data,
	onRowClick,
	onAccept,
	onRefuse,
	onContact,
	vide,
}) {
	const [selectedId, setSelectedId] = useState(null);
	const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
	const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
	const [showMessageTab, setShowMessageTab] = useState(false);

	return (
		<div className="w-full mt-6 overflow-x-auto">
			<div className="w-full mt-6 space-y-1">
				{data.length === 0 ? (
					<>
						<div className="grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg">
							<p className="text-violet text-sm font-bold">Candidat</p>
							<p className="text-violet text-sm font-bold">Titre de l'offre</p>
							<p className="text-violet text-sm font-bold">Date</p>
							<p className="text-violet text-sm font-bold">Statut</p>
							<p className="text-violet text-sm font-bold">Actions</p>
						</div>
						<p className="text-bleuF text-lg font-bold">
							{vide ? "Aucune candidature" : ""}
						</p>
					</>
				) : (
					<>
						<div className="grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg">
							<p className="text-violet text-sm font-bold">Candidat</p>
							<p className="text-violet text-sm font-bold">Titre de l'offre</p>
							<p className="text-violet text-sm font-bold">Date</p>
							<p className="text-violet text-sm font-bold">Statut</p>
							<p className="text-violet text-sm font-bold">Actions</p>
						</div>
						<div className="w-full space-y-1">
							{data.map((item, itemIndex) => (
								<div
									key={itemIndex}
									className="grid grid-cols-5 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer"
									onClick={() => onRowClick(item._id)}
								>
									<p className="text-bleuF text-sm font-semibold">
										{item.chercheur ? item.chercheur.nom : ""}{" "}
										{item.chercheur ? item.chercheur.prenom : ""}
									</p>
									<p className="text-bleuF text-sm font-semibold">
										{item.offre ? item.offre.titre : ""}
									</p>
									<p className="text-bleuF text-sm font-semibold">
										{item.createdAt.split("T")[0]}
									</p>
									<p
										className={`${item.status === "En attente" ? "text-[#E9C700]" : ""
											} ${item.status === "Refusé" || item.status === "Supprimé"
												? "text-[#DB1B17]"
												: ""
											} ${item.status === "Validé" ? "text-[#3EB54C]" : ""
											} ${item.status === "Validé Validé" ? "text-[#3EB54C]" : ""
											}`}
									>
										{item.status === "Validé Convention" ? "En convention" : ""}
										{item.status === "En attente" ? "En attente" : ""}
										{item.status === "Refusé" ? "Refusée" : ""}
										{item.status === "Supprimé" ? "Supprimée" : ""}
										{item.status === "Validé" ? "Validée" : ""}
										{item.status === "Validé Validé"
											? "Validé par le chercheur"
											: ""}
									</p>
									<div className="flex justify-center items-center space-x-4">
										<>
											{item.status !== "Supprimé" ? (
												<FaMessage
													title={"Contacter"}
													size={14}
													color={"#91b9ad"}
													className="cursor-pointer"
													onClick={(e) => {
														setSelectedId(item._id);
														console.log(item._id);
														e.stopPropagation();
														setShowMessageTab(true);
													}}
												/>
											) : (
												""
											)}
											{item.status === "En attente" ? (
												<>
													<FaCheckCircle
														title={"Accepter"}
														size={12}
														color={"#00b149"}
														className="cursor-pointer"
														onClick={(e) => {
															setSelectedId(item._id);
															console.log(item._id);
															e.stopPropagation();
															setShowAcceptConfirmation(true);
														}}
													/>
													<FaTimesCircle

														title={"Refuser"}
														size={14}
														color={"#bd4b2b"}
														className="cursor-pointer"
														onClick={(e) => {
															setSelectedId(item._id);
															console.log(item._id);
															e.stopPropagation();
															setShowRefuseConfirmation(true);
														}}
													/>
												</>
											) : (
												""
											)}
										</>
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>
			{showMessageTab && (
				<MessageTab
					onConfirm={(titre, contenu) => onContact(selectedId, titre, contenu)}
					onDismiss={() => setShowMessageTab(false)}
				/>
			)}

			{showRefuseConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir refuser cette candidature ?"}
					onConfirm={() => onRefuse(selectedId)}
					onDismiss={() => setShowRefuseConfirmation(false)}
				/>
			)}

			{showAcceptConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir d'accepter cette candidature ?"}
					onConfirm={() => onAccept(selectedId)}
					onDismiss={() => setShowAcceptConfirmation(false)}
				/>
			)}
		</div>
	);
}

