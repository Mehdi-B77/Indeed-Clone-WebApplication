import React, { useState, useRef, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { axiosInstance } from "../util/axios";

export function EtiquetteForm({ titre, onConfirm, onDismiss }) {
	const [loading, setLoading] = useState(false);
	const [etiquettes, setEtiquettes] = useState([]);
	const [selected, setSelected] = useState("");

	async function getEtiquettes() {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				`/candidatures/employeur/etiquettes`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				setEtiquettes(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getEtiquettes();
	}, []);

	const handleConfirm = async () => {
		try {
			setLoading(true);

			await onConfirm(selected);
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
					<div className='flex flex-col space-y-2 justify-center'>
						<p className='text-lg font-bold text-bleuF text-center mb-10'>
							{titre}
						</p>
						<div>
							<p className='text-sm text-bleuF font-semibold'>
								Nom de la nouvelle étiquette
							</p>
							<input
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='text'
								onChange={(e) => setSelected(e.target.value)}
							></input>
						</div>
						<div className='flex items-center w-full my-4'>
							<div className='flex-grow border-t border-bleuF w-full mx-2'></div>
							<span className='text-xs text-bleuF'>OU</span>
							<div className='flex-grow border-t border-bleuF w-full mx-2'></div>
						</div>
						<div className='flex flex-col flex-grow'>
							<select
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								onChange={(e) => setSelected(e.target.value)}
							>
								<option value=''>Sélectionnez une étiquette</option>
								{etiquettes.map((item, index) => (
									<option key={item._id} value={item.nom}>
										{item.nom}
									</option>
								))}
							</select>
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
							contenu={"Ajouter"}
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
