import React, { useState, useRef, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { axiosInstance } from "../util/axios";

export function MetierForm({ id, titre, onConfirm, onDismiss }) {
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(false);
	const nomRef = useRef("");
	const secteurRef = useRef("");
	const descriptionRef = useRef("");

	async function getMetier(id) {
		const response = await axiosInstance.get(`/offres/metiers/${id}`);

		if (response.request.status === 200) {
			setFormData(response.data);
			console.log(formData);
		}
	}

	useEffect(() => {
		if (id) {
			getMetier(id);
		}
	}, [id]);

	function handleInputChange(event, field) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: value,
		}));
	}

	const handleConfirm = async () => {
		const nom = nomRef.current.value;
		const secteur = secteurRef.current.value;
		const description = descriptionRef.current.value;
		try {
			setLoading(true);

			await onConfirm(nom, secteur, description);
			setLoading(false);
			onDismiss();
		} catch (error) {
			console.error("Confirmation error:", error);
			setLoading(false);
		}
	};

	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center'>
			{!loading && (
				<div className=' w-1/2 h-fit bg-white p-4 rounded-md space-y-8'>
					<div className='space-y-2'>
						<p className='text-lg font-bold text-bleuF text-center'>{titre}</p>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Nom</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='1'
								ref={nomRef}
								onChange={(e) => handleInputChange(e, "nom")}
								value={formData.nom || ""}
							></textarea>
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Secteur</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='1'
								ref={secteurRef}
								onChange={(e) => handleInputChange(e, "secteur")}
								value={formData.secteur || ""}
							></textarea>
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Description</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='3'
								ref={descriptionRef}
								onChange={(e) => handleInputChange(e, "description")}
								value={formData.description || ""}
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
							contenu={"Envoyer"}
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
