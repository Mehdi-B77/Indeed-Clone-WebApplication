import React from "react";
import { ButtonCarre } from "./ButtonCarre";

export function Paiement({ onPass, onChange }) {
	return (
		<div className='overlay flex justify-center w-full'>
			<div className='z-50 justify-center items-center p-4 w-1/2 h-4/5 bg-bleuF rounded-lg'>
				<h1 className='text-xl text-violet font-bold mb-6 ml-4'>
					Complétez votre paiement
				</h1>

				<p className='text-sm text-violet font-bold m-4'>Payer avec : </p>

				<div className='grid grid-cols-2 gap-8 mx-4 mb-10'>
					<label className='flex items-center justify-start bg-violet w-full p-2 rounded-lg'>
						<input
							type='radio'
							name='options'
							className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
						/>
						<span className='ml-2 text-bleuF font-bold text-sm'>
							Carte bancaire
						</span>
					</label>

					<label className='flex items-center justify-start bg-violet w-full p-2 rounded-lg'>
						<input
							type='radio'
							name='options'
							className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
						/>
						<span className='ml-2 text-bleuF font-bold text-sm'>
							Prélévement automatique
						</span>
					</label>
				</div>

				<div className='flex flex-col m-4'>
					<label className='text-violet text-xs font-bold mb-2'>
						N° de carte :
					</label>
					<input
						className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
						type='number'
					></input>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10'>
					<div className='flex flex-col col-span-2'>
						<label className='text-violet text-xs font-bold mb-2'>
							Date d’xpiration :
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='number'
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold mb-2'>CVV :</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='number'
						></input>
					</div>
				</div>

				<div className='w-1/3 bg-violet mb-10 rounded-lg mx-auto'>
					<div className='flex justify-between px-4 py-2'>
						<p className='text-bleuF'>30£/mois</p>
						<p
							className='text-rouge underline text-sm cursor-pointer'
							onClick={onChange}
						>
							Changer
						</p>
					</div>
				</div>

				<div className='flex mx-4 mb-4'>
					<div className='w-full'>
						<ButtonCarre
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Payer"}
							width={"w-full"}
							height={"fit"}
						></ButtonCarre>
					</div>
				</div>
			</div>
		</div>
	);
}
