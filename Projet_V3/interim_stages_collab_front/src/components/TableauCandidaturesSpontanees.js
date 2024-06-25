import React, { useState } from "react";

export function TableauCandidaturesSpontanees({ data, onRowClick, vide }) {
	const [selectedCandidature, setSelectedCandidature] = useState(null);

	return (
		<div>
			<div className='w-full mt-6 space-y-1'>
				{data.length === 0 ? (
					<>
						<div
							className={`grid grid-cols-3 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Employeurs</p>
							<p className='text-violet text-sm font-bold'>Metiers</p>
							<p className='text-violet text-sm font-bold'>Période</p>
						</div>
						<p className='text-bleuF text-lg font-bold'>Aucune candidature</p>
					</>
				) : (
					<>
						<div
							className={`grid grid-cols-3 text-center bg-bleuF items-center p-2 rounded-lg`}
						>
							<p className='text-violet text-sm font-bold'>Employeurs</p>
							<p className='text-violet text-sm font-bold'>Metiers</p>
							<p className='text-violet text-sm font-bold'>Période</p>
						</div>
						<div className='w-full space-y-1 '>
							{data.map((item, itemIndex) => (
								<div
									key={itemIndex}
									className={`grid grid-cols-3 text-center justify-center bg-violet items-center p-2 rounded-lg cursor-pointer`}
									onClick={() => onRowClick(item._id)}
								>
									<p className='text-bleuF text-sm font-semibold'>
										{item.employeurs.map((item) => item.entreprise)}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.metiers.map((item) => item.nom)}
									</p>
									<p className='text-bleuF text-sm font-semibold'>
										{item.date_debut} | {item.date_fin}
									</p>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
