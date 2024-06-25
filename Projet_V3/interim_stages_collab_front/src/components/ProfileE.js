import React, { useState } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { RiEdit2Fill  } from "react-icons/ri";
import { OneForm } from "./OneForm";
import { PasswordForm } from "./PasswordForm";
import { Abonnements } from "./Abonnements";
import Switch from "react-switch";

export function ProfileE({ data, onUpdate }) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({ email: "" });
	const [showForm, setShowForm] = useState(false);
	const [showPasswordForm, setShowPasswordForm] = useState(false);

	const [showAbonnements, setShowAbonnements] = useState(false);

	const handleChange = () => {
		const spontanee = !data.spontanee;
		console.log(spontanee);
		onUpdate({ spontanee: spontanee });
	};

	return (
		<div className='w-1/3 mx-auto'>
			<h1 className='text-bleuF text-3xl font-bold text-center mt-4'>Mon profil</h1>
				<div className='  m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
					<div className='col-span-3 space-y-6'>
						<p className='text-rouge font-bold text-lg'>Compte</p>
						<div className='grid grid-cols-2'>
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
				<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
					<div className='col-span-3 space-y-6'>
						<div className='flex justify-between'>
							<p className='text-rouge font-bold text-lg'>
								Abonnement{" "}
								{data.abonnement ? (
									data.abonnement.debut ? (
										<p className='text-vertF inline'>(Actif)</p>
									) : (
										""
									)
								) : (
									""
								)}
							</p>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"violet"}
								contenu={"Détails"}
								width={"w-full text-xs"}
								height={"fit"}
								onclick={() => setShowAbonnements(true)}
							></ButtonCarre>
						</div>
						<div className='grid grid-cols-2'>
							<div className='flex flex-col space-y-1'>
								<div className='flex items-center space-x-2'>
									<p className='text-bleuF font-bold'> Date début</p>
								</div>
								<p className='text-sm text-bleuF'>
									{data.abonnement ? data.abonnement.debut : ""}
								</p>
							</div>

							<div className='flex flex-col space-y-1'>
								<div className='flex items-center space-x-2'>
									<p className='text-bleuF font-bold'> Date fin</p>
								</div>
								<p className='text-sm text-bleuF'>
									{data.abonnement ? data.abonnement.fin : ""}
								</p>
							</div>
						</div>
					</div>
				</div>
			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>
						Informations personnelles
					</p>
					<div className='grid grid-cols-4'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Nom de l'entreprise</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Nom de l'entreprise",
											key: "entreprise",
											value: data.entreprise,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>{data.entreprise}</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Service</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Service",
											key: "service",
											value: data.service,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>
								{data.service ? data.service : "-"}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Sous-service</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Sous-service",
											key: "sous_service",
											value: data.sous_service,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>
								{data.sous_service ? data.sous_service : "-"}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>SIREN</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Numero EDA",
											key: "numero_EDA",
											value: data.numero_EDA,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>
								{data.numeroEDA ? data.numeroEDA : "-"}
							</p>
						</div>
					</div>
					<div className='grid grid-cols-4'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Rue</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Rue",
											key: "rue",
											value: data.adresse.rue,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF pb-2'>
								{data.adresse ? data.adresse.rue : ""}
							</p>
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
											value: data.adresse.ville,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF pb-2'>
								{data.adresse ? data.adresse.ville : ""}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>Liens publics</p>
					<div className='grid grid-cols-4'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Site web</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Site web",
											key: "site_web",
											value: data.site_web,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF pb-2'>
								{data.site_web ? data.site_web : "-"}
							</p>
						</div>

						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Facebook</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Facebook",
											key: "facebook",
											value: data.facebook,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>
								{data.facebook ? data.facebook : "-"}
							</p>
						</div>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Linkedin</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Linkedin",
											key: "linkedin",
											value: data.linkedin,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>
								{data.linkedin ? data.linkedin : "-"}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>Contacts</p>
					{data.contacts
						? data.contacts.map((item, index) => (
							<div className='grid grid-cols-4'>
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
													value: data.contacts[index].nom,
													contact: data.contacts[index]._id,
												});
												setShowForm(true);
											}}
										/>
									</div>
									<p className='text-sm text-bleuF pb-2'>
										{item.nom ? item.nom : "-"}
									</p>
								</div>

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
													value: data.contacts[index].email,
													contact: data.contacts[index]._id,
												});
												setShowForm(true);
											}}
										/>
									</div>
									<p className='text-sm text-bleuF'>
										{item.email ? item.email : "-"}
									</p>
								</div>
								<div className='flex flex-col space-y-1'>
									<div className='flex items-center space-x-2'>
										<p className='text-bleuF font-bold'>Téléphone</p>
										<RiEdit2Fill 
											size={10}
											color={"#FF584D"}
											className='cursor-pointer'
											onClick={() => {
												setFormData({
													label: "Téléphone",
													key: "numero",
													value: data.contacts[index].numero,
													contact: data.contacts[index]._id,
												});
												setShowForm(true);
											}}
										/>
									</div>
									<p className='text-sm text-bleuF'>
										{item.numero ? item.numero : "-"}
									</p>
								</div>
							</div>
						))
						: ""}
				</div>
			</div>
			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>Candidatures</p>
					<div className='grid grid-cols-2'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Candidatures spontanées</p>
								<Switch
									onChange={handleChange}
									checked={data.spontanee}
									height={20}
									width={40}
									onColor='#5cb85c'
									offColor='#d9534f'
								/>
							</div>
						</div>
					</div>
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

			{showAbonnements && (
				<div
					className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center z-50 justify-center'>
					<Abonnements
						selected={data.abonnement ? data.abonnement.abonnement : null}
						onClose={() => setShowAbonnements(false)}
					/>
				</div>
			)}

			{loading && <Spinner/>}
		</div>
	);
}
