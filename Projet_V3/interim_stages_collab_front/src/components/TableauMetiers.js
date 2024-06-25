import React, { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { Popup } from "./Popup";
import { MetierForm } from "./MetierForm";

export function TableauMetiers({ data, vide, onModify, onDelete }) {
	const [selectedId, setSelectedId] = useState(null);

	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [showForm, setShowForm] = useState(false);

	return (
		<div>
			<div className='w-full mt-6 space-y-1'>
				{data.length === 0 ? (
					<>
						<div
							className={`grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold text-left'>Nom</p>
							<p className='text-violet text-sm font-bold text-left'>
								Description
							</p>
							<p className='text-violet text-sm font-bold'>Secteur</p>
							<p className='text-violet text-sm font-bold'>Nombre d'offres</p>
							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<p className='text-bleuF text-lg font-bold'>
							{vide ? "Aucun métier" : ""}
						</p>
					</>
				) : (
					<>
						<div
							className={`grid grid-cols-5 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold text-left'>Nom</p>
							<p className='text-violet text-sm font-bold text-left'>
								Description
							</p>
							<p className='text-violet text-sm font-bold'>Secteur</p>
							<p className='text-violet text-sm font-bold'>Nombre d'offres</p>
							<p className='text-violet text-sm font-bold'>Actions</p>
						</div>
						<div className='w-full space-y-1'>
							{data.map((item, itemIndex) => (
								<div
									key={itemIndex}
									className={`grid grid-cols-5 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
								>
									<p className='text-bleuF text-sm font-semibold text-left'>
										{item.nom}
									</p>
									<p className='text-bleuF text-sm font-semibold text-left'>
										{item.description}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.secteur}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.offres.length}
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
				)}
			</div>
			{showForm && (
				<MetierForm
					id={selectedId}
					titre={"Modifier un métier"}
					onConfirm={(nom, secteur, description) => {
						onModify(selectedId, nom, secteur, description);
					}}
					onDismiss={() => setShowForm(false)}
				/>
			)}
			{showDeleteConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sûr de vouloir supprimer ce métier ?"}
					onConfirm={() => onDelete(selectedId)}
					onDismiss={() => setShowDeleteConfirmation(false)}
				/>
			)}
		</div>
	);
}
