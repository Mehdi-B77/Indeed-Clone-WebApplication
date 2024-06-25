import React, { useState, useEffect } from "react";
import { FaTimesCircle, FaCheckCircle, FaPlus } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import {
	ButtonCarre,
	MetierForm,
	Spinner,
} from "../components";
export function NouvelleOffre({ onClose, onConfirm }) {
	const [selected, setSelected] = useState("");
	const [metiers, setMetiers] = useState([]);

	const [formData, setFormData] = useState({
		titre: "",
		metier: "",
		image: "",
		description: "",
		lieu: "",
		debut: "",
		fin: "",
		remuneration: "",
	});

	async function getMetiers() {
		try {
			const response = await axiosInstance.get("/offres/metiers");

			console.log(response);

			if (response.request.status === 200) {
				setMetiers(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getMetiers();
	}, []);

	function handleInputChange(event, field) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: value,
		}));
	}

	async function addOffre() {
		const accessToken = localStorage.getItem("accessToken");
		const response = await axiosInstance.post(
			`/offres/employeur/add`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (response.status === 201) {
			console.log(response.data.data);
		}
	}

	function handleClick() {
		addOffre();
		console.log(formData);
		onConfirm();
	}

	const user = JSON.parse(localStorage.getItem("user"));
	const [folderName, setFolderName] = useState(
		user.username + "_" + user.email
	);
	const [selectedImage, setSelectedImage] = useState(null);
	const [previewUrlImage, setPreviewUrlImage] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(false);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setSelectedImage(file);
		console.log(file);
		if (file) {
			setUploadedImage(false);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrlImage(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setPreviewUrlImage(null);
		}
	};

	const handleImageUpload = async () => {
		if (selectedImage) {
			const data = new FormData();
			data.append("image", selectedImage);

			try {
				const response = await axiosInstance.post(
					"/offres/upload/" + folderName,
					data,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);
				console.log(response);
				if (response.status === 200) {
					console.log("done");
					setFormData((prevFormData) => ({
						...prevFormData,
						["image"]: response.data,
					}));
					console.log(formData);
					setUploadedImage(true);
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		} else {
			console.log("Please select a file.");
		}
	};
	const [showForm, setShowForm] = useState(false);
	let [loading, setLoading] = useState(false);

	async function addMetier(nom, secteur, description) {
		try {
			setLoading(true);
			const response = await axiosInstance.post("/offres/metiers/add", {
				nom,
				secteur,
				description,
			});

			if (response.request.status === 201) {
				setLoading(false);
				getMetiers();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}
	return (
		<div>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 block`}
			/>
			<div className='fixed z-50 overlay flex flex-col items-center p-4 w-3/4 h-fit bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
				<div className='flex justify-between w-full mb-6'>
					<h1 className='text-xl text-bleuF font-bold mb-6'>Nouvelle Offre</h1>
				</div>

				<div className='grid grid-cols-3 gap-8 mb-4 w-full'>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Titre</label>
						<input
							className='bg-violet text-bleuF border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "titre")}
						></input>
					</div>

					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Métier cible</label>
						<select
							className='bg-violet text-bleuF border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							onChange={(e) => {
								handleInputChange(e, "metier");
								setSelected(e.target.value);
							}}
						>
							<option value=''>Sélectionnez un métier</option>
							{metiers.map((item, index) => (
								<option key={item._id} value={item._id}>
									{item.nom}
								</option>
							))}
						</select>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={<FaPlus />}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => {
								setShowForm(true);
							}}
						></ButtonCarre>
						{showForm && (
							<MetierForm
								titre={"Ajouter un métier"}
								onConfirm={(nom, secteur, description) => {
									addMetier(nom, secteur, description);
								}}
								onDismiss={() => setShowForm(false)}
							/>
						)}
						{loading && <Spinner />}
					</div>
					<div className='flex items-center space-x-4 justify-center'>
						<label
							htmlFor='imageInput'
							className='rounded bg-violet text-bleuF text-sm h-fit font-bold px-2 py-1 cursor-pointer'
						>
							Importer
						</label>

						<input
							id='imageInput'
							className='hidden'
							type='file'
							onChange={handleImageChange}
						/>

						<div>
							<img
								src={previewUrlImage}
								className={`w-16 h-16 border border-bleuF`}
							/>
						</div>
						{!uploadedImage && previewUrlImage && (
							<button
								className='rounded bg-violet text-bleuF text-sm font-bold px-2 py-2'
								onClick={() => handleImageUpload()}
							>
								<FaCheckCircle color='465475' />
							</button>
						)}
						{uploadedImage && <FaCheckCircle color='30CA3F' />}
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mx-4 mb-4 w-full'>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Début</label>
						<input
							className='bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='date'
							onChange={(e) => handleInputChange(e, "debut")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Fin</label>
						<input
							className='bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='date'
							onChange={(e) => handleInputChange(e, "fin")}
						></input>
					</div>
				</div>
				<div className='grid grid-cols-3 gap-8 mb-4 w-full'>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Rémunération</label>
						<input
							className='bg-violet text-bleuF border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "remuneration")}
						></input>
					</div>
					<div className='flex flex-col'>
						<label className='text-bleuF text-xs font-bold'>Lieu</label>
						<input
							className='bg-violet text-bleuF border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							onChange={(e) => handleInputChange(e, "lieu")}
						></input>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 mb-4 w-full'>
					<div className='flex flex-col col-span-2'>
						<label className='text-bleuF text-xs font-bold'>Description</label>
						<textarea
							className='bg-violet text-bleuF border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							rows='4'
							onChange={(e) => handleInputChange(e, "description")}
						></textarea>
					</div>
				</div>

				<div className='w-full'>
					<div className='flex justify-end space-x-2'>
						<ButtonCarre
							couleur={"bleuF"}
							couleurTexte={"violet"}
							contenu={"Annuler"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={onClose}
						></ButtonCarre>
						<ButtonCarre
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Ajouter"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={handleClick}
						></ButtonCarre>
					</div>
				</div>
			</div>
		</div>
	);
}
