import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	TableauEmploisEmployeur,
	Spinner, Footer,
} from "../../components";
import { FormControl, MenuItem, Select } from "@mui/material";
import { axiosInstance } from "../../util/axios";
import moment from "moment";

export function EmploisEmployeur() {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);

	async function getEmplois(type) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/emplois/employeur", {
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

	useEffect(() => {
		getEmplois();
	}, []);

	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		getEmplois(event.target.value);
	};

	const handleClick = (id) => {
		window.location.href = `/employeur/emplois/${id}`;
	};

	return (
		<div className='min-h-screen flex flex-col'>
			<HeaderEmployeur></HeaderEmployeur>
			<div className='mx-6 my-2 bg-white rounded-lg p-4 border shadow'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-rouge'>Emplois</p>
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
					</div>
				</div>
				<div>
					<TableauEmploisEmployeur
						data={data}
						onRowClick={handleClick}
					></TableauEmploisEmployeur>
				</div>
			</div>
			<Footer />
			{loading && <Spinner />}
		</div>
	);
}
