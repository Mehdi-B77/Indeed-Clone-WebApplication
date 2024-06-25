import React, { useState } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { axiosInstance } from "../util/axios";
import moment from "moment";

export function NouvelleAlerte({ onConfirm, onDismiss }) {
	const [formData, setFormData] = useState({
		titre: "",
		contenu: "",
		date: "",
		time: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		const date = moment(`${formData.date}T${formData.time}`).format(
			"YYYY-MM-DD à HH:mm"
		);
		const titre = formData.titre;
		const contenu = formData.contenu;
		onConfirm(date, titre, contenu);
		onDismiss();
	};

	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='w-1/3 h-fit bg-white p-4 rounded-md space-y-4'>
				<h1 className='text-xl text-bleuF font-bold'>Nouvelle Alerte</h1>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col'>
						<div className='space-y-2'>
							<div>
								<p className='text-sm text-bleuF font-semibold'>Titre</p>
								<textarea
									name='titre'
									className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									rows='1'
									value={formData.titre}
									onChange={handleInputChange}
								></textarea>
							</div>
							<div>
								<p className='text-sm text-bleuF font-semibold'>Contenu</p>
								<textarea
									name='contenu'
									className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									rows='3'
									value={formData.contenu}
									onChange={handleInputChange}
								></textarea>
							</div>
							<div className='grid grid-cols-2 gap-8 mb-4'>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>Date</label>
									<input
										name='date'
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='date'
										value={formData.date}
										onChange={handleInputChange}
									></input>
								</div>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>Heure</label>
									<input
										name='time'
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='time'
										value={formData.time}
										onChange={handleInputChange}
									></input>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='flex justify-end'>
					<div className='flex space-x-2'>
						<ButtonCarre
							couleur='bleuF'
							couleurTexte={"violet"}
							contenu={"Annuler"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={() => onDismiss()}
						></ButtonCarre>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Créer"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={() => handleSubmit()}
						></ButtonCarre>
					</div>
				</div>
			</div>
		</div>
	);
}
