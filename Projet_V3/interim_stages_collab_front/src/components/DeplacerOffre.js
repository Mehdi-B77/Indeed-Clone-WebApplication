import React, { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { axiosInstance } from "../util/axios";

export function DeplacerOffre({ id, offre, onDismiss, onConfirm }) {
	const [loading, setLoading] = useState(false);
	const [categorie, setCategorie] = useState("");
	const [categories, setCategories] = useState([]);

	const [nouvelleCategorie, setNouvelleCategorie] = useState("");

	async function getCategorie(id) {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.get(`/offres/employeur/categories/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status === 200) {
			console.log(response);
			setCategorie(response.data.nom);
		}
	}

	async function getCategories() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/offres/employeur/categories", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				setCategories(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getCategories();
		if (id && id !== 0) {
			getCategorie(id);
		} else {
			setCategorie("All");
		}
	}, []);

	return (
		<div>
			<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
				{!loading && (
					<div className=' w-1/3 h-fit bg-white p-4 rounded-md space-y-4'>
						<p className='text-lg font-bold text-bleuF text-center m-2'>
							Déplacer une offre
						</p>
						<div className='space-y-3'>
							<div>
								<p className='text-sm text-bleuF font-semibold'>Offre</p>
								<input
									className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									value={offre}
									disabled
								/>
							</div>
							<div>
								<p className='text-sm text-bleuF font-semibold'>
									Catégorie actuelle
								</p>
								<input
									className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									disabled
									value={categorie}
								/>
							</div>
							<div className='flex flex-col'>
								<p className='text-sm text-bleuF font-semibold'>
									Nouvelle catégorie
								</p>
								<select
									className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									onChange={(e) => {
										setNouvelleCategorie(e.target.value);
									}}
								>
									<option value=''>Sélectionnez une catégorie</option>
									<option value={"0"}>All</option>
									{categories.map((item, index) => (
										<option key={item._id} value={item._id}>
											{item.nom}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='flex justify-end space-x-2 pt-2'>
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
								onclick={() => onConfirm(nouvelleCategorie)}
							></ButtonCarre>
						</div>
					</div>
				)}
				{loading && <Spinner />}
			</div>
		</div>
	);
}
