import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	Spinner,
	Apply,
	Avertissement,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function PostulerChercheur() {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const [candidatures, setCandidatures] = useState([]);
	const [showAvertissement, setShowAvertissement] = useState(false);

	let { id } = useParams();

	async function getCandidatures() {
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
				setCandidatures(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function addCandidature(data) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/candidatures/chercheur/add",
				data,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 201) {
				setLoading(false);
				window.location.href = "/chercheur/candidatures"
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const redirect = () => {
		window.location.href = "/";
	};

	useEffect(() => {
		getCandidatures();
	}, []);

	useEffect(() => {
		setShowAvertissement(candidatures.filter(candidature => candidature.status === "En attente").length > 0);
	}, [candidatures]);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<div className='m-6 bg-white rounded-lg'>
				<Apply data={candidatures} onConfirm={addCandidature} />
			</div>
			{loading && <Spinner />}
			{showAvertissement && (
				<Avertissement
					Titre={"Avertissement"}

					Texte={`Vous postulez pour ${candidatures.filter(candidature => candidature.status === "En attente").length} 
					offre${candidatures.filter(candidature => candidature.status === "En attente").length > 1 ? "s" : ""} d'emploi déja. Voulez vous continuer ?`}

					onConfirm={() => setShowAvertissement(false)}
					onDismiss={() => redirect()}
				/>
			)}
		</div>
	);
}
