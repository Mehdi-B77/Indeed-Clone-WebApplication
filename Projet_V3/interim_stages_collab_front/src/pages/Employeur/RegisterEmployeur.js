import React from "react";
import { useState } from "react";
import {
	Header,
	InscriptionEmployeur,
	Abonnements,
	Paiement, Footer,
} from "../../components";

export function RegisterEmployeur() {
	const [afficherInscription, setAfficherInscription] = useState(true);
	const [afficherAbonnements, setAfficherAbonnements] = useState(false);
	const [afficherPaiement, setAfficherPaiement] = useState(false);

	const passerAbonnement = () => {
		setAfficherInscription(false);
		setAfficherAbonnements(true);
	};

	const retourInscription = () => {
		setAfficherAbonnements(false);
		setAfficherInscription(true);
	};

	const passerPaiement = () => {
		setAfficherAbonnements(false);
		setAfficherPaiement(true);
	};

	const retourAbonnement = () => {
		setAfficherPaiement(false);
		setAfficherAbonnements(true);
	};

	return (
		<div className='min-h-screen w-full'>
			<Header></Header>
			<div className='min-h-screen p-5 items-center justify-center flex w-full'>
			{afficherInscription && (
				<InscriptionEmployeur onPass={passerAbonnement}></InscriptionEmployeur>
			)}
			{afficherAbonnements && (
				<Abonnements onPass={passerPaiement}></Abonnements>
			)}
			{afficherPaiement && (
				<Paiement onPass={() => {
				}} onChange={retourAbonnement}></Paiement>
			)}
			</div>
			<Footer></Footer>
		</div>
	);
}
