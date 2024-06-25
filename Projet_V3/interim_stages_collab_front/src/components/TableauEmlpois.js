import React, { useState } from "react";
import { FaTimesCircle, FaCheckCircle, FaEnvelope, FaTrashAlt, FaCalendarPlus } from "react-icons/fa";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";

export function TableauEmplois({ data, onRowClick, onAddToAgenda, vide }) {
	const [selectedEmploi, setSelectedEmploi] = useState(null);
	const [showAddToAgenda, setShowAddToAgenda] = useState(false);

	return (
		<div className="w-full mt-6 overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
				<thead className="bg-bleuF text-white">
				<tr>
					<th className="py-3 px-6 text-left">Offre</th>
					<th className="py-3 px-6 text-left">Date debut</th>
					<th className="py-3 px-6 text-left">Date fin</th>
					<th className="py-3 px-6 text-left">Attestation</th>
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
						<tr key={itemIndex} className="bg-violet text-bleuF font-semibold cursor-pointer hover:bg-violetF">
							<td className="py-3 px-6">{item.offre.titre}</td>
							<td className="py-3 px-6">{item.offre.debut}</td>
							<td className="py-3 px-6">{item.offre.fin}</td>
							<td className="py-3 px-6">
								{item.attestation ? (
									item.attestation === "demandée" ? (
										<p className="text-rouge">Demandée</p>
									) : (
										<p className="text-vertF">Disponible</p>
									)
								) : (
									""
								)}
							</td>
							<td className="py-3 px-6 flex justify-center items-center space-x-4">
								{!item.agenda && (
									<FaCalendarPlus
										size={14}
										color={"#30CA3F"}
										className="cursor-pointer"
										onClick={(e) => {
											setSelectedEmploi(item._id);
											e.stopPropagation();
											setShowAddToAgenda(true);
										}}
									/>
								)}
							</td>
						</tr>
					))
				)}
				</tbody>
			</table>

			{showAddToAgenda && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir ajouter cet emploi à votre agenda ?"}
					onConfirm={() => onAddToAgenda(selectedEmploi)}
					onDismiss={() => setShowAddToAgenda(false)}
				/>
			)}
		</div>
	);
}
