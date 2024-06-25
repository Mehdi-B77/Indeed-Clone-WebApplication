import React, { useState, useRef, useEffect } from "react";
import { ButtonRond } from "./ButtonRond";
import { ButtonCarre } from "./ButtonCarre";
import { FaTimesCircle, FaPlus, FaCheckCircle } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import { Spinner } from "./Spinner";
import { InscriptionConfirmation } from "./InscriptionConfirmation";

export function InscriptionEmployeur({ onPass }) {
	const [loading, setLoading] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [entrepriseError, setEntrepriseError] = useState("");

	function validateForm() {
		let isValid = true;

		if (formData.email.trim() === "") {
			setEmailError("Email est requis");
			isValid = false;
		} else {
			setEmailError("");
		}

		if (formData.password.trim() === "") {
			setPasswordError("Mot de passe est requis");
			isValid = false;
		} else {
			setPasswordError("");
		}

		if (formData.entreprise.trim() === "") {
			setEntrepriseError("Nom de l'entreprise est requis");
			isValid = false;
		} else {
			setEntrepriseError("");
		}
		return isValid;
	}

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		entreprise: "",
		service: "",
		sous_service: "",
		numero_EDA: "",
		adresse: {
			rue: "",
			ville: "",
		},
		site_web: "",
		facebook: "",
		linkedin: "",
		contacts: [{ nom: "", email: "", numero: "" }],
	});

	const inputRefs = {
		email: useRef(),
		password: useRef(),
		entreprise: useRef(),
		service: useRef(),
		sous_service: useRef(),
		numero_EDA: useRef(),
		adresse: {
			rue: useRef(),
			ville: useRef(),
		},
		contacts: [
			{
				nom: useRef(),
				email: useRef(),
				numero: useRef(),
			},
		],
		site_web: useRef(),
		facebook: useRef(),
		linkedin: useRef(),
	};

	async function register() {
		const response = await axiosInstance.post(
			`/auth/register/employeur`,
			formData
		);

		if (response.request.status === 200) {
			console.log(response.data);
		}
	}

	async function sendCode() {
		const email = formData.email;
		const response = await axiosInstance.post(`/auth/code`, { email });

		if (response.request.status === 200) {
			console.log(response.data);
		}
	}

	function handleInputChange(event, field, nestedField) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: nestedField
				? {
						...prevFormData[field],
						[nestedField]: value,
				  }
				: value,
		}));
	}

	function handleContactChange(event, index, field) {
		const value = event.target.value;
		setFormData((prevFormData) => {
			const newContacts = [...prevFormData.contacts];
			newContacts[index] = {
				...newContacts[index],
				[field]: value,
			};
			return {
				...prevFormData,
				contacts: newContacts,
			};
		});
	}

	function addContact() {
		setFormData((prevFormData) => ({
			...prevFormData,
			contacts: [
				...prevFormData.contacts,
				{
					nom: "",
					email: "",
					numero: "",
				},
			],
		}));
	}

	function removeContact(index) {
		setFormData((prevFormData) => ({
			...prevFormData,
			contacts: prevFormData.contacts.filter((_, i) => i !== index),
		}));
	}

	function handleClick() {
		console.log(formData);
		const isValid = validateForm();

		if (isValid) {
			setLoading(true);
			sendCode();
			setTimeout(() => {
				setLoading(false);
				setShowConfirmation(true);
			}, 1000);
		}
	}

	const [folderName, setFolderName] = useState("");
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
			setLoading(true);
			const data = new FormData();
			data.append("image", selectedImage);

			try {
				const response = await axiosInstance.post(
					"/auth/upload/" + folderName,
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
						["image"]: response.data.image[0],
					}));
					console.log(formData);
					setUploadedImage(true);

					setLoading(false);
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		} else {
			console.log("Please select a file.");
		}
	};

	const generateUniqueFolderName = () => {
		const prefix = "folderEmployeur";
		const uniqueId = Date.now().toString(36);
		return `${prefix}-${uniqueId}`;
	};

	useEffect(() => {
		setFolderName(generateUniqueFolderName());
	}, []);

	return (
		<div className=' flex justify-center items-center w-full pt-4 pb-4'>
			{!showConfirmation && (
				<div className=''>
					<h1 className='text-xl text-bleuF font-bold mb-6 text-center'>Création de compte employeur</h1>
					<div className={`border-2 border-bleuF pl-3 pr-3 pt-4 rounded-lg`}>
						{/* Basic Information */}
						<h2 className="text-lg font-semibold  text-bleuF  mb-4">Informations de base :</h2>
						<div className='border-b border-gray-300 mb-8 pb-4'>
							<div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>
										Email <span className='text-rouge'>*</span>
									</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='email'
										ref={inputRefs.email}
										onChange={(e) => handleInputChange(e, "email")}
										onFocus={() => setEmailError("")}
									></input>
									<p className='text-rouge text-xs'>{emailError}</p>
								</div>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>
										Mot de passe <span className='text-rouge'>*</span>
									</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='password'
										ref={inputRefs.password}
										onChange={(e) => handleInputChange(e, "password")}
										onFocus={() => setPasswordError("")}
									></input>
									<p className='text-rouge text-xs'>{passwordError}</p>
								</div>
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
										className={`w-16 h-16 rounded-full border border-bleuF`}
									/>
								</div>
								{!uploadedImage && previewUrlImage && (
									<button
										className='rounded bg-violet text-bleuF text-sm font-bold px-2 py-2'
										onClick={() => handleImageUpload()}
									>
										<FaCheckCircle color='465475'/>
									</button>
								)}
								{uploadedImage && <FaCheckCircle color='30CA3F'/>}
							</div>


						</div>
						{/* Company Information */}
						<h2 className="text-lg font-semibold  text-bleuF  mb-4">Informations de l'entreprise :</h2>
						<div className='border-b border-gray-300 mb-8 pb-4'>
							<div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>
										Nom de l'entreprise / Employeur{" "}
										<span className='text-rouge'>*</span>
									</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='text'
										ref={inputRefs.entreprise}
										onChange={(e) => handleInputChange(e, "entreprise")}
										onFocus={() => setEntrepriseError("")}
									></input>
									<p className='text-rouge text-xs'>{entrepriseError}</p>
								</div>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>
										Nom d’un service / département
									</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='text'
										ref={inputRefs.service}
										onChange={(e) => handleInputChange(e, "service")}
									></input>
								</div>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>
										Nom d’un sous service / sous département
									</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='text'
										ref={inputRefs.sous_service}
										onChange={(e) => handleInputChange(e, "sous_service")}
									></input>
								</div>
							</div>

							<div className='grid grid-cols-3 gap-8 mx-4 mb-10'>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>
										Numéro SIREN
									</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='text'
										ref={inputRefs.numero_EDA}
										onChange={(e) => handleInputChange(e, "numero_EDA")}
									></input>
								</div>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>Adresse</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='text'
										ref={inputRefs.adresse.rue}
										onChange={(e) => handleInputChange(e, "adresse", "rue")}
									></input>
								</div>
								<div className='flex flex-col'>
									<label className='text-bleuF text-xs font-bold'>Ville</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='text'
										ref={inputRefs.adresse.ville}
										onChange={(e) => handleInputChange(e, "adresse", "ville")}
									></input>
								</div>
							</div>
						</div>
						<div className='border-b border-gray-300 mb-8 pb-4'>
						{/* Contacts */}
						<div className='flex space-x-4'>
							<p className='text-lg font-semibold  text-bleuF  mb-4'>Contacts</p>
							<button
								className='flex justify-center items-center bg-rouge text-violet w-6 h-6 rounded-full'
								onClick={addContact}
							>
								<FaPlus size={15}/>
							</button>
						</div>

						{formData.contacts.map((contact, index) => (
							<div key={index} className='grid grid-cols-7 gap-8 mx-4 mb-4'>
								<div className='flex flex-col col-span-2'>
									<label className='text-bleuF text-xs font-bold'>Nom</label>
									<input
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='text'
										value={contact.nom}
										onChange={(e) => handleContactChange(e, index, "nom")}
									></input>
								</div>
								<div className='flex flex-col col-span-2'>
									<label className='text-bleuF text-xs font-bold'>Email</label>
									<input
										className=' bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='email'
										value={contact.email}
										onChange={(e) => handleContactChange(e, index, "email")}
									></input>
								</div>
								<div className='flex flex-col col-span-2'>
									<label className='text-bleuF text-xs font-bold'>Numero</label>
									<input
										className=' bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										type='tel'
										value={contact.numero}
										onChange={(e) => handleContactChange(e, index, "numero")}
									></input>
								</div>

								{index > 0 && (
									<div className='flex items-center justify-center'>
										<p
											className='text-rouge cursor-pointer underline text-sm'
											onClick={() => removeContact(index)}
										>
											Supprimer
										</p>
									</div>
								)}
							</div>
						))}
						</div>
						{/* Social Media Links */}

						<p className='text-bleuF text-base font-bold ml-4 mb-2'>
							Liens publics
						</p>

						<div className='grid grid-cols-3 gap-8 mx-4 mb-6'>
							<div className='flex flex-col'>
								<label className='text-bleuF text-xs font-bold'>Site web</label>
								<input
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									type='text'
									ref={inputRefs.site_web}
									onChange={(e) => handleInputChange(e, "site_web")}
								></input>
							</div>
							<div className='flex flex-col'>
								<label className='text-bleuF text-xs font-bold'>Facebook</label>
								<input
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									type='text'
									ref={inputRefs.facebook}
									onChange={(e) => handleInputChange(e, "facebook")}
								></input>
							</div>
							<div className='flex flex-col'>
								<label className='text-bleuF text-xs font-bold'>Linkedin</label>
								<input
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									type='text'
									ref={inputRefs.linkedin}
									onChange={(e) => handleInputChange(e, "linkedin")}
								></input>
							</div>
						</div>
					</div>
					<div className='flex justify-center mr-4'>
						<div className='w-1/4'>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"violet"}
								contenu={"Continuer"}
								width={"w-full mt-2"}
								height={"fit"}
								onclick={handleClick}
							></ButtonCarre>
						</div>
					</div>
				</div>
			)}

			{loading && <Spinner />}

			{showConfirmation && (
				<InscriptionConfirmation data={formData.email} onConfirm={register} />
			)}
		</div>
	);
}
