import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ButtonRond } from "./ButtonRond";
import { FaFileUpload, FaCheckCircle } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { axiosInstance } from "../util/axios";
import { CvCandidature } from "./CvCandidature";
import {ButtonCarre} from "./ButtonCarre";

export function Apply({ data, onConfirm }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [selectedMotivation, setSelectedMotivation] = useState(-1);
	let { id } = useParams();
	const [formData, setFormData] = useState({
		nom: "",
		prenom: "",
		date_naissance: "",
		nationalite: "",
		numero: "",
		email: "",
		ville: "",
		cv: "",
		motivation: "",
		commentaire: "",
	});

	const [candidature, setCandidature] = useState({
		cv: "",
		motivation: "",
		commentaire: "",
		offre: id,
	});

	async function getProfile() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/users/profile", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setFormData((prevFormData) => ({
					...prevFormData,
					nom: response.data.nom,
					prenom: response.data.prenom,
					date_naissance: response.data.date_naissance,
					nationalite: response.data.nationalite,
					numero: response.data.numero,
					email: response.data.email,
					ville: response.data.ville,
				}));
				console.log(data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	const [folderName, setFolderName] = useState(
		"candidature_" + user.username.replace(/\s/g, "") + "_" + id
	);
	const [selectedCv, setSelectedCv] = useState(null);
	const [previewUrlCv, setPreviewUrlCv] = useState(null);
	const [uploadedCv, setUploadedCv] = useState(false);
	const [pdfObjectUrl, setPdfObjectUrl] = useState("");

	const handleCvChange = (event) => {
		const file = event.target.files[0];
		setSelectedCv(file);
		if (file) {
			setUploadedCv(false);
			const fileType = file.type.split("/")[1]; // Get the file extension
			if (fileType === "pdf") {
				setPdfObjectUrl(URL.createObjectURL(file)); // Set PDF URL for object element
				setPreviewUrlCv(null); // Reset image preview
				setUrl("");
			} else if (
				fileType === "jpeg" ||
				fileType === "jpg" ||
				fileType === "png"
			) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreviewUrlCv(reader.result); // Set image preview URL
				};
				reader.readAsDataURL(file);
				setPdfObjectUrl(null); // Reset PDF URL
				setUrl("");
			} else {
				console.log("Unsupported file format.");
			}
		} else {
			setPreviewUrlCv(null);
			setPdfObjectUrl(null);
		}
	};

	const handleCvUpload = async () => {
		if (selectedCv) {
			const data = new FormData();
			data.append("cv", selectedCv);

			try {
				const response = await axiosInstance.post(
					"/candidatures/upload/" + folderName,
					data,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
				if (response.status === 200) {
					setCandidature((prevFormData) => ({
						...prevFormData,
						cv: response.data,
					}));
					setUploadedCv(true);
					console.log("r", response.data);
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		} else {
			console.log("Please select a file.");
		}
	};

	const [selected, setSelected] = useState("");

	const handleCvSelect = (event) => {
		setSelected(event.target.value);
		getUrl();
		console.log(url + selected);
		setPreviewUrlCv(null);
		setPdfObjectUrl(null);
		setCandidature((prevFormData) => ({
			...prevFormData,
			cv: event.target.value,
		}));
	};

	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/candidatures");
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

	const handleClick = async () => {
		await onConfirm(candidature);
	};

	const redirectToProfile = () => {
		window.location.href = "/chercheur/profile";
	};

	return (
		<div className='overlay flex justify-center border-2 rounded-md w-1/2 mx-auto border-bleuF'>
			<div className='justify-center items-center p-4 w-full h-4/5 rounded-lg'>
				<h1 className='text-xl text-bleuF font-bold mb-10'>Postuler</h1>
				<h2 className='text-lg text-bleuF font-bold mb-2'>Informations personnelles</h2>
				<div className='grid grid-cols-2 gap-8 mb-10 bg-gray-200 p-2 rounded-md'>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Nom</label>
						<input
							id='nomInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							value={formData.nom}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Prénom</label>
						<input
							id='prenomInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							value={formData.prenom}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>
							Date de naissance
						</label>
						<input
							id='dateNaissanceInput'
							className='bg-violet border border-gray-400 rounded-md p-1 text-sm focus:outline-none focus:border-blue-500'
							type='date'
							value={formData.date_naissance}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Nationalité</label>
						<input
							id='nationaliteInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							value={formData.nationalite}
							readOnly
						></input>
					</div>
				</div>
				<div className='grid grid-cols-2 gap-8 mb-10 bg-gray-200 p-2 rounded-md'>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>
							Numéro de téléphone
						</label>
						<input
							id='telephoneInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='tel'
							value={formData.numero}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Email</label>
						<input
							id='emailInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
							value={formData.email}
							readOnly
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Ville</label>
						<input
							id='villeInput'
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							value={formData.ville}
							readOnly
						></input>
					</div>
					<div className='flex space-x-2 ml-4'>
						<BsInfoCircleFill color={"FF584D"}/>
						<p className='text-rouge text-xs font-bold'>
							Pour modifier vos infos personnelles,{" "}
							<span
								className='hover:underline cursor-pointer'
								onClick={redirectToProfile}
							>
								cliquez ici
							</span>
						</p>
					</div>
				</div>
				<h2 className='text-lg text-bleuF font-bold mb-2'>CV</h2>
				<div className='grid grid-cols-4 gap-8 mb-10 items-center bg-gray-200 p-2 rounded-md'>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>
							Choisir ou saisir un CV :
						</label>
						<select
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							onChange={(e) => handleCvSelect(e)}
						>
							<option value=''>Choisir un CV existant</option>
							{data.map((item, index) =>
								item.dossier && item.dossier.cv ? (
									<option key={index} value={item.dossier.cv}>
										CV{index + 1}
									</option>
								) : null
							)}
						</select>
					</div>

					<div>
						<iframe src={url + selected} width='100%' height='500px'/>
					</div>

					<div className='flex w-full h-full col-span-2 items-center space-x-4 justify-center relative'>
						<label
							htmlFor='cvInput'
							className='rounded bg-violet text-bleuF text-sm h-fit font-bold px-2 py-1 cursor-pointer'
						>
							Importer
						</label>

						<input
							id='cvInput'
							className='hidden'
							type='file'
							onChange={(e) => handleCvChange(e)}
						/>

						<div className='flex w-full h-44'>
							{pdfObjectUrl ? (
								<object
									data={pdfObjectUrl}
									type='application/pdf'
									width='100%'
								></object>
							) : (
								<img
									src={previewUrlCv}
									className={`flex w-full h-44 border border-bleuF`}
								/>
							)}
						</div>
						{!uploadedCv && (pdfObjectUrl || previewUrlCv) && (
							<button
								className='rounded bg-violet text-bleuF text-sm font-bold px-2 py-2'
								onClick={() => handleCvUpload()}
							>
								<FaCheckCircle color='465475'/>
							</button>
						)}
						{uploadedCv && <FaCheckCircle color='30CA3F'/>}
					</div>
				</div>
				<h2 className='text-lg text-bleuF font-bold mb-2'>Lettre de motivation</h2>
				<div className='grid grid-cols-2 gap-8 mb-10 items-center bg-gray-200 p-2 rounded-md'>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>
							Choisir ou saisir une motivation :
						</label>
						<select
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							onChange={(e) => {
								const newValue = e.target.value;
								setCandidature((prevCandidature) => ({
									...prevCandidature,
									motivation: newValue,
								}));
							}}
						>
							<option value=''>Choisir une motivation</option>
							{data.map((item, index) =>
								item.dossier && item.dossier.motivation ? (
									<option value={item.dossier.motivation} key={index}>
										{item.dossier.motivation}
									</option>
								) : null
							)}

						</select>
					</div>
					<div className='flex flex-col col-span-3'>
						<textarea
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							rows='8'
							type='text'
							value={candidature.motivation}
							onChange={(e) => {
								const newValue = e.target.value;
								setCandidature((prevCandidature) => ({
									...prevCandidature,
									motivation: newValue,
								}));
							}}
						/>
					</div>
				</div>
				<h2 className='text-lg text-bleuF font-bold mb-2'>Commentaire</h2>
				<div className='grid grid-cols-2 gap-8 mb-10 items-center bg-gray-200 p-2 rounded-md'>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>
							Choisir ou saisir un commentaire :
						</label>
						<select
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							onChange={(e) => {
								const newValue = e.target.value;
								setCandidature((prevCandidature) => ({
									...prevCandidature,
									commentaire: newValue,
								}));
							}}>
							<option value=''>Choisir un commentaire</option>
							{data.map((item, index) =>
								item.dossier && item.dossier.commentaire ? (
									<option value={item.dossier.commentaire} key={index}>
										{item.dossier.commentaire}
									</option>
								) : null
							)}

						</select>

					</div>
					<div className='flex flex-col col-span-3'>
						<textarea
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							rows='4'
							type='text'
							value={candidature.commentaire}
							onChange={(e) => {
								const newValue = e.target.value;
								setCandidature((prevCandidature) => ({
									...prevCandidature,
									commentaire: newValue,
								}));
							}}
						/>
					</div>
				</div>

				<div className='flex justify-center'>
					<ButtonCarre
						couleur={"rouge"}
						couleurTexte={"violet"}
						contenu={"Continuer"}
						width={"fit"}
						height={"fit"}
						onclick={() => {
							console.log(candidature);
							onConfirm(candidature);
						}}
					></ButtonCarre>
				</div>
			</div>
		</div>
	);
}
