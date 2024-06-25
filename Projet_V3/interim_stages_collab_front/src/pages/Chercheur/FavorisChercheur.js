import React, { useState, useEffect } from "react";
import { HeaderChercheur, Spinner, Cadre } from "../../components";
import { axiosInstance } from "../../util/axios";

export function FavorisChercheur() {
	const [favoris, setFavoris] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getFavoris() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/offres/chercheur/favoris", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setFavoris(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		getFavoris();
	}, []);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<p className='mt-10 ml-10 font-bold  text-bleuF text-xl'>Mes favoris</p>
			<div className='grid grid-cols-3 gap-8 m-10'>
				{favoris.map((item, index) => (
					<Cadre key={index} Offre={item} />
				))}
			</div>

			{loading && <Spinner />}
		</div>
	);
}
