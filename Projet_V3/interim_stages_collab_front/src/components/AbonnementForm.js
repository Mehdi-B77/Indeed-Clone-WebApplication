import React, { useState, useRef, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { axiosInstance } from "../util/axios";

export function AbonnementForm({ id, titre, onConfirm, onDismiss }) {
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(false);

	async function getOffre(id) {
		const response = await axiosInstance.get(`/abonnements/${id}`);

		if (response.request.status === 200) {
			setFormData(response.data);
			console.log(formData);
		}
	}

	useEffect(() => {
		if (id) {
			getOffre(id);
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
		const nom = formData.nom;
		const duree = formData.duree;
		const prix = formData.prix;
		const avantages = formData.avantages;
		const conditions = formData.conditions;
		try {
			setLoading(true);

			await onConfirm(nom, duree, prix, avantages, conditions);
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
								onChange={(e) => handleInputChange(e, "nom")}
								value={formData.nom || ""}
							></textarea>
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Duree</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='1'
								typeof='number'
								onChange={(e) => handleInputChange(e, "duree")}
								value={formData.duree || ""}
							></textarea>
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Prix</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='1'
								typeof='number'
								onChange={(e) => handleInputChange(e, "prix")}
								value={formData.prix || ""}
							></textarea>
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Avantages</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='3'
								onChange={(e) => handleInputChange(e, "avantages")}
								value={formData.avantages || ""}
							></textarea>
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Conditions</p>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='3'
								onChange={(e) => handleInputChange(e, "conditions")}
								value={formData.conditions || ""}
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
