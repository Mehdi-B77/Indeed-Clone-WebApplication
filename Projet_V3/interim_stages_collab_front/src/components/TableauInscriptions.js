import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEnvelope } from "react-icons/fa";
import { Popup } from "./Popup";
import { MessageTab } from "./MessageTab";

export function TableauInscriptions({
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
		<div className='w-full mt-6 space-y-1'>
			{data.length === 0 ? (
				<>
					<div
						className={`grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg`}
					>
						<p className='text-violet text-sm font-bold'>Entreprise</p>
						<p className='text-violet text-sm font-bold'>Email</p>
						<p className='text-violet text-sm font-bold'>Date</p>
						<p className='text-violet text-sm font-bold'>Etat</p>
						<p className='text-violet text-sm font-bold'>Actions</p>
					</div>
					<p className='text-bleuF text-lg font-bold'>
						{vide ? "Aucune inscription" : ""}
					</p>
				</>
			) : (
				<>
					<div
						className={`grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg`}
					>
						<p className='text-violet text-sm font-bold'>Entreprise</p>
						<p className='text-violet text-sm font-bold'>Email</p>
						<p className='text-violet text-sm font-bold'>Date</p>
						<p className='text-violet text-sm font-bold'>Etat</p>

						<p className='text-violet text-sm font-bold'>Actions</p>
					</div>
					<div className='w-full space-y-1'>
						{data.map((item, itemIndex) => (
							<div
								key={itemIndex}
								className={`grid grid-cols-5 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
								onClick={() => onRowClick(item._id)}
							>
								<p className='text-bleuF text-sm font-semibold'>
									{item.entreprise}
								</p>
								<p className='text-bleuF text-sm font-semibold'>{item.email}</p>
								<p className='text-bleuF text-sm font-semibold'>
									{item.createdAt.split("T")[0]} |{" "}
									{item.createdAt.split("T")[1].split(".")[0]}
								</p>

								<p
									className={`text-sm font-semibold ${
										item.valide === "En attente"
											? "text-[#FFCC00]"
											: item.valide === "Validé"
											? "text-vertF"
											: item.valide === "Refusé"
											? "text-rouge"
											: "text-bleuF"
									}`}
								>
									{item.valide}
								</p>

								<div className='flex justify-center items-center space-x-4'>
									{item.valide === "En attente" ? (
										<>
											<FaEnvelope
												size={14}
												color={"#465475"}
												className='cursor-pointer'
												onClick={(e) => {
													setSelectedId(item._id);
													console.log(item._id);
													e.stopPropagation();
													setShowMessageTab(true);
												}}
											/>
											<FaCheckCircle
												size={12}
												color={"#30CA3F"}
												className='cursor-pointer'
												onClick={(e) => {
													setSelectedId(item._id);
													console.log(item._id);
													e.stopPropagation();
													setShowAcceptConfirmation(true);
												}}
											/>
											<FaTimesCircle
												size={14}
												color={"#FF584D"}
												className='cursor-pointer'
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
								</div>
							</div>
						))}
					</div>
				</>
			)}

			{showMessageTab && (
				<MessageTab
					onConfirm={(titre, contenu) => onContact(selectedId, titre, contenu)}
					onDismiss={() => setShowMessageTab(false)}
				/>
			)}

			{showRefuseConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir refuser cette inscription ?"}
					onConfirm={() => onRefuse(selectedId)}
					onDismiss={() => setShowRefuseConfirmation(false)}
				/>
			)}

			{showAcceptConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir d'accepter cette inscription ?"}
					onConfirm={() => onAccept(selectedId)}
					onDismiss={() => setShowAcceptConfirmation(false)}
				/>
			)}
		</div>
	);
}
