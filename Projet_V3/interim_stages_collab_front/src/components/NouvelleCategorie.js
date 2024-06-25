import React, { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { axiosInstance } from "../util/axios";

export function NouvelleCategorie({ id, titre, onDismiss, onConfirm }) {
	const [loading, setLoading] = useState(false);
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");

	async function getCategorie(id) {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.get(`/offres/employeur/categories/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status === 200) {
			setNom(response.data.nom);
			setDescription(response.data.description);
		}
	}

	useEffect(() => {
		if (id) {
			getCategorie(id);
		}
	}, [id]);

	async function addCategorie() {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.post(
			`/offres/employeur/categories/add`,
			{ nom, description },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (response.status === 201) {
			console.log(response.data);
		}
	}

	async function handleClick() {
		await addCategorie();
		onConfirm();
	}

	return (
		<div>
			<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
				{!loading && (
					<div className=' w-1/3 h-fit bg-white p-4 rounded-md space-y-4'>
						<p className='text-lg font-bold text-bleuF text-center m-2'>
							{titre}
						</p>
						<div className='space-y-2'>
							<div>
								<p className='text-sm text-bleuF font-semibold'>Nom</p>
								<textarea
									className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									rows='1'
									onChange={(e) => setNom(e.target.value)}
									value={nom}
								></textarea>
							</div>
							<div>
								<p className='text-sm text-bleuF font-semibold'>Description</p>
								<textarea
									className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									rows='3'
									onChange={(e) => setDescription(e.target.value)}
									value={description}
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
								contenu={"Confirmer"}
								width={"fit text-xs"}
								height={"fit"}
								onclick={handleClick}
							></ButtonCarre>
						</div>
					</div>
				)}
				{loading && <Spinner />}
			</div>
		</div>
	);
}
