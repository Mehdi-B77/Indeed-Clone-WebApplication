import React, { useState, useRef } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { FaUsers } from "react-icons/fa";

export function NouveauGroupe({ onConfirm, onDismiss }) {
	const [loading, setLoading] = useState(false);
	const nomRef = useRef("");
	const descriptionRef = useRef("");

	const handleConfirm = async () => {
		const nom = nomRef.current.value;
		const description = descriptionRef.current.value;
		try {
			setLoading(true);

			await onConfirm(nom, description);
			setTimeout(() => {
				setLoading(false);
				onDismiss();
			}, 1000);
		} catch (error) {
			console.error("Confirmation error:", error);
			setLoading(false);
		}
	};

	return (
		<div className='fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			{!loading && (
				<div className=' w-1/3 h-fit bg-white p-4 rounded-md space-y-8'>
					<div className='space-y-2'>
						<div className='flex items-center justify-center space-x-2'>
							<p className='text-lg font-bold text-bleuF text-center'>
								Nouveau Groupe
							</p>
							<FaUsers size={30} className='text-bleuF' />
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Nom du groupe</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='1'
								ref={nomRef}
							></textarea>
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Description</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='3'
								ref={descriptionRef}
							></textarea>
						</div>
					</div>
					<div className='flex justify-end space-x-2'>
						<ButtonCarre
							couleur={"bleuF"}
							couleurTexte={"violet"}
							contenu={"Annuler"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={onDismiss}
						></ButtonCarre>
						<ButtonCarre
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Créer"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={handleConfirm}
						></ButtonCarre>
					</div>
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
