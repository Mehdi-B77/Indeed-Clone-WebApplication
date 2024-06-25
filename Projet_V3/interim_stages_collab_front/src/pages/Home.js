import React from "react";
import { useState, useEffect } from "react";
import {
	Header,
	WelcomeDiv,
	BarreEmployeurs,
	Cadres,
	BarreRecherche,
	Spinner,
	Footer,
} from "../components";
import { IoMdLocate } from "react-icons/io";
import { axiosInstance } from "../util/axios";

export function Home() {
	async function getOffres(lieu) {
		try {

			setLoading(true);
			const response = await axiosInstance.get("/offres", {
				params: {
					lieu: lieu ? lieu : undefined,
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

	const [offres, setOffres] = useState([]);

	async function getResults(search, metier, lieu) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres/search", {
				params: {
					search: search ? search : undefined,
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

	const [searchOn, setSearchOn] = useState(false);
	const [loading, setLoading] = useState(false);

	const [search, setSearch] = useState("");

	const handleSearch = async (search, metier, lieu) => {
		setLoading(true);
		await getResults(search, metier, lieu);
		setSearch(search);
		setSearchOn(true);
		setLoading(false);
	};

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

	const [location, setLocation] = useState(null);
	const [city, setCity] = useState(null);

	const incrementConsultationCount = async (lieu) => {
		try {
			const response = await axiosInstance.post("/users/consultations", {
				lieu,
			});
			console.log(response.data);
		} catch (error) {
			console.error(
				"Erreur lors de l'incrémentation du nombre de consultations :",
				error
			);
		}
	};
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					try {
						const response = await fetch(
							`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
						);
						const data = await response.json();
						setCity(data.address.state);
						incrementConsultationCount(data.address.state);
						console.log(data);
					} catch (error) {
						console.error(
							"Erreur lors de la récupération de la ville :",
							error
						);
					}
				},
				(error) => {
					console.error(
						"Erreur lors de la récupération de la position :",
						error.message
					);
				}
			);
		} else {
			console.error(
				"La géolocalisation n'est pas prise en charge par ce navigateur."
			);
		}
	}, []);

	useEffect(() => {
		getOffres(city);
	}, [city]);

	return (
		<div className='min-h-screen'>
			<Header />
			{city && (
				<div className='flex items-center justify-center space-x-2 p-10'>
					<IoMdLocate className='text-rouge' />
					<p className='text-bleuF'>{city}</p>
				</div>
			)}

			<BarreRecherche
				onSearch={handleSearch}
				onAdvancedSearch={handleAdvancedSearch}
			></BarreRecherche>

			{!searchOn && (
				<>
					<WelcomeDiv></WelcomeDiv>
					<Cadres search={search} data={offres}></Cadres>
				</>
			)}

			{searchOn && <Cadres search={search} data={offres}></Cadres>}
			{loading && <Spinner />}
			<Footer />
		</div>
	);
}
