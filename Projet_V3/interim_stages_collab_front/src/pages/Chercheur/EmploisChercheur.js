import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	TableauEmplois,
	Spinner,
} from "../../components";
import { FormControl, MenuItem, Select } from "@mui/material";
import { axiosInstance } from "../../util/axios";
import moment from "moment";
import { FiltresEmplois } from "../../components";
import { ButtonCarre } from "../../components";

export function EmploisChercheur() {
	let [data, setData] = useState([]);
	let [filteredData, setFilteredData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);
	let [showFiltres, setShowFiltres] = useState(false);

	async function getEmplois(type) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/emplois/chercheur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				switch (type) {
					case "A venir":
						const dataToCome = response.data.filter((item) =>
							moment(item.offre.debut).isAfter(moment())
						);
						setData(dataToCome);
						break;
					case "Passés":
						const dataPassed = response.data.filter((item) =>
							moment(item.offre.fin).isBefore(moment())
						);
						setData(dataPassed);
						break;
					case "En cours":
						const today = moment();
						const dataLive = response.data.filter(
							(item) =>
								moment(item.offre.debut).isBefore(today) &&
								moment(item.offre.fin).isAfter(today)
						);
						setData(dataLive);
						break;
					case "Tous":
						setData(response.data);
						break;
					default:
						setData(response.data);
						break;
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	async function getEmploisPourFiltrage(type) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/emplois/chercheur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				switch (type) {
					case "A venir":
						const dataToCome = response.data.filter((item) =>
							moment(item.offre.debut).isAfter(moment())
						);
						setFilteredData(dataToCome);
						break;
					case "Passés":
						const dataPassed = response.data.filter((item) =>
							moment(item.offre.fin).isBefore(moment())
						);
						setFilteredData(dataPassed);
						break;
					case "En cours":
						const today = moment();
						const dataLive = response.data.filter(
							(item) =>
								moment(item.offre.debut).isBefore(today) &&
								moment(item.offre.fin).isAfter(today)
						);
						setFilteredData(dataLive);
						break;
					case "Tous":
						setFilteredData(response.data);
						break;
					default:
						setFilteredData(response.data);
						break;
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	async function addToAgenda(id) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.put(
				"/emplois/chercheur/addToAgenda",
				{ id: id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 200) {
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		getEmplois();
		getEmploisPourFiltrage();
	}, []);

	const handleFilterChange = async (filteredData) => {
		setData(filteredData);
	};

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		getEmplois(event.target.value);
	};

	const handleClick = (id) => {
		window.location.href = `/chercheur/emplois/${id}`;
	};

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<div className='mx-6 mt-2 bg-white rounded-lg p-4 border shadow'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-rouge'>Stages en cours ou réalisés</p>
					<div className='flex space-x-4'>
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
								<MenuItem value={"Tous"}>Tous</MenuItem>
								<MenuItem value={"A venir"}>A venir</MenuItem>
								<MenuItem value={"En cours"}>En cours</MenuItem>
								<MenuItem value={"Passés"}>Passés</MenuItem>
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
								await getEmploisPourFiltrage(selectedValue);
							}}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<TableauEmplois
						data={data}
						onRowClick={handleClick}
						onAddToAgenda={(id) => addToAgenda(id)}
					></TableauEmplois>
				</div>
			</div>

			{showFiltres && (
				<FiltresEmplois
					data={filteredData}
					onConfirm={handleFilterChange}
					onDismiss={() => setShowFiltres(false)}
				/>
			)}

			{loading && <Spinner />}
		</div>
	);
}
