import React, { useState } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Connexion } from "./Connexion";
import { Inscription } from "./Inscription";

export function Header() {
	const [connexionVisible, setConnexionVisible] = useState(false);
	const [inscriptionVisible, setInscriptionVisible] = useState(false);

	const handleConnexionToggle = () => {
		setConnexionVisible(!connexionVisible);
	};

	const handleInscriptionToggle = () => {
		setInscriptionVisible(!inscriptionVisible);
	};

	const redirect = () => {
		window.location.href = "/";
	};
	return (
		<div className='py-4 border-b-2 border-bleuF'>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 ${
					connexionVisible || inscriptionVisible ? "block" : "hidden"
				}`}
			/>
			<div className='flex mx-20 justify-between'>
				<h1
					className='text-2xl font-bold text-bleuF mt-2 cursor-pointer'
					onClick={redirect}
				>
					Stages
				</h1>
				<nav className='mt-2'>
					<ul className='flex space-x-4'>
						<li>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"violet"}
								contenu={"Inscription"}
								width={"fit"}
								height={"fit"}
								onclick={handleInscriptionToggle}
							></ButtonCarre>
						</li>
						<li>
							<ButtonCarre
								couleur={"violet"}
								couleurTexte={"rouge"}
								contenu={"Connexion"}
								width={"fit"}
								height={"fit"}
								onclick={handleConnexionToggle}
							></ButtonCarre>
						</li>
					</ul>
				</nav>
			</div>

			{inscriptionVisible && <Inscription onClose={handleInscriptionToggle}/>}
			{connexionVisible && <Connexion onClose={handleConnexionToggle}/>}
		</div>
	);
}
