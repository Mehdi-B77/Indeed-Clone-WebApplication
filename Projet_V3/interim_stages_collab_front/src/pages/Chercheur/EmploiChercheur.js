import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	CadreEmploi,
	CadreEmployeur,
	Spinner,
	NouvelleAlerte,
} from "../../components";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";
import { ButtonCarre } from "../../components";
import { NouvelleCandidatureSpontanee } from "../../components";

export function EmploiChercheur() {
	let [data, setData] = useState([]);
	let [alertes, setAlertes] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);
	let [showNouvelleAlerte, setShowNouvelleAlerte] = useState(false);
	let [showNouvelleCandidatureSP, setShowNouvelleCandidatureSP] =
		useState(false);

	const { id } = useParams();

	async function getEmploi() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/emplois/chercheur/" + id, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				if (response.data.length === 0) {
					setVide(true);
				}
				setData(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	async function getAlertes() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/emplois/" + id + "/alertes", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setAlertes(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function addAlerte(date, titre, contenu) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/emplois/chercheur/alertes/add",
				{
					emploi: id,
					date,
					titre,
					contenu,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 201) {
				getAlertes();
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function deleteAlerte(id) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.delete(
				"/emplois/chercheur/alertes/" + id,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 200) {
				getAlertes();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function demanderAttestation() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/emplois/chercheur/demanderAttestation",
				{
					id: id,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 200) {
				setLoading(false);
				getEmploi();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function addCandidatureSpontanee(data) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/candidatures/chercheur/spontanees/add",
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
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/emplois");
			if (response.status === 200) {
				console.log(response.data);
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleExternalLinkClick = () => {
		window.open(url + data.attestation, "_blank");
	};

	useEffect(() => {
		getEmploi();
		getAlertes();
		getUrl();
	}, []);

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<div className='mx-6 mt-2 bg-white rounded-lg p-4'>
				<div className='flex flex-col'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col'>
							<div className='flex items-center space-x-6'>
								<p className='text-xl font-bold text-rouge'>Stage</p>
								<div className='flex-grow'>
									<CadreEmploi Emploi={data} className={""} />
								</div>
							</div>
						</div>
						<div className='flex flex-col'>
							<div className='flex items-center space-x-6'>
								<p className='text-xl font-bold text-rouge'>Employeur</p>
								<div className='flex-grow'>
									<CadreEmployeur
										data={data.offre ? data.offre.employeur : {}}
										className={""}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='flex items-center space-x-2 mt-10'>
						<p className='text-bleuF'>Ajouter une alerte</p>
						<button
							className='flex justify-center items-center bg-bleuF text-violet p-1 rounded-full'
							onClick={() => setShowNouvelleAlerte(true)}
						>
							<FaPlus size={15} />
						</button>
					</div>
					<div className='flex mt-4 space-x-2'>
						{alertes.map((item) => (
							<div className='flex items-center bg-bleuF text-violet rounded-lg py-1 px-2 w-fit space-x-4'>
								<p>
									{item.titre} | {item.date}
								</p>
								<FaTimes
									className='cursor-pointer'
									color='#EEEDFF'
									onClick={() => deleteAlerte(item._id)}
								/>
							</div>
						))}
					</div>

					{data.offre ? (
						data.offre.employeur.spontanee ? (
							<div className='flex items-center justify-between space-x-2 mt-10'>
								<p className='text-bleuF'>Faire une condidature spontanée</p>
								<ButtonCarre
									couleur='rouge'
									couleurTexte={"violet"}
									contenu={"Candidater"}
									width={"w-32 text-xs"}
									height={"fit"}
									onclick={() => {
										setShowNouvelleCandidatureSP(true);
									}}
								></ButtonCarre>
							</div>
						) : (
							""
						)
					) : (
						""
					)}
					<div className='flex items-center justify-between space-x-2 mt-4'>
						<p className='text-bleuF'>Imprimer une attestation de travail</p>
						{data.attestation ? (
							data.attestation === "demandée" ? (
								<ButtonCarre
									couleur='bleuF'
									couleurTexte={"violet"}
									contenu={"Demandée"}
									width={"w-32 text-xs"}
									height={"fit"}
									onclick={() => {}}
								></ButtonCarre>
							) : (
								<ButtonCarre
									couleur='vertF'
									couleurTexte={"violet"}
									contenu={"Imprimer"}
									width={"w-32 text-xs"}
									height={"fit"}
									onclick={() => handleExternalLinkClick()}
								></ButtonCarre>
							)
						) : (
							<ButtonCarre
								couleur='rouge'
								couleurTexte={"violet"}
								contenu={"Demander"}
								width={"w-32 text-xs"}
								height={"fit"}
								onclick={demanderAttestation}
							></ButtonCarre>
						)}
					</div>
				</div>
				{data.attestation ? (
					<div className='mt-10'>
						<iframe src={url + data.attestation} width='100%' height='500px' />
					</div>
				) : (
					""
				)}
			</div>
			{showNouvelleAlerte && (
				<NouvelleAlerte
					onConfirm={addAlerte}
					onDismiss={() => setShowNouvelleAlerte(false)}
				/>
			)}

			{showNouvelleCandidatureSP && (
				<NouvelleCandidatureSpontanee
					employeur={data.offre ? data.offre.employeur : null}
					onConfirm={(data) => addCandidatureSpontanee(data)}
					onDismiss={() => setShowNouvelleCandidatureSP(false)}
				/>
			)}

			{loading && <Spinner />}
		</div>
	);
}
