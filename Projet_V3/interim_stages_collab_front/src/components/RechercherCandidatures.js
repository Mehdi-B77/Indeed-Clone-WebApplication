import React, { useState, useRef, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { FaPlus } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import { BsInfoCircleFill } from "react-icons/bs";
import moment from "moment";

export function RechercherCandidatures({ data, onConfirm, onDismiss }) {
	const [selected, setSelected] = useState("");
	const [startDate, setStartDate] = useState("");

	const handleStartDateChange = (e) => {
		const selectedDate = e.target.value;
		setStartDate(selectedDate);
	};

	const [offres, setOffres] = useState("");
	const [selectedOffre, setSelectedOffre] = useState(null);
	async function getOffres() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/offres/employeur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setOffres(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const [etiquettes, setEtiquettes] = useState("");
	const [selectedEtiquette, setSelectedEtiquette] = useState(null);
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
		getOffres();
		getEtiquettes();
	}, []);

	const handleSubmit = async () => {
		const filteredData = data.filter((item) => {
			return (
				(!startDate ||
					moment(item.createdAt).isSame(moment(startDate), "day")) &&
				(!selectedOffre || item.offre._id === selectedOffre) &&
				(!selectedEtiquette || item.etiquettes.includes(selectedEtiquette))
			);
		});
		onConfirm(filteredData);
		onDismiss();
	};

	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='w-1/4 h-fit bg-white p-4 rounded-md space-y-4'>
				<h1 className='text-xl text-bleuF font-bold'>Rechercher</h1>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col'>
						<div className='flex w-full justify-between space-x-2'>
							<div className='flex flex-col flex-grow'>
								<select
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									onChange={(e) => setSelected(e.target.value)}
								>
									<option value=''>Sélectionnez un type de recherche</option>
									<option value='offre'>Selon l'offre</option>
									<option value='etiquette'>Selon une étiquette</option>
									<option value='date'>Selon la date</option>
								</select>
							</div>
						</div>
					</div>

					{selected === "offre" && (
						<div className='flex flex-col w-full'>
							<select
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								onChange={(e) => setSelectedOffre(e.target.value)}
							>
								<option value=''>Sélectionnez une offre</option>
								{offres.map((item, index) => (
									<option key={index} value={item._id}>
										{item.titre}
									</option>
								))}
							</select>
						</div>
					)}

					{selected === "etiquette" && (
						<div className='flex flex-col w-full'>
							<select
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								onChange={(e) => setSelectedEtiquette(e.target.value)}
							>
								<option value=''>Sélectionnez une étiquette</option>
								{etiquettes.map((item, index) => (
									<option key={index} value={item._id}>
										{item.nom}
									</option>
								))}
							</select>
						</div>
					)}

					{selected === "date" && (
						<div className='grid grid-cols-2 gap-8 mb-4'>
							<div className='flex flex-col'>
								<label className='text-bleuF text-xs font-bold'>
									Date d'envoi
								</label>
								<input
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									type='date'
									value={startDate}
									onChange={handleStartDateChange}
								></input>
							</div>
						</div>
					)}
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
							contenu={"Rechercher"}
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
