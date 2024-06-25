import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import google from "../assets/google.png";

export function CadreEmploi({ Emploi, className, onClick }) {
	return (
		<div
			className={`bg-violet rounded-lg w-full ${className} cursor-pointer border border-bleuF`}
			onClick={onClick}
		>
			<div className='flex w-full px-4 py-2'>
				<img
					className='rounded-full w-12 h-12 border border-bleuF'
					src={google}
				></img>

				<div className='flex flex-col w-full pl-4'>
					<div className='flex justify-between'>
						<div>
							<p className='text-bleuF font-bold'>
								{Emploi.offre ? Emploi.offre.titre : ""}
							</p>
							<p className='text-bleuF'>
								{Emploi.offre ? Emploi.offre.debut : ""} au{" "}
								{Emploi.offre ? Emploi.offre.fin : ""}
							</p>
						</div>
					</div>
					<div className='flex items-center justify-between mt-2 mr-6'>
						<div className='flex items-center'>
							<MdLocationOn color='#465475' />
							<p className='text-bleuF'>Montpellier</p>
						</div>
						<div className='flex items-center'>
							<FaDollarSign color='#465475' />
							<p className='text-bleuF'>
								{Emploi.offre ? Emploi.offre.remuneration : ""}
							</p>
						</div>
						<div className='flex items-center'>
							<TiTime size={20} color='#465475' />
							<p className='text-bleuF ml-1'>
								{Emploi.offre ? Emploi.offre.debut : ""}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
