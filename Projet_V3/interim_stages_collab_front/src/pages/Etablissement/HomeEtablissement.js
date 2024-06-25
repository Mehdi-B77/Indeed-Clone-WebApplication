import React from "react";
import {
	HeaderEtablissement,
	NavBarEtablissement,
	ButtonCarre,
	Tableau, Footer,
} from "../../components";
import logo from "../../assets/home-etablissement.png";

export function HomeEtablissement() {

	function handleNewOffer() {
		window.location.href = "/etablissement/conventions";
	}


	return (
		<div className='min-h-screen '>
			<HeaderEtablissement/>
			<div className='flex items-center mt-20 w-2/3 mx-auto mb-8 h-screen'>
				<div className='flex flex-col items-center'>
					<h1 className='text-3xl font-bold text-bleuF mt-10 mb-8 text-center'>Optimisez la gestion de vos
						conventions de stage avec notre application : simplifiez vos processus et offrez une expérience
						fluide aux étudiants et aux entreprises partenaires.</h1>
					<button
						className='bg-bleuF text-violet w-50 h-12 text-xs rounded-md'
						onClick={handleNewOffer}
					>
						Créer une convention de stage
					</button>
				</div>
				<img src={logo} alt='logo'/>
			</div>
			<Footer/>
		</div>

	);
}