import React, { useState, useEffect } from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	TableauGestionnaire,
	TableauInscriptions,
	Spinner,
} from "../../components";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../util/axios";

export function InscriptionsGestionnaire() {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);

	async function getInscriptions(type) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/auth/inscriptions");

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				if (response.data.length === 0) {
					setVide(true);
				} else {
					switch (type) {
						case "Refusées":
							const refusedData = response.data.filter(
								(item) => item.valide === "Refusé"
							);
							setData(refusedData);
							break;
						case "Validées":
							const validatedData = response.data.filter(
								(item) => item.valide === "Validé"
							);
							setData(validatedData);
							break;
						case "En attente":
							const dataEnAttente = response.data.filter(
								(item) => item.valide === "En attente"
							);
							setData(dataEnAttente);
							break;
						case "Toutes":
							setData(response.data);
							break;
						default:
							const defaultData = response.data.filter(
								(item) => item.valide === "En attente"
							);
							setData(defaultData);
							break;
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

	async function validateInscription(id) {
		try {
			const response = await axiosInstance.post(`/auth/inscription/validate`, {
				id,
			});

			if (response.request.status === 201) {
				console.log(response.data);
				getInscriptions();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function refuseInscription(id) {
		try {
			const response = await axiosInstance.post(`/auth/inscription/refuse`, {
				id,
			});

			if (response.request.status === 201) {
				console.log(response.data);
				getInscriptions();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function contact(id, titre, contenu) {
		try {
			const type_emetteur = "gestionnaire";
			const emetteur = id;
			const type_destinataire = "employeur";
			const destinataire = id;
			const response = await axiosInstance.post(`/auth/inscriptions/contact`, {
				type_emetteur,
				emetteur,
				type_destinataire,
				destinataire,
				titre,
				contenu,
			});

			if (response.request.status === 201) {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getInscriptions();
	}, []);

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		const value = event.target.value;
		setSelectedValue(value);
		getInscriptions(value);
	};

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleClick = (id) => {
		window.location.href = `/gestionnaire/inscriptions/${id}`;
	};

	const handleValidateInscription = async (id) => {
		validateInscription(id);
		setLoading(true);
		await getInscriptions();
		setLoading(false);
	};

	const handleRefuseInscription = async (id) => {
		refuseInscription(id);
		setLoading(true);
		await getInscriptions();
		setLoading(false);
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={0}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Inscriptions</p>
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
							</Select>
						</FormControl>
					</div>
				</div>
				<div>
					<TableauInscriptions
						data={data}
						onRowClick={handleClick}
						onAccept={handleValidateInscription}
						onRefuse={handleRefuseInscription}
						onContact={contact}
						vide={vide}
					></TableauInscriptions>
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
