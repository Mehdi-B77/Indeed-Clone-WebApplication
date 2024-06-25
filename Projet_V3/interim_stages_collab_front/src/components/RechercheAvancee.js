import React, { useState, useRef } from "react";
import {
	FaTimesCircle,
	FaPlus,
	FaCalendarAlt,
	FaBuilding,
	FaDollarSign,
	FaMapMarkerAlt,
	FaBriefcase,
} from "react-icons/fa";
import { ButtonRond } from "./ButtonRond";

export function RechercheAvancee({ onClose, onConfirm }) {
	const entrepriseRef = useRef("");
	const lieuRef = useRef("");
	const metierRef = useRef("");
	const debutRef = useRef("");
	const finRef = useRef("");
	const salaireMinRef = useRef("");
	const salaireMaxRef = useRef("");

	return (
		<div>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 block`}
			/>
			<div className='fixed z-20 overlay flex flex-col items-center p-4 w-1/2 h-fit bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
				<div className='flex justify-between w-full mb-6'>
					<div>
						<h1 className='text-xl text-bleuF font-bold'>Recherche Avancée</h1>
						<p className='text-sm text-bleuF'>
							Faites une recherche avancée selon plusieurs critères pour trouver
							l’offre la plus adaptée à votre profil.
						</p>
					</div>
					<FaTimesCircle
						className='cursor-pointer'
						color='#465475'
						onClick={onClose}
					/>
				</div>
				<div className='grid grid-cols-5 gap-4 mb-6 w-full'>
					<div className='flex justify-start items-center space-x-2'>
						<FaCalendarAlt className='text-bleuF' />
						<p className='text-bleuF font-bold'> Dates</p>
					</div>
					<div className='flex flex-col col-span-2'>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='Date'
							ref={debutRef}
						></input>
					</div>
					<div className='flex flex-col col-span-2'>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='Date'
							ref={finRef}
						></input>
					</div>
				</div>
				<div className='grid grid-cols-5 gap-4 mb-6 w-full'>
					<div className='flex justify-start items-center space-x-2'>
						<FaDollarSign className='text-bleuF' />
						<p className='text-bleuF font-bold'>Salaire</p>
					</div>
					<div className='flex flex-col col-span-2'>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='number'
							ref={salaireMinRef}
							placeholder='Salaire Minimum'
						></input>
					</div>
					<div className='flex flex-col col-span-2'>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='number'
							ref={salaireMaxRef}
							placeholder='Salaire Maximum'
						></input>
					</div>
				</div>
				<div className='grid grid-cols-5 gap-4 mb-6 w-full'>
					<div className='flex justify-start items-center space-x-2'>
						<FaBuilding className='text-bleuF' />
						<p className='text-bleuF font-bold'>Entreprise</p>
					</div>
					<div className='flex flex-col col-span-2'>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={entrepriseRef}
							placeholder='Entreprise'
						></input>
					</div>
					<div className='col-span-2'></div>
				</div>
				<div className='grid grid-cols-5 gap-4 mb-6 w-full'>
					<div className='flex justify-start items-center space-x-2'>
						<FaMapMarkerAlt className='text-bleuF' />
						<p className='text-bleuF font-bold'>Lieu</p>
					</div>
					<div className='flex flex-col col-span-2'>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={lieuRef}
							placeholder='Lieu'
						></input>
					</div>
					<div className='col-span-2'></div>
				</div>
				<div className='grid grid-cols-5 gap-4 mb-6 w-full'>
					<div className='flex justify-start items-center space-x-2'>
						<FaBriefcase className='text-bleuF' />
						<p className='text-bleuF font-bold'>Métier</p>
					</div>
					<div className='flex flex-col col-span-2'>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={metierRef}
							placeholder='Métier'
						></input>
					</div>
					<div className='col-span-2'></div>
				</div>

				<div className='w-full mt-6'>
					<div className='flex justify-end'>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Rechercher"}
							width={"fit"}
							height={"fit"}
							onClick={() =>
								onConfirm(
									debutRef.current.value,
									finRef.current.value,
									salaireMinRef.current.value,
									salaireMaxRef.current.value,
									entrepriseRef.current.value,
									lieuRef.current.value,
									metierRef.current.value
								)
							}
						></ButtonRond>
					</div>
				</div>
			</div>
		</div>
	);
}
