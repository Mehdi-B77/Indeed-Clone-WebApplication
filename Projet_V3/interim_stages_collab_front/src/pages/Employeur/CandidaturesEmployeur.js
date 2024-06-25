import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	TableauCandidaturesEmployeur,
	Spinner,
	ButtonCarre,
	RechercherCandidatures, Footer,
} from "../../components";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../util/axios";

export function CandidaturesEmployeur() {
	let [data, setData] = useState([]);
	let [searchData, setSearchData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);
	let [showRecherche, setShowRecherche] = useState(false);

	async function getCandidatures(type) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/candidatures/employeur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				if (response.data.length === 0) {
					setVide(true);
				} else {
					if (!type) {
						setData(response.data);
					} else {
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
							case "Supprimées":
								const dataSupp = response.data.filter(
									(item) => item.status === "Supprimé"
								);
								setData(dataSupp);
								break;
							case "Toutes":
								setData(response.data);
								break;
							case "En convention":
								const conventionData = response.data.filter(
									(item) => item.status === "Validé Convention"
								);
								setData(conventionData);
								break;
							default:
								const defaultData = response.data.filter(
									(item) => item.valide === "En attente"
								);
								setData(defaultData);
								break;
						}
					}
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	async function getCandidaturesPourRecherche(type) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/candidatures/employeur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				if (response.data.length === 0) {
					setVide(true);
				} else {
					if (!type) {
						setSearchData(response.data);
					} else {
						switch (type) {
							case "Refusées":
								const refusedData = response.data.filter(
									(item) => item.status === "Refusé"
								);
								setSearchData(refusedData);
								break;
							case "Validées":
								const validatedData = response.data.filter(
									(item) => item.status === "Validé"
								);
								setSearchData(validatedData);
								break;
							case "En attente":
								const dataEnAttente = response.data.filter(
									(item) => item.status === "En attente"
								);
								setSearchData(dataEnAttente);
								break;
							case "Supprimées":
								const dataSupp = response.data.filter(
									(item) => item.status === "Supprimé"
								);
								setSearchData(dataSupp);
								break;
							case "Toutes":
								setSearchData(response.data);
								break;
							default:
								const defaultData = response.data.filter(
									(item) => item.valide === "En attente"
								);
								setSearchData(defaultData);
								break;
						}
					}
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	useEffect(() => {
		getCandidatures();
		getCandidaturesPourRecherche();
	}, []);

	async function validate(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/employeur/validate`,
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
				`/candidatures/employeur/refuse`,
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

	async function contact(id, titre, contenu) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/employeur/${id}/contact`,
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

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		getCandidatures(event.target.value);
	};

	const handleClick = (id) => {
		window.location.href = `/employeur/candidatures/${id}`;
	};

	const handleSearch = async (searchData) => {
		setData(searchData);
	};

	return (
		<div className='min-h-screen flex flex-col'>
			<HeaderEmployeur></HeaderEmployeur>
			<div className='mx-6 my-2 bg-white rounded-lg p-4 border shadow'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-rouge'>Candidatures</p>
					<div className='flex space-x-4'>
						<div className='relative'>
							<ButtonCarre
								couleur='rouge'
								couleurTexte={"violet"}
								contenu={<FaSearch />}
								width={"fit text-sm"}
								height={"h-9"}
								onclick={async () => {
									setShowRecherche(true);
									await getCandidaturesPourRecherche(selectedValue);
								}}
							></ButtonCarre>
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
								<MenuItem value={"Supprimées"}>Supprimées</MenuItem>
								<MenuItem value={"En convention"}>En convention</MenuItem>

							</Select>
						</FormControl>
					</div>
				</div>
				<div>
					<TableauCandidaturesEmployeur
						data={data}
						onRowClick={handleClick}
						onAccept={validate}
						onRefuse={refuse}
						onContact={contact}
						vide={vide}
					></TableauCandidaturesEmployeur>
				</div>
			</div>

			{showRecherche && (
				<RechercherCandidatures
					data={searchData}
					onConfirm={handleSearch}
					onDismiss={() => setShowRecherche(false)}
				/>
			)}
			<Footer />
			{loading && <Spinner />}
		</div>
	);
}
