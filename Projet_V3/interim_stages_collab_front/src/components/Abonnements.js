import React from "react";
import { useState, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { CadreAbonnement } from "./CadreAbonnement";
import { Spinner } from "./Spinner";
import { axiosInstance } from "../util/axios";

export function Abonnements({ selected, onPass, onClose }) {
	const [abonnements, setAbonnements] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getAbonnements() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/abonnements");

			console.log(response);

			if (response.request.status === 200) {
				setAbonnements(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}
	// const abonnements = [
	// 	{
	// 		type: "ponctuel",
	// 		prix: "5 EURO",
	// 		offres: "Une",
	// 		partage: "Limité",
	// 	},
	// 	{
	// 		type: "mensuel",
	// 		prix: "30 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// 	{
	// 		type: "trimestriel",
	// 		prix: "80 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// 	{
	// 		type: "semestriel",
	// 		prix: "150 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// 	{
	// 		type: "annuel",
	// 		prix: "300 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// 	{
	// 		type: "illimité",
	// 		prix: "Offre = 2 EURO",
	// 		offres: "Illimité",
	// 		partage: "Illimité",
	// 	},
	// ];

	useEffect(() => {
		getAbonnements();
	}, []);

	const [cadreSelectionne, setCadreSelectionne] = useState(null);

	const handleSelectionCadre = (index) => {
		setCadreSelectionne(index);
	};

	return (
		<div className='overlay flex items-center justify-center w-full'>
			<div className='z-50 justify-center items-center p-4 w-3/4 h-4/5 bg-white rounded-lg border border-bleuF'>
				<h1 className='text-xl text-bleuF font-bold mb-6 ml-4'>
					Les abonnements disponibles
				</h1>

				<div className='grid grid-cols-3 gap-x-8 gap-y-4 mx-4 mb-6'>
					{abonnements.map((item, index) => (
						<CadreAbonnement
							key={index}
							abonnement={item}
							className={`${
								!selected
									? cadreSelectionne === index
										? "border-2 border-red-500"
										: ""
									: selected === item._id
									? "border-2 border-vertF"
									: ""
							}`}
							onClick={() => handleSelectionCadre(index)}
						></CadreAbonnement>
					))}
				</div>
				<div className='flex justify-end mr-4'>
					<ButtonCarre
						couleur={"bleuF"}
						couleurTexte={"violet"}
						contenu={"Fermer"}
						width={"fit text-xs"}
						height={"fit"}
						onclick={onClose}
					></ButtonCarre>
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
