import React, { useState, useEffect } from "react";
import { ButtonRond } from "./ButtonRond";
import { ButtonCarre } from "./ButtonCarre";
import { FaFileUpload, FaCheckCircle } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import { Spinner } from "./Spinner";
import { InscriptionConfirmation } from "./InscriptionConfirmation";
import {Header} from "./Header";
import {Footer} from "./Footer";

export function InscriptionChercheur() {
	const [loading, setLoading] = useState(false);
	const [folderName, setFolderName] = useState("");
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		image: "",
		nom: "",
		prenom: "",
		date_naissance: "",
		nationalite: "",
		numero: "",
		ville: "",
		etablissement: "",
		annee_entrée: "",
		cv: "",
	});

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [nomError, setNomError] = useState("");
	const [prenomError, setPrenomError] = useState("");
	const [dateNaissanceError, setDateNaissanceError] = useState("");
	const [nationaliteError, setNationaliteError] = useState("");
	const [villeError, setVilleError] = useState("");
	const [etablissementError, setEtablissementError] = useState("");
	const [annee_entreeError, setAnneeEntreeError] = useState("");
    const [etablissements, setEtablissements] = useState([]);

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

		if (formData.nom.trim() === "") {
			setNomError("Nom est requis");
			isValid = false;
		} else {
			setNomError("");
		}

		if (formData.prenom.trim() === "") {
			setPrenomError("Prénom est requis");
			isValid = false;
		} else {
			setPrenomError("");
		}

		if (formData.date_naissance.trim() === "") {
			setDateNaissanceError("Date de naissance est requise");
			isValid = false;
		} else {
			setDateNaissanceError("");
		}

		if (formData.nationalite.trim() === "") {
			setNationaliteError("Nationalité est requise");
			isValid = false;
		} else {
			setNationaliteError("");
		}

		if (formData.ville.trim() === "") {
			setVilleError("Ville est requise");
			isValid = false;
		} else {
			setVilleError("");
		}
		if (formData.etablissement.trim() === "") {
			setEtablissementError("Etablissement est requis");
			isValid = false;
		} else {
			setEtablissementError("");
		}

		if (formData.annee_entrée.trim() === "") {
			setAnneeEntreeError("Année d'entrée est requise");
			isValid = false;
		} else {
			setAnneeEntreeError("");
		}

		return isValid;
	}

	function handleInputChange(event, field) {
		const value = event.target.value;
		setFormData((prevFormData) => ({
			...prevFormData,
			[field]: value,
		}));
	}

	// Image  uploading function
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

	// Cv uploading function
	const [selectedCv, setSelectedCv] = useState(null);
	const [previewUrlCv, setPreviewUrlCv] = useState(null);
	const [uploadedCv, setUploadedCv] = useState(false);
	const [pdfObjectUrl, setPdfObjectUrl] = useState("");

	const handleCvChange = (event) => {
		const file = event.target.files[0];
		setSelectedCv(file);
		console.log(file);
		if (file) {
			setUploadedCv(false);
			const fileType = file.type.split("/")[1]; // Get the file extension
			console.log(fileType); // Log the file extension

			if (fileType === "pdf") {
				setPdfObjectUrl(URL.createObjectURL(file)); // Set PDF URL for object element
				setPreviewUrlCv(null); // Reset image preview
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
			setLoading(true);
			const data = new FormData();
			data.append("cv", selectedCv);

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
						["cv"]: response.data.cv[0],
					}));
					console.log(formData);
					setUploadedCv(true);

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
		const prefix = "folder";
		const uniqueId = Date.now().toString(36);
		return `${prefix}-${uniqueId}`;
	};

	useEffect(() => {
		setFolderName(generateUniqueFolderName());
	}, []);

	async function submitData() {
		try {
			console.log(formData);
			const response = await axiosInstance.post(
				`/auth/register/chercheur`,
				formData
			);

			if (response.request.status === 200) {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleSubmit = async () => {
		await submitData();
	};

	async function sendCode() {
		const email = formData.email;

		const response = await axiosInstance.post(`/auth/code`, { email });

		if (response.request.status === 200) {
			console.log(response.data);
		}
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
	useEffect(() => {
        const fetchEtablissements = async () => {
            try {
                const response = await axiosInstance.get('/users/getetablissement');
                setEtablissements(response.data);
				console.log(response.data);
            } catch (error) {
                console.error("Error fetching établissements:", error);
            }
        };

        fetchEtablissements();
    }, []);

	return (

		<div className='flex justify-center items-center w-full pt-4 pb-4'>
			{!showConfirmation && (
				<div
					>
					<h1 className='text-xl text-bleuF font-bold mb-6 text-center'>Création de compte étudiant</h1>
					<div className={`border-2 border-bleuF pl-3 pr-3 pt-4 rounded-lg`}>
					{/* Basic Information */}
					<h2 className="text-lg font-semibold  text-bleuF  mb-4">Informations de base :</h2>
					<div className='border-b border-gray-300 mb-8 pb-4'>
						<div className='grid grid-cols-3 gap-8 mx-4'>
							{/* Email */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Email <span className='text-red-500'>*</span>
								</label>
								<input
									className='input-field border-2'
									type='email'
									onChange={(e) => handleInputChange(e, "email")}
									onFocus={() => setEmailError("")}
								/>
								<p className='text-red-500 text-xs'>{emailError}</p>
							</div>

							{/* Password */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Mot de passe <span className='text-red-500'>*</span>
								</label>
								<input
									className='input-field border-2'
									type='password'
									onChange={(e) => handleInputChange(e, "password")}
									onFocus={() => setPasswordError("")}
								/>
								<p className='text-red-500 text-xs'>{passwordError}</p>
							</div>

							{/* Photo */}
							<div className='flex flex-col'>
								<label
									htmlFor='imageInput border-2'
									className='rounded bg-bleuF text-white text-sm font-semibold px-2 py-1 cursor-pointer'
								>
									Importer une photo de profil
								</label>
								{/* Input for photo import */}
								<input
									id='imageInput border-2'
									className='hidden'
									type='file'
									onChange={handleImageChange}
								/>
								{/* Photo preview */}
								<div>
									<img
										src={previewUrlImage}
										className='rounded-full w-16 h-16 border border-bleuF'
									/>
								</div>
								{/* Button to upload photo */}
								{!uploadedImage && previewUrlImage && (
									<button
										className='rounded bg-bleuF text-white text-sm font-semibold px-2 py-2'
										onClick={() => handleImageUpload()}
									>
										<FaCheckCircle color='465475'/>
									</button>
								)}
								{/* Uploaded indicator */}
								{uploadedImage && <FaCheckCircle color='30CA3F'/>}
							</div>
						</div>
					</div>

					{/* Personal Information */}
					<h2 className="text-lg font-semibold mb-4  text-bleuF ">Informations personnelles :</h2>
					<div className='border-b border-gray-300 mb-8 pb-4'>
						<div className='grid grid-cols-3 gap-8 mx-4'>
							{/* Nom */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Nom <span className='text-red-500'>*</span>
								</label>
								<input
									className='input-field border-2'
									type='text'
									onChange={(e) => handleInputChange(e, "nom")}
									onFocus={() => setNomError("")}
								/>
								<p className='text-red-500 text-xs'>{nomError}</p>
							</div>
							{/* Prénom */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Prénom <span className='text-red-500'>*</span>
								</label>
								<input
									className='input-field border-2'
									type='text'
									onChange={(e) => handleInputChange(e, "prenom")}
									onFocus={() => setPrenomError("")}
								/>
								<p className='text-red-500 text-xs'>{prenomError}</p>
							</div>
							{/* Date de naissance */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Date de naissance <span className='text-red-500'>*</span>
								</label>
								<input
									className='input-field border-2'
									type='date'
									onChange={(e) => handleInputChange(e, "date_naissance")}
									onFocus={() => setDateNaissanceError("")}
								/>
								<p className='text-red-500 text-xs'>{dateNaissanceError}</p>
							</div>
						</div>
					</div>

					{/* Additional Information */}
					<h2 className="text-lg font-semibold mb-4  text-bleuF ">Informations supplémentaires :</h2>
					<div className='border-b border-gray-300 mb-8 pb-4'>
						<div className='grid grid-cols-3 gap-8 mx-4'>
							{/* Nationalité */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Nationalité <span className='text-red-500'>*</span>
								</label>
								<input
									className='input-field border-2'
									type='text'
									onChange={(e) => handleInputChange(e, "nationalite")}
									onFocus={() => setNationaliteError("")}
								/>
								<p className='text-red-500 text-xs'>{nationaliteError}</p>
							</div>
							{/* Ville */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Ville <span className='text-red-500'>*</span>
								</label>
								<input
									className='input-field border-2'
									type='text'
									onChange={(e) => handleInputChange(e, "ville")}
									onFocus={() => setVilleError("")}
								/>
								<p className='text-red-500 text-xs'>{villeError}</p>
							</div>
							{/* Numéro de téléphone */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Numéro de téléphone
								</label>
								<input
									className='input-field border-2'
									type='tel'
									onChange={(e) => handleInputChange(e, "numero")}
								/>
							</div>
						</div>
					</div>

					{/* Educational Information */}
					<h2 className="text-lg font-semibold mb-4  text-bleuF ">Informations scolaires :</h2>
					<div className=' border-gray-300 mb-8'>
						<div className='grid grid-cols-3 gap-8 mx-4'>
							{/* Etablissement */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Etablissement<span className='text-red-500'>*</span>
								</label>
								<select
									className='input-field  text-bleuF border-2'
									onChange={(e) => handleInputChange(e, "etablissement")}
									onFocus={() => setEtablissementError("")}
								>
									<option className={ `text-bleuF` } value=''>Choisir un établissement</option>
									{etablissements.map((item, index) =>
										item.nom && item.nom ? (
											<option key={index} value={item.nom} className={` text-bleuF` }>
												{item.nom}
											</option>
										) : null
									)}
								</select>
								<p className='text-red-500 text-xs'>{etablissementError}</p>
							</div>
							{/* Année d'entrée */}
							<div className='flex flex-col'>
								<label className='text-bleuF text-sm font-semibold'>
									Année d'entrée <span className='text-red-500'>*</span>
								</label>
								<input
									className='input-field border-2'
									type='text'
									onChange={(e) => handleInputChange(e, "annee_entrée")}
									onFocus={() => setAnneeEntreeError("")}
								/>
								<p className='text-red-500 text-xs'>{annee_entreeError}</p>
							</div>
							{/* CV */}
							<div className='flex flex-col'>
								<label
									htmlFor='cvInput'
									className='rounded bg-bleuF text-white text-sm font-semibold px-2 py-1 cursor-pointer'
								>
									Importer un CV
								</label>
								<input
									id='cvInput'
									className='hidden'
									type='file'
									onChange={handleCvChange}
								/>
								<div>
									{pdfObjectUrl ? (
										<object
											data={pdfObjectUrl}
											type='application/pdf'
											className='w-16 h-16 border border-bleuF'
										></object>
									) : (
										<img
											src={previewUrlCv}
											className={`w-16 h-16 border border-bleuF`}
										/>
									)}
								</div>
								{!uploadedCv && (pdfObjectUrl || previewUrlCv) && (
									<button
										className='rounded bg-bleuF text-white text-sm font-semibold px-2 py-2'
										onClick={() => handleCvUpload()}
									>
										<FaCheckCircle color='465475'/>
									</button>
								)}
								{uploadedCv && <FaCheckCircle color='30CA3F'/>}
							</div>
						</div>
					</div>
					</div>
					{/* Submission Button */}
					<div className='flex justify-center mr-4'>
						<div className='w-1/4'>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"white"}
								contenu={"Continuer"}
								width={"w-full mt-2"}
								height={"fit"}
								onclick={handleClick}
							/>
						</div>
					</div>
				</div>
			)}

			{loading && <Spinner/>}

			{showConfirmation && (
				<InscriptionConfirmation
					data={formData.email}
					onConfirm={handleSubmit}
				/>
			)}
		</div>

	);
}
