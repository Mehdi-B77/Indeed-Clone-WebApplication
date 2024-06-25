import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	TableauCandidaturesChercheur,
	Spinner,
	ButtonCarre,
	Filtres,
} from "../../components";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../util/axios";

export function CandidaturesChercheur() {
	let [data, setData] = useState([]);
	let [filteredData, setFilteredData] = useState(data);
	let [loading, setLoading] = useState(false);
	let [showFiltres, setShowFiltres] = useState(false);
	let [idOffre, setIdOffre] = useState(null);

	let [vide, setVide] = useState(false);

	async function getCandidatures(type) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			let us = localStorage.getItem("user");

			const response = await axiosInstance.get("/candidatures/chercheur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(us);

			if (response.status === 200) {

				if (!type) {
					setData(response.data);
				}
				switch (type) {
					case "Refusées":
						const refusedData = response.data.filter(
							(item) => item.status === "Refusé"
						);
						setData(refusedData);
						break;
					case "Validées":
						const validatedData = response.data.filter(
							(item) => item.status === "Validé"
						);
						setData(validatedData);
						break;
					case "En attente":
						const dataEnAttente = response.data.filter(
							(item) => item.status === "En attente"
						);
						setData(dataEnAttente);
						break;
					case "Toutes":
						const data = response.data.filter(
							(item) => item.status !== "Supprimé"
						);
						setData(data);
						break;
					case "En convention":
						const conventionData = response.data.filter(
							(item) => item.status === "Validé Convention"
						);
						setData(conventionData);
						break;
					default:
						const defaultData = response.data.filter(
							(item) => item.status === "En attente"
						);
						setData(defaultData);
						break;
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getCandidaturesPourFiltrage(type) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/candidatures/chercheur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				if (!type) {
					setData(response.data);
				}
				switch (type) {
					case "Refusées":
						const refusedData = response.data.filter(
							(item) => item.status === "Refusé"
						);
						setFilteredData(refusedData);
						break;
					case "Validées":
						const validatedData = response.data.filter(
							(item) => item.status === "Validé"
						);
						setFilteredData(validatedData);
						break;
					case "En attente":
						const dataEnAttente = response.data.filter(
							(item) => item.status === "En attente"
						);
						setFilteredData(dataEnAttente);
						break;
					case "Toutes":
						const data = response.data.filter(
							(item) => item.status !== "Supprimé"
						);
						setFilteredData(data);
						break;
					case "En convention":
						const conventionData = response.data.filter(
							(item) => item.status === "Validé Convention"
						);
						setFilteredData(conventionData);
						break;
					default:
						const defaultData = response.data.filter(
							(item) => item.status === "En attente"
						);
						setFilteredData(defaultData);
						break;
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function deleteCandidature(id) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/candidatures/chercheur/delete",
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				setLoading(false);
				getCandidatures();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function contact(id, titre, contenu) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/chercheur/${id}/contact`,
				{
					titre,
					contenu,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function validate(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/chercheur/validate`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getCandidatures();
			}
		} catch (e) {
			console.log(e);
		}
	}
	async function addConvention(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/chercheur/convention`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getCandidatures();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function refuse(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/chercheur/refuse`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getCandidatures();
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getCandidatures();
		getCandidaturesPourFiltrage();
	}, []);

	const handleFilterChange = async (filteredData) => {
		setData(filteredData);
	};

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		getCandidatures(event.target.value);
	};

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleClick = (id) => {
		window.location.href = `/chercheur/candidatures/${id}`;
	};

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<div className='mx-6 my-2 bg-white rounded-lg p-4 border shadow'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-rouge'>Candidatures</p>
					<div className='flex space-x-4'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Rechercher'
								className='h-9 px-4 border rounded-md outline-none focus:border-blue-500'
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							<button className='absolute right-3 top-1/2 transform -translate-y-1/2'>
								<FaSearch color='#465475' />
							</button>
						</div>
						<FormControl className='h-9'>
							<Select
								value={selectedValue}
								onChange={handleChange}
								displayEmpty
								className='select-empty h-full'
							>
								<MenuItem value='' disabled>
									Sélectionner
								</MenuItem>
								<MenuItem value={"Toutes"}>Toutes</MenuItem>
								<MenuItem value={"En attente"}>En attente</MenuItem>
								<MenuItem value={"Validées"}>Validées</MenuItem>
								<MenuItem value={"Refusées"}>Refusées</MenuItem>
								<MenuItem value={"En convention"}>En convention</MenuItem>

							</Select>
						</FormControl>
						<ButtonCarre
							couleur='bleuF'
							couleurTexte={"violet"}
							contenu={"Filtrer"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={async () => {
								setShowFiltres(true);
								await getCandidaturesPourFiltrage(selectedValue);
							}}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<TableauCandidaturesChercheur
						data={data}
						onRowClick={handleClick}
						onDelete={deleteCandidature}
						onContact={contact}
						onAccept={validate}
						onRefuse={refuse}
						onConvention={addConvention}
					></TableauCandidaturesChercheur>
				</div>
			</div>

			{showFiltres && (
				<Filtres
					data={filteredData}
					onConfirm={handleFilterChange}
					onDismiss={() => setShowFiltres(false)}
				/>
			)}

			{loading && <Spinner />}
		</div>
	);
}
