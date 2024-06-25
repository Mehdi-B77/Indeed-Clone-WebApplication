import React, { useState } from "react";
import {
	FaTrashAlt,
	FaPen,
	FaFolder,
	FaCheckCircle,
	FaTimesCircle,
	FaTag,
} from "react-icons/fa";
import { Popup } from "./Popup";
import { ButtonCarre } from "./ButtonCarre";

export function TableauAgence({ data, type, onRowClick }) {
	const headers = Object.keys(data[0]);

	const [numCols, setNumCols] = useState(headers.length + 1);

	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [showRefusConfirmation, setShowRefusConfirmation] = useState(false);

	return (
		<div className='w-full mt-6 space-y-1'>
			<div
				className={`grid grid-cols-${numCols} text-center bg-bleuF items-center p-2 rounded-lg`}
			>
				{headers.map((header, index) => (
					<p key={index} className='text-violet text-sm font-bold'>
						{header}
					</p>
				))}
				<p className='text-violet text-sm font-bold'>Actions</p>
			</div>
			<div className='w-full space-y-1'>
				{data.map((item, itemIndex) => (
					<div
						key={itemIndex}
						className={`grid grid-cols-${numCols} text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
						onClick={() => onRowClick(item.Id)}
					>
						{headers.map((header, index) => (
							<p key={index} className='text-bleuF text-sm font-semibold'>
								{item[header]}
							</p>
						))}
						<div className='flex justify-center items-center space-x-4'>
							{type === "offres" ? (
								<>
									<FaFolder
										size={14}
										color={"#465475"}
										className='cursor-pointer'
									/>
									<FaPen
										size={12}
										color={"#465475"}
										className='cursor-pointer'
									/>
									<FaTrashAlt
										size={12}
										className='cursor-pointer'
										color='#FF584D'
										onClick={(e) => {
											e.stopPropagation();
											setShowDeleteConfirmation(true);
										}}
									/>
								</>
							) : (
								<>
									<FaTag size={12} color='#465475' className='cursor-pointer' />
									<FaCheckCircle
										size={12}
										color={
											item["Statut"] === "En attente" ? "#30CA3F" : "#CCCCCC"
										}
										className='cursor-pointer'
									/>
									<FaTimesCircle
										size={14}
										color={
											item["Statut"] === "En attente" ? "#FF584D" : "#CCCCCC"
										}
										className='cursor-pointer'
										onClick={(e) => {
											e.stopPropagation();
											setShowRefusConfirmation(true);
										}}
									/>
								</>
							)}
						</div>
					</div>
				))}
			</div>
			{showDeleteConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sur de vouloir supprimer cette offre ?"}
					onConfirm={() => {}}
					onDismiss={() => setShowDeleteConfirmation(false)}
				/>
			)}

			{showRefusConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sur de vouloir refuser cette candidature ?"}
					onConfirm={() => setShowRefusConfirmation(false)}
					onDismiss={() => setShowRefusConfirmation(false)}
				/>
			)}
		</div>
	);
}
