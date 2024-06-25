import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { ButtonRond } from "./ButtonRond";

export function NouvelleEtiquette({ onClose, onConfirm }) {
	return (
		<div>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 block`}
			/>
			<div className='fixed z-50 overlay flex flex-col items-center p-4 w-1/4 h-fit bg-bleuF left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
				<div className='flex justify-between w-full mb-6'>
					<h1 className='text-xl text-violet font-bold'>Nouvelle étiquette</h1>
					<FaTimesCircle
						className='cursor-pointer absolute top-4 right-4'
						color='#EEEDFF'
						onClick={onClose}
					/>
				</div>

				<div className='flex flex-col mb-6 w-full'>
					<label className='text-violet text-xs font-bold'>
						Nom de l'étiquette
					</label>
					<input
						className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
						type='email'
					></input>
				</div>

				<div className='w-full'>
					<div className='flex justify-end'>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Ajouter"}
							width={"fit"}
							height={"fit"}
						></ButtonRond>
					</div>
				</div>
			</div>
		</div>
	);
}
