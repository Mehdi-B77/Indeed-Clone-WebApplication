import React, { useState } from "react";
import {
	FaTimesCircle,
	FaCheckCircle,
	FaEnvelope,
	FaTrashAlt,
	FaCalendarPlus,
	FaHandshake,
	FaFileContract,
} from "react-icons/fa";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";

export function TableauCandidaturesChercheur({
	data,
	onRowClick,
	onDelete,
	onContact,
	onAccept,
	onRefuse,
	onConvention,
	vide,
}) {
	const [selectedCandidature, setSelectedCandidature] = useState(null);

	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
	const [showRefuseConfirmation, setShowRefuseConfirmation] = useState(false);
	const [showMessageTab, setShowMessageTab] = useState(false);
	const [showAddToConvention, setShowAddToConvention] = useState(false);

	return (
		<div className="w-full mt-6 overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
				<thead className="bg-bleuF text-white">
					<tr>
						<th className="py-3 px-6 text-left">Offre</th>
						<th className="py-3 px-6 text-left">Date d'envoi</th>
						<th className="py-3 px-6 text-left">Date de traitement</th>
						<th className="py-3 px-6 text-left">Statut</th>
						<th className="py-3 px-6 text-left">Actions</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.length === 0 ? (
						<tr className="bg-bleuF text-violet font-bold">
							<td colSpan="5" className="py-4 px-6 text-center">
								{vide ? "Aucune candidature" : ""}
							</td>
						</tr>
					) : (
						data.map((item, itemIndex) => (
							<tr
								key={itemIndex}
								className="bg-violet text-bleuF font-semibold cursor-pointer hover:bg-violetF"
								onClick={() => onRowClick(item._id)}
							>
								<td className="py-3 px-6">{item.offre.titre}</td>
								<td className="py-3 px-6">{item.createdAt.split("T")[0]}</td>
								<td className="py-3 px-6">{item.date_traitement || "-"}</td>
								<td className="py-3 px-6">
									<span
										className={`${item.status === "En attente" ? "text-[#E9C700]" : ""
											} ${item.status === "Refusé" || item.status === "Supprimé"
												? "text-[#DB1B17]"
												: ""
											} ${item.status === "Validé" ? "text-[#3EB54C]" : ""
											} ${item.status === "Validé Validé" ? "text-[#3EB54C]" : ""
											}`}
									>
										{item.status === "Validé Convention"
											? "En convention"
											: ""}
										{item.status === "En attente" ? "En attente" : ""}
										{item.status === "Refusé" ? "Refusée" : ""}
										{item.status === "Supprimé" ? "Supprimée" : ""}
										{item.status === "Validé" ? "Validée" : ""}
										{item.status === "Validé Validé"
											? "Validé par le chercheur"
											: ""}
									</span>
								</td>
								<td className="py-3 px-6 flex justify-start items-center space-x-4">
									<FaEnvelope
										size={14}
										color={"#465475"}
										className="cursor-pointer"
										onClick={(e) => {
											setSelectedCandidature(item._id);
											e.stopPropagation();
											setShowMessageTab(true);
										}}
									/>
									{item.status === "En attente" && (
										<FaTrashAlt
											size={14}
											color={"#FF584D"}
											className="cursor-pointer"
											onClick={(e) => {
												setSelectedCandidature(item._id);
												e.stopPropagation();
												setShowDeleteConfirmation(true);
											}}
										/>
									)}
									{item.status === "Validé" && (
										<>
											<FaCheckCircle
												size={12}
												color={"#30CA3F"}
												className="cursor-pointer"
												onClick={(e) => {
													setSelectedCandidature(item._id);
													e.stopPropagation();
													setShowAcceptConfirmation(true);
												}}
											/>
											<FaTimesCircle
												size={14}
												color={"#FF584D"}
												className="cursor-pointer"
												onClick={(e) => {
													setSelectedCandidature(item._id);
													e.stopPropagation();
													setShowRefuseConfirmation(true);
												}}
											/>
										</>
									)}
									{item.status === "Validé Validé" && (
										<FaFileContract
											size={12}
											color={"#465475"}
											className="cursor-pointer"
											onClick={(e) => {
												setSelectedCandidature(item._id);
												e.stopPropagation();
												setShowAddToConvention(true);
											}}
										/>
									)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{showMessageTab && (
				<MessageTab
					onConfirm={(titre, contenu) =>
						onContact(selectedCandidature, titre, contenu)
					}
					onDismiss={() => setShowMessageTab(false)}
				/>
			)}
			{showRefuseConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir refuser cette candidature ?"}
					onConfirm={() => {
						onRefuse(selectedCandidature);
					}}
					onDismiss={() => setShowRefuseConfirmation(false)}
				/>
			)}
			{showAcceptConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir d'accepter cette candidature ?"}
					onConfirm={() => {
						onAccept(selectedCandidature);
					}}
					onDismiss={() => setShowAcceptConfirmation(false)}
				/>
			)}
			{showDeleteConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir supprimer cette candidature ?"}
					onConfirm={() => onDelete(selectedCandidature)}
					onDismiss={() => setShowDeleteConfirmation(false)}
				/>
			)}
			{showAddToConvention && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir lancer une convention pour ce stage ?"}
					onConfirm={() => onConvention(selectedCandidature)}
					onDismiss={() => setShowAddToConvention(false)}
				/>
			)}
		</div>
	);
}
