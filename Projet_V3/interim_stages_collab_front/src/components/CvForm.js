import React, { useState, useRef } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { axiosInstance } from "../util/axios";
import { FaCheckCircle } from "react-icons/fa";

export function CvForm({ data, onConfirm, onDismiss }) {
	const [cv, setCv] = useState(data);
	const [folderName, setFolderName] = useState(data.split("/")[2]);
	const [loading, setLoading] = useState(false);

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
				if (response.status === 200) {
					setCv(response.data.cv[0]);
					setUploadedCv(true);
					console.log(response.data);

					setLoading(false);
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
		} else {
			console.log("Please select a file.");
		}
	};

	const handleConfirm = async () => {
		try {
			setLoading(true);

			await onConfirm({ cv: cv });
			setLoading(false);
			onDismiss();
		} catch (error) {
			console.error("Confirmation error:", error);
			setLoading(false);
		}
	};

	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			{!loading && (
				<div className='w-1/2 h-fit bg-white p-4 rounded-md space-y-4 relative'>
					<div className='space-y-2 relative'>
						<div className='flex w-full h-full items-center space-x-4 justify-center relative'>
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
								onChange={handleCvChange}
							/>

							<div className='flex w-full h-full'>
								{pdfObjectUrl ? (
									<object
										data={pdfObjectUrl}
										type='application/pdf'
										className='flex w-full h-full bg-black'
									></object>
								) : (
									<img
										src={previewUrlCv}
										className={`flex w-full h-1/2 bg-black`}
									/>
								)}
							</div>
							{!uploadedCv && (pdfObjectUrl || previewUrlCv) && (
								<button
									className='rounded bg-violet text-bleuF text-sm font-bold px-2 py-2'
									onClick={() => handleCvUpload()}
								>
									<FaCheckCircle color='465475' />
								</button>
							)}
							{uploadedCv && <FaCheckCircle color='30CA3F' />}
						</div>
					</div>

					<div className='flex justify-end space-x-2'>
						<ButtonCarre
							couleur={"bleuF"}
							couleurTexte={"violet"}
							contenu={"Annuler"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={onDismiss}
						></ButtonCarre>
						<ButtonCarre
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Modifier"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={handleConfirm}
						></ButtonCarre>
					</div>
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
