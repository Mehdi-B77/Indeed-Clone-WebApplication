import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	BarreRecherche,
	Cadres,
	Spinner,
} from "../../components";
import { axiosInstance } from "../../util/axios";

export function HomeChercheur() {
	const [offres, setOffres] = useState([]);
	async function getOffres() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres");

			console.log(response);

			if (response.request.status === 200) {
				setOffres(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}
	useEffect(() => {
		getOffres();
	}, []);

	const [searchOn, setSearchOn] = useState(false);
	const [loading, setLoading] = useState(false);

	const [search, setSearch] = useState("");

	async function getResults(search, metier, lieu) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/offres/search", {
				params: {
					search: search ? search : undefined,
					lieu: lieu ? lieu : undefined,
					metier: metier ? metier : undefined,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setOffres(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const handleSearch = (search, metier, lieu) => {
		getResults(search, metier, lieu);
		setSearch(search);
		setSearchOn(true);
	};

	async function advancedSearch(
		date_debut,
		date_fin,
		salaire_min,
		salaire_max,
		entreprise,
		lieu,
		metier
	) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres/advancedSearch", {
				params: {
					date_debut: date_debut ? date_debut : undefined,
					date_fin: date_fin ? date_fin : undefined,
					salaire_min: salaire_min ? salaire_min : undefined,
					salaire_max: salaire_max ? salaire_max : undefined,
					entreprise: entreprise ? entreprise : undefined,
					lieu: lieu ? lieu : undefined,
					metier: metier ? metier : undefined,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setOffres(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const handleAdvancedSearch = (
		date_debut,
		date_fin,
		salaire_min,
		salaire_max,
		entreprise,
		lieu,
		metier
	) => {
		advancedSearch(
			date_debut,
			date_fin,
			salaire_min,
			salaire_max,
			entreprise,
			lieu,
			metier
		);
		setSearchOn(true);
	};

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<BarreRecherche
				onSearch={(search, metier, lieu) => handleSearch(search, metier, lieu)}
				onAdvancedSearch={handleAdvancedSearch}
			></BarreRecherche>
			<Cadres search={search} data={offres}></Cadres>
			{loading && <Spinner />}
		</div>
	);
}
