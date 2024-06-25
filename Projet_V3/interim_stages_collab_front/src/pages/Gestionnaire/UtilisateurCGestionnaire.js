import React, { useState } from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	CadreUtilisateurC,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { axiosInstance } from "../../util/axios";
import { FaExclamationTriangle, FaFlag } from "react-icons/fa";

export function UtilisateurCGestionnaire() {
	let [data, setData] = useState({});
	let [loading, setLoading] = useState(false);
	let { id } = useParams();

	async function getChercheur() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/users/chercheurs/" + id);

			console.log(response);

			if (response.status === 200) {
				setData(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		getChercheur();
	}, []);

	async function bloquer(type, id) {
		try {
			const response = await axiosInstance.post(`/users/bloquerUser`, {
				type,
				id,
			});

			if (response.status === 200) {
				console.log(response.data);
				getChercheur();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function debloquer(type, id) {
		try {
			const response = await axiosInstance.post(`/users/debloquerUser`, {
				type,
				id,
			});

			if (response.status === 200) {
				console.log(response.data);
				getChercheur();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function avertir(destinataire, titre, contenu) {
		try {
			const type_destinataire = "chercheur";
			const response = await axiosInstance.post(`/users/avertirUser`, {
				type_destinataire,
				destinataire,
				titre,
				contenu,
			});

			if (response.status === 201) {
				console.log(response.data);
				getChercheur();
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleClick = () => {
		window.location.href = `/gestionnaire/utilisateurs`;
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={1}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex'>
					<p
						className='text-xl font-bold text-bleuF cursor-pointer'
						onClick={handleClick}
					>
						Utilisateurs
					</p>
					<span className='ml-2'></span>
					<p className='text-xl font-bold text-bleuF'>
						{">"} Etudiant {id}
					</p>
				</div>
				<div className='mt-4'>
					<CadreUtilisateurC
						data={data}
						onAvertir={(titre, contenu) => avertir(id, titre, contenu)}
						onBloque={() => bloquer("chercheur", id)}
						onDebloque={() => debloquer("chercheur", id)}
					></CadreUtilisateurC>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<div className='space-y-2 mt-2'>
						<p className='text-bleuF font-bold text-xl'>Avertissements</p>
						{data.avertissements
							? data.avertissements.map((item, index) => (
									<div className='flex justify-center' key={index}>
										<div className='flex flex-col w-full space-y-2 border border-bleuF rounded-lg py-4 pr-4 bg-violet'>
											<div className='grid grid-cols-10 items-center'>
												<div className='flex justify-center'>
													<FaExclamationTriangle className='text-yellow-500 w-6 h-6' />
												</div>
												<div className='flex flex-col col-span-9 flex-grow'>
													<div className='flex justify-between items-center'>
														<p className='text-bleuF font-semibold'>
															{item.titre}
														</p>
														<p className='text-bleuF text-sm'>
															{item.createdAt.split("T")[0]} |{" "}
															{item.createdAt.split("T")[1].split(".")[0]}
														</p>
													</div>
													<p className='text-sm text-bleuF mt-2'>
														{item.contenu}
													</p>
												</div>
											</div>
										</div>
									</div>
							  ))
							: "Aucun avertissement"}
					</div>
					<div className='space-y-2 mt-2'>
						<p className='text-bleuF font-bold text-xl'>Signals</p>
						{data.signalements
							? data.signalements.map((item, index) => (
									<div className='flex justify-center' key={index}>
										<div className='flex flex-col w-full space-y-2 border border-bleuF rounded-lg py-4 pr-4 bg-violet'>
											<div className='grid grid-cols-10 items-center'>
												<div className='flex justify-center'>
													<FaFlag className='text-bleuF w-6 h-6' />
												</div>
												<div className='flex flex-col col-span-9 flex-grow'>
													<div className='flex justify-between items-center'>
														<p className='text-bleuF font-semibold'>
															{item.titre}
														</p>
														<p className='text-bleuF text-sm'>
															{item.createdAt.split("T")[0]} |{" "}
															{item.createdAt.split("T")[1].split(".")[0]}
														</p>
													</div>
													<p className='text-sm text-bleuF mt-2'>
														{item.contenu}
													</p>
												</div>
											</div>
										</div>
									</div>
							  ))
							: "Aucun signal"}
					</div>
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
