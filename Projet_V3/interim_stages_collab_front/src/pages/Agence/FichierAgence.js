import React, { useState } from "react";
import {
	HeaderAgence,
	NavBarAgence,
	ButtonCarre,
	TableauAgence,
	NouvelleOffre,
	NouvelleCategorie,
} from "../../components";
import { useParams } from "react-router-dom";

export function FichierAgence() {
	let data = [
		{ Id: "1", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "2", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "3", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "4", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "5", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "6", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "7", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "8", Titre: "Jardinier", "Date de création": "13 Février 2024" },
		{ Id: "9", Titre: "Jardinier", "Date de création": "13 Février 2024" },
	];

	let { id } = useParams();

	const handleClick = (offreId) => {
		window.location.href = `/agence/fichiers/${id}/${offreId}`;
	};

	const [showNouvelleOffre, setShowNouvelleOffre] = useState(false);
	const [showNouvelleCategorie, setShowNouvelleCategorie] = useState(false);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderAgence></HeaderAgence>
			<NavBarAgence selected={0}></NavBarAgence>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>
						Mes fichiers {">"} {id}
					</p>
					<div className='flex space-x-4'>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Nouvelle offre"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => setShowNouvelleOffre(true)}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<TableauAgence
						data={data}
						type={"offres"}
						onRowClick={handleClick}
					></TableauAgence>
				</div>
			</div>

			{showNouvelleOffre && (
				<NouvelleOffre onClose={() => setShowNouvelleOffre(false)} />
			)}

			{showNouvelleCategorie && (
				<NouvelleCategorie onClose={() => setShowNouvelleCategorie(false)} />
			)}
		</div>
	);
}
