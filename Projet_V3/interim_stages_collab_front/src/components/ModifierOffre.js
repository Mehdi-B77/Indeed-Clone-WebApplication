import React, { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { ButtonRond } from "./ButtonRond";
import { axiosInstance } from "../util/axios";

export function ModifierOffre({ id, onClose, onConfirm }) {
	const [selected, setSelected] = useState("");
	const [metiers, setMetiers] = useState([]);

	const [formData, setFormData] = useState({
		titre: "",
		metier: {
			_id: "",
			nom: "",
		},
		debut: "",
		fin: "",
		remuneration: "",
		description: "",
	});

	function handleInputChange(event, field, subfield) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: subfield ? { ...prevFormData[field], [subfield]: value } : value,
		}));
		console.log(formData);
	}

	async function getMetiers() {
		try {
			const response = await axiosInstance.get("/offres/metiers");

			console.log(response);

			if (response.request.status === 200) {
				setMetiers(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function getOffre(id) {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.get(`/offres/employeur/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.request.status === 200) {
			setFormData(response.data);
			console.log(formData);
		}
	}

	async function updateOffre(id) {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.put(
			`/offres/employeur/${id}`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (response.request.status === 200) {
			console.log(response);
		}
	}

	useEffect(() => {
		getOffre(id);
		getMetiers();
		console.log(formData);
	}, []);

	async function handleClick() {
		await updateOffre(id);
		onConfirm();
	}

	return (
		<div>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 block`}
			/>
			<div className='fixed z-50 overlay flex flex-col items-center p-4 w-3/4 h-fit bg-bleuF left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
				<div className='flex justify-between w-full mb-6'>
					<h1 className='text-xl text-violet font-bold mb-6'>
						Modifier une offre
					</h1>
					<FaTimesCircle
						className='cursor-pointer'
						color='#EEEDFF'
						onClick={onClose}
					/>
				</div>

				<div className='grid grid-cols-3 gap-8 mb-10 w-full'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Titre</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "titre")}
							value={formData.titre || ""}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Métier cible
						</label>
						<select
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							onChange={(e) => {
								handleInputChange(e, "metier");
								setSelected(e.target.value);
							}}
							value={formData.metier._id}
						>
							<option value=''>Sélectionnez un métier</option>
							{metiers.map((item, index) => (
								<option key={item.id} value={item._id}>
									{item.nom}
								</option>
							))}
						</select>
					</div>
					{selected === "Autre" && (
						<div className='flex flex-col'>
							<label className='text-violet text-xs font-bold'>Autre</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='text'
								onChange={(e) => handleInputChange(e, "metier")}
							></input>
						</div>
					)}
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-10 w-full'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Début</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='date'
							onChange={(e) => handleInputChange(e, "debut")}
							value={formData.debut || ""}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>Fin</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='date'
							onChange={(e) => handleInputChange(e, "fin")}
							value={formData.fin || ""}
						></input>
					</div>
				</div>
				<div className='grid grid-cols-3 gap-8 mb-10 w-full'>
					<div className='flex flex-col'>
						<label className='text-violet text-xs font-bold'>
							Rémunération
						</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "remuneration")}
							value={formData.remuneration || ""}
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mb-10 w-full'>
					<div className='flex flex-col col-span-2'>
						<label className='text-violet text-xs font-bold'>Description</label>
						<textarea
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							rows='4'
							onChange={(e) => handleInputChange(e, "description")}
							value={formData.description || ""}
						></textarea>
					</div>
				</div>

				<div className='w-full'>
					<div className='flex justify-end'>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Modifier"}
							width={"fit"}
							height={"fit"}
							onClick={handleClick}
						></ButtonRond>
					</div>
				</div>
			</div>
		</div>
	);
}
