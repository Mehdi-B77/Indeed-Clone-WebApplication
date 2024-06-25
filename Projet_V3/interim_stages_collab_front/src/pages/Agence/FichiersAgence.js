import React, { useState } from "react";
import { HeaderAgence, NavBarAgence, Modal } from "../../components";
import { FaFileUpload, FaFolder, FaEllipsisV } from "react-icons/fa";

export function FichiersAgence() {
	const handleClick = (id) => {
		window.location.href = `/agence/fichiers/${id}`;
	};

	const handleModalClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderAgence></HeaderAgence>
			<NavBarAgence selected={0}></NavBarAgence>
			<div className='m-6 bg-white rounded-lg p-4 relative'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Mes fichiers</p>
					<div className='relative '>
						<input
							type='file'
							id='fileInput'
							name='fileInput'
							accept='.csv, .xlsx, .xls'
							className='sr-only'
						/>
						<label
							htmlFor='fileInput'
							className='cursor-pointer flex items-center justify-center p-2 rounded-md bg-rouge text-violet text-sm font-bold hover:filter hover:brightness-90 transition-all duration-300'
						>
							<FaFileUpload className='mr-2' /> Importer
						</label>
					</div>
				</div>
				<div className='grid grid-cols-4 gap-4 mt-10'>
					<div
						className='flex items-center bg-violet p-4 rounded-lg hover:filter hover:brightness-90 transition-all duration-300 cursor-pointer'
						onClick={() => handleClick("Offres informatiques")}
					>
						<FaFolder color='#465475'></FaFolder>
						<p className='text-bleuF font-semibold ml-4'>
							Offres informatiques
						</p>
						<div className='ml-auto my-auto'>
							<Modal onClick={handleModalClick} />
						</div>
					</div>
					<div className='flex items-center bg-violet p-4 rounded-lg hover:filter hover:brightness-90 transition-all duration-300 cursor-pointer'>
						<FaFolder color='#465475'></FaFolder>
						<p className='text-bleuF font-semibold ml-4'>ESI</p>
						<div className='ml-auto my-auto'>
							<Modal />
						</div>
					</div>
					<div className='flex items-center bg-violet p-4 rounded-lg hover:filter hover:brightness-90 transition-all duration-300 cursor-pointer'>
						<FaFolder color='#465475'></FaFolder>
						<p className='text-bleuF font-semibold ml-4'>LIRMM</p>
						<div className='ml-auto my-auto'>
							<Modal />
						</div>
					</div>
					<div className='flex items-center bg-violet p-4 rounded-lg hover:filter hover:brightness-90 transition-all duration-300 cursor-pointer '>
						<FaFolder color='#465475'></FaFolder>
						<p className='text-bleuF font-semibold ml-4'>KPMG</p>
						<div className='ml-auto my-auto'>
							<Modal />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
