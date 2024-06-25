import React, { useState } from "react";
import { FaFlag, FaCheckCircle, FaTimesCircle, FaTag } from "react-icons/fa";
import { Popup } from "./Popup";

export function TableauGestionnaire({ data, type, onRowClick }) {
	const headers = Object.keys(data[0]);
	const numCols = headers.length + 1;

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
							<p
								key={index}
								className={`text-bleuF text-sm font-semibold ${
									header === "Etat" && item[header] === "Bloqué"
										? "text-rouge"
										: ""
								} ${
									header === "Etat" && item[header] === "Actif"
										? "text-vertF"
										: ""
								}`}
							>
								{item[header]}
							</p>
						))}
						<div className='flex justify-center items-center space-x-4'>
							{type === "inscriptions" ? (
								<>
									<FaCheckCircle
										size={12}
										color={"#30CA3F"}
										className='cursor-pointer'
									/>
									<FaTimesCircle
										size={14}
										color={"#FF584D"}
										className='cursor-pointer'
										onClick={(e) => {
											e.stopPropagation();
											setShowRefusConfirmation(true);
										}}
									/>
								</>
							) : (
								<>
									<FaFlag
										size={12}
										color='#465475'
										className='cursor-pointer'
									/>
									<FaTimesCircle
										size={14}
										color={"#FF584D"}
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

			{showRefusConfirmation && (
				<Popup
					Titre={"Confirmation"}
					Texte={"Êtes-vous sur de vouloir refuser cette inscription ?"}
					onConfirm={() => setShowRefusConfirmation(false)}
					onDismiss={() => setShowRefusConfirmation(false)}
				/>
			)}
		</div>
	);
}
