import React, { useState, useEffect } from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	LineChart,
	LineChartConsultations,
	ColumnChart,
	Spinner,
} from "../../components";
import { axiosInstance } from "../../util/axios";
import moment from "moment";

export function StatistiquesGestionnaire() {
	const [nbInscrits, setNbInscrits] = useState(0);
	const [nbEtablissement, setNbEtablissement] = useState(0);
	const [nbEmployeurs, setNbEmployeurs] = useState(0);
	const [nbChercheurs, setNbChercheurs] = useState(0);

	const [loading, setLoading] = useState(false);

	let [candidatures, setCandidatures] = useState({
		Semaine: [10, 15, 20, 25],
		Mois: [10, 15, 20, 25, 10, 15, 20, 25, 10, 15, 20, 25],
	});

	let [offres, setOffres] = useState({
		Semaine: [10, 15, 20, 25],
		Mois: [10, 15, 20, 25, 10, 15, 20, 25, 10, 15, 20, 25],
	});

	let [metiersProposes, setMetiersProposes] = useState([
		{
			_id: ["Maçon"],
			total: 1,
		},
	]);

	let [metiersDemandes, setMetiersDemandes] = useState([
		{
			_id: ["Maçon"],
			total: 1,
		},
	]);

	let [consultations, setConsultations] = useState({
		Semaine: [10, 15, 20, 25],
		Mois: [10, 15, 20, 25, 10, 15, 20, 25, 10, 15, 20, 25],
	});

	async function getStatistics() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/users/statistics");

			console.log(response);

			if (response.status === 200) {
				setNbInscrits(response.data.inscrits);
				setNbEmployeurs(response.data.employeurs);
				setNbChercheurs(response.data.chercheurs);
				setNbEtablissement(response.data.etablissement)
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getMetiersProposes(lieu, mois, annee) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres/statisticsMetiers", {
				params: {
					lieu: lieu ? lieu : undefined,
					mois: mois ? mois : undefined,
					annee: annee ? annee : undefined,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setMetiersProposes(response.data.statistics);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getMetiersDemandes(lieu, mois, annee) {
		try {
			setLoading(true);
			const response = await axiosInstance.get(
				"/candidatures/statisticsMetiers",
				{
					params: {
						lieu: lieu ? lieu : undefined,
						mois: mois ? mois : undefined,
						annee: annee ? annee : undefined,
					},
				}
			);

			console.log(response);

			if (response.status === 200) {
				setMetiersDemandes(response.data.statistics);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getCandidaturesStatistics(lieu, metier) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/candidatures/statistics", {
				params: {
					lieu: lieu ? lieu : undefined,
					metier: metier ? metier : undefined,
				},
			});

			console.log(response);

			if (response.status === 200) {
				const statisticsSemaine = response.data.statisticsSemaine; // Tableau d'objets avec les statistiques Semaine
				const statisticsMois = response.data.statisticsMois; // Tableau d'objets avec les statistiques Mois

				const semaineData = Array(4).fill(0);
				const moisData = Array(12).fill(0);

				const dateActuelle = moment();

				statisticsSemaine.forEach((stat) => {
					const { _id, total } = stat;
					const semaine = _id.semaine - 1;

					const numSemaine = 4 - (dateActuelle.isoWeek() - semaine);

					if (numSemaine <= 4) {
						semaineData[numSemaine] = total;
					}
					console.log(dateActuelle.isoWeek(), semaine, numSemaine);
				});

				statisticsMois.forEach((stat) => {
					const { _id, total } = stat;
					const mois = _id.mois - 1;

					moisData[mois] = total;
				});

				// Mettez à jour l'état candidatures avec les nouvelles données
				setCandidatures({
					Semaine: semaineData,
					Mois: moisData,
				});

				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getOffresStatistics(lieu, metier) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres/statistics", {
				params: {
					lieu: lieu ? lieu : undefined,
					metier: metier ? metier : undefined,
				},
			});

			console.log(response);

			if (response.status === 200) {
				const statisticsSemaine = response.data.statisticsSemaine; // Tableau d'objets avec les statistiques Semaine
				const statisticsMois = response.data.statisticsMois; // Tableau d'objets avec les statistiques Mois

				const semaineData = Array(4).fill(0);
				const moisData = Array(12).fill(0);

				const dateActuelle = moment();

				statisticsSemaine.forEach((stat) => {
					const { _id, total } = stat;
					const semaine = _id.semaine - 1;

					const numSemaine = 4 - (dateActuelle.isoWeek() - semaine);

					if (numSemaine <= 4) {
						semaineData[numSemaine] = total;
					}
					console.log(dateActuelle.isoWeek(), semaine, numSemaine);
				});

				statisticsMois.forEach((stat) => {
					const { _id, total } = stat;
					const mois = _id.mois - 1;

					moisData[mois] = total;
				});

				// Mettez à jour l'état candidatures avec les nouvelles données
				setOffres({
					Semaine: semaineData,
					Mois: moisData,
				});

				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getConsultationsStatistics(lieu) {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/users/consultations", {
				params: {
					lieu: lieu ? lieu : undefined,
				},
			});

			console.log(response);

			if (response.status === 200) {
				const statisticsSemaine = response.data.statisticsSemaine; // Tableau d'objets avec les statistiques Semaine
				const statisticsMois = response.data.statisticsMois; // Tableau d'objets avec les statistiques Mois

				const semaineData = Array(4).fill(0);
				const moisData = Array(12).fill(0);

				const dateActuelle = moment();

				statisticsSemaine.forEach((stat) => {
					const { _id, total } = stat;
					const semaine = _id.semaine - 1;

					const numSemaine = 4 - (dateActuelle.isoWeek() - semaine);

					if (numSemaine <= 4) {
						semaineData[numSemaine] = total;
					}
					console.log(dateActuelle.isoWeek(), semaine, numSemaine);
				});

				statisticsMois.forEach((stat) => {
					const { _id, total } = stat;
					const mois = _id.mois - 1;

					moisData[mois] = total;
				});

				// Mettez à jour l'état candidatures avec les nouvelles données
				setConsultations({
					Semaine: semaineData,
					Mois: moisData,
				});

				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		getStatistics();
		getCandidaturesStatistics("", "");
		getOffresStatistics("", "");
		getMetiersProposes();
		getMetiersDemandes();
		getConsultationsStatistics();
	}, []);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={2}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Statistiques</p>
				</div>
				<div className='grid grid-cols-5 my-6 space-x-4'>
					<div className='bg-bleuF rounded-lg p-4'>
						<p className='text-violet font-bold text-sm'>Nombre d’inscrits</p>
						<br></br>
						<p className='text-violet font-bold text-sm text-right'>
							{nbInscrits}
						</p>
					</div>
					<div className='bg-bleuF rounded-lg p-4'>
						<p className='text-violet font-bold text-sm'>Etablissements</p>
						<br></br>
						<p className='text-violet font-bold text-sm text-right'>
							{nbEtablissement}
						</p>
					</div>
					<div className='bg-bleuF rounded-lg p-4'>
						<p className='text-violet font-bold text-sm'>Employeurs</p>
						<br></br>
						<p className='text-violet font-bold text-sm text-right'>
							{nbEmployeurs}
						</p>
					</div>
					<div className='bg-bleuF rounded-lg p-4'>
						<p className='text-violet font-bold text-sm'>
							Etudiants
						</p>
						<br></br>
						<p className='text-violet font-bold text-sm text-right'>
							{nbChercheurs}
						</p>
					</div>
				</div>
				<div className='grid grid-cols-2 space-x-2'>
					<div>
						<p className='text-bleuF font-bold mb-2'>Nombre d'annonces</p>
						<LineChart
							title={"Nombre d'annonces"}
							data={offres}
							onChange={getOffresStatistics}
						></LineChart>
					</div>
					<div>
						<p className='text-bleuF font-bold mb-2'>Nombre de candidatures</p>
						<LineChart
							title={"Nombre de candidatures"}
							data={candidatures}
							onChange={getCandidaturesStatistics}
						></LineChart>
					</div>
				</div>
				<div className='grid grid-cols-2 space-x-2'>
					<div>
						<p className='text-bleuF font-bold my-2'>
							Les stages les plus demandés
						</p>
						<ColumnChart
							title={"Candidatures"}
							data={metiersDemandes}
							onChange={getMetiersDemandes}
						></ColumnChart>
					</div>
					<div>
						<p className='text-bleuF font-bold my-2'>
							Les stages les plus proposés
						</p>
						<ColumnChart
							title={"Annonces"}
							data={metiersProposes}
							onChange={getMetiersProposes}
						></ColumnChart>
					</div>
				</div>
				<div className='grid grid-cols-2 space-x-2'>
					<div>
						<p className='text-bleuF font-bold my-2'>Nombre de consultations</p>
						<LineChartConsultations
							title={"Consultations"}
							data={consultations}
							onChange={getConsultationsStatistics}
						></LineChartConsultations>
					</div>
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
