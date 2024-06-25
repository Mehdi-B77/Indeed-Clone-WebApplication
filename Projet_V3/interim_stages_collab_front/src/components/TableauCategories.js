import React, { useState } from "react";
import { FaTrashAlt, FaPen, FaArrowsAlt } from "react-icons/fa";
import { Popup } from "./Popup";
import { MetierForm } from "./MetierForm";
import { NouvelleCategorie } from "./NouvelleCategorie";

export function TableauCategories({
	data,
	onRowClick,
	vide,
	onModify,
	onDelete,
}) {
	const [selectedId, setSelectedId] = useState(0);

	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [showForm, setShowForm] = useState(false);

	return (
		<div>
			<div className='w-full mt-6 space-y-1'>
				<>
					<div className='w-full space-y-1'>
						<div
							className={`flex justify-between text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Nom</p>
							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<div
							className={`flex text-center justify-between  items-center p-2 rounded-lg cursor-pointer hover:filter hover:brightness-90 transition-all duration-300 ${
								selectedId === 0 ? "bg-vertF" : "bg-violet"
							}`}
							onClick={() => {
								onRowClick(0, "All");
								setSelectedId(0);
							}}
						>
							<p className='text-bleuF text-sm font-semibold text-left'>All</p>
						</div>
						{data.map((item, itemIndex) => (
							<div
								key={itemIndex}
								className={`flex text-center justify-between  items-center p-2 rounded-lg cursor-pointer hover:filter hover:brightness-90 transition-all duration-300 ${
									item._id === selectedId ? "bg-vertF" : "bg-violet"
								}`}
								onClick={() => {
									onRowClick(item._id, item.nom);
									setSelectedId(item._id);
								}}
							>
								<p className='text-bleuF text-sm font-semibold text-left'>
									{item.nom}
								</p>

								<div className='flex justify-center items-center space-x-4'>
									<>
										<FaPen
											size={12}
											color={"#465475"}
											className='cursor-pointer'
											onClick={(e) => {
												setSelectedId(item._id);
												console.log(item._id);
												e.stopPropagation();
												setShowForm(true);
											}}
										/>
										<FaTrashAlt
											size={14}
											color={"#FF584D"}
											className='cursor-pointer'
											onClick={(e) => {
												setSelectedId(item._id);
												console.log(item._id);
												e.stopPropagation();
												setShowDeleteConfirmation(true);
											}}
										/>
									</>
								</div>
							</div>
						))}
					</div>
				</>
			</div>
			{showForm && (
				<NouvelleCategorie
					id={selectedId}
					titre={"Modifier une catégorie"}
					onConfirm={(nom, description) => {
						onModify(selectedId, nom, description);
					}}
					onDismiss={() => setShowForm(false)}
				/>
			)}
			{showDeleteConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir supprimer cette catégorie ?"}
					onConfirm={() => onDelete(selectedId)}
					onDismiss={() => setShowDeleteConfirmation(false)}
				/>
			)}
		</div>
	);
}
