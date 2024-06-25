import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	CadreEmploi,
	CadreChercheur,
	Spinner,
	DocumentViewer, Footer,
} from "../../components";
import { FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";
import { ButtonCarre } from "../../components";
import { AttestationForm } from "../../components";

export function EmploiEmployeur() {
	let [data, setData] = useState({});
	let [showAttestationForm, setShowAttestationForm] = useState(false);
	let [loading, setLoading] = useState(false);

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
				console.log(data);
				setData(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function uploadAttestation(attestation) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/emplois/employeur/uploadAttestation",
				{ id, attestation },
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

	const [folderName, setFolderName] = useState("emploi" + "_" + id);

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

	useEffect(() => {
		getEmploi();
		getUrl();
	}, []);

	return (
		<div className='min-h-screen flex flex-col'>
			<HeaderEmployeur></HeaderEmployeur>
			<div className='mx-6 my-2 bg-white rounded-lg p-4 border shadow'>
				<div className='grid grid-cols-2 gap-4'>
					<div className='flex flex-col'>
						<div className='flex items-center space-x-6'>
							<p className='text-xl font-bold text-rouge'>Stage</p>
							<div className='flex-grow'>
								<CadreEmploi Emploi={data} className={""} />
							</div>
						</div>

						<div className='flex items-center justify-between space-x-2 mt-10'>
							<p className='text-bleuF font-bold'>Attestation de travail</p>
							<ButtonCarre
								couleur='bleuF'
								couleurTexte={"violet"}
								contenu={"Importer"}
								width={"w-32 text-xs"}
								height={"fit"}
								onclick={() => {
									setShowAttestationForm(true);
								}}
							></ButtonCarre>
						</div>
					</div>
					<div className='flex flex-col'>
						<div className='flex items-center space-x-6'>
							<p className='text-xl font-bold text-bleuF'>Candidat</p>
							<div className='flex-grow'>
								<CadreChercheur data={data.chercheur} className={""} />
							</div>
						</div>
					</div>
				</div>
				<div className='mt-4'>
					<iframe src={url + data.attestation} width='100%' height='500px' />
				</div>
			</div>

			{showAttestationForm && (
				<AttestationForm
					data={folderName}
					onConfirm={(attestation) => uploadAttestation(attestation)}
					onDismiss={() => setShowAttestationForm(false)}
				/>
			)}
			<Footer />
			{loading && <Spinner />}
		</div>
	);
}
