import React from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	ButtonCarre,
	Tableau, Footer,
} from "../../components";
import logo from "../../assets/home-employeur-img.png";
export function HomeEmployeur() {

function handleNewOffer() {
		window.location.href = "/employeur/offres";
}

	return (
		<div className='min-h-screen flex flex-col'>
			<HeaderEmployeur></HeaderEmployeur>
			<div className='flex justify-center mt-20 min-h-screen'>
				<div className={`flex-row`}>
					<h1 className=' text-3xl font-bold text-bleuF mt-10 mb-8'>Recrutons ensemble votre talent idéal</h1>
					<ButtonCarre
						couleur='bleuF'
						couleurTexte={"violet"}
						contenu={"Publier une offre de stage"}
						width={"w-50 h-12 text-xs"}
						height={"fit"}
						onclick={() => handleNewOffer()}
					></ButtonCarre>
				</div>

				<img src={logo}
					 className="max-w-xs h-full"
					 alt='logo'/>

			</div>
			<Footer />
		</div>
	);
}
