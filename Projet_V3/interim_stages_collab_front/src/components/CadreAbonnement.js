import React from "react";

export function CadreAbonnement({ abonnement, className, onClick }) {
	return (
		<div
			className={`w-full bg-violet rounded-lg flex flex-col p-4 cursor-pointer ${className}`}
			onClick={onClick}
		>
			<div className='bg-bleu w-full h-10 rounded mb-2'></div>
			<div className='flex justify-between gap-4 w-full h-1/4'>
				<p className='text-rouge text-xs font-bold'>
					Abonnement {abonnement.nom}
				</p>
				<p className='text-bleuF text-xs font-bold'>{abonnement.prix}</p>
			</div>
			<div className='flex-grow border-t border-bleuF w-1/8'></div>

			<div className='flex justify-between gap-4 w-full py-1'>
				<p className='text-rouge text-xs font-bold'>Avantages</p>
				<p className='text-bleuF text-xs '>{abonnement.avantages}</p>
			</div>
			<div className='flex-grow border-t border-bleuF w-1/8'></div>
			<div className='flex justify-between gap-4 py-1'>
				<p className='text-rouge text-xs font-bold'>Conditions</p>
				<p className='text-bleuF text-xs '>{abonnement.conditions}</p>
			</div>
		</div>
	);
}
