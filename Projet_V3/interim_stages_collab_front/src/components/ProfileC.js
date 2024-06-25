import React, { useState, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { RiEdit2Fill  } from "react-icons/ri";
import { OneForm } from "./OneForm";
import { PasswordForm } from "./PasswordForm";
import { CvForm } from "./CvForm";
import { axiosInstance } from "../util/axios";

export function ProfileC({ data, onUpdate }) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({ email: "" });
	const [showForm, setShowForm] = useState(false);
	const [showPasswordForm, setShowPasswordForm] = useState(false);
	const [showCvForm, setShowCvForm] = useState(false);

	const [url, setUrl] = useState("");

	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/auth");
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
		getUrl();
	}, []);

	return (
		<div className='w-1/3 mx-auto'>
			<h1 className='text-bleuF text-3xl font-bold text-center mt-4'>Mon profil</h1>
			<div className=' m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>Compte</p>
					<div className='grid grid-cols-1'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Email</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Email",
											key: "email",
											value: data.email,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF pb-2'>{data.email}</p>
						</div>

						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Mot de passe</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setShowPasswordForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>*********</p>
						</div>
					</div>
				</div>
			</div>
			<div className=' m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>
						Informations personnelles
					</p>
					<div className='grid grid-cols-2'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Nom</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Nom",
											key: "nom",
											value: data.nom,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.nom}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Prénom</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Prénom",
											key: "prenom",
											value: data.prenom,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.prenom}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Nationalité</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Nationalité",
											key: "nationalite",
											value: data.nationalite,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.nationalite}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Etablissement</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Etablissement",
											key: "nom_etablissement",
											value: data.nom_etablissement,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.nom_etablissement}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Ville</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Ville",
											key: "ville",
											value: data.ville,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.ville}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Téléphone</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData(data.cv);
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF pb-2'>{data.numero}</p>
						</div>
					</div>

				</div>
			</div>
			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='space-y-6'>
					<div className='flex items-center space-x-2'>
						<p className='text-bleuF font-bold'>Cv</p>
						<RiEdit2Fill 
							size={10}
							color={"#FF584D"}
							className='cursor-pointer'
							onClick={() => {
								setFormData(data.cv);
								setShowCvForm(true);
							}}
						/>
					</div>
					<object
						data={url + data.cv}
						type='application/pdf'
						width='100%'
						height='500px'
					/>
				</div>
			</div>

			{showForm && (
				<OneForm
					data={formData}
					onConfirm={(data) => onUpdate(data)}
					onDismiss={() => setShowForm(false)}
				/>
			)}

			{showPasswordForm && (
				<PasswordForm
					onConfirm={(data) => onUpdate(data)}
					onDismiss={() => setShowPasswordForm(false)}
				/>
			)}

			{showCvForm && (
				<CvForm
					data={formData}
					onConfirm={(data) => onUpdate(data)}
					onDismiss={() => setShowCvForm(false)}
				/>
			)}

			{loading && <Spinner/>}
		</div>
	);
}
