import React, { useState } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { RiEdit2Fill  } from "react-icons/ri";
import { OneForm } from "./OneForm";
import { PasswordForm } from "./PasswordForm";


export function ProfileEta({ data, onUpdate }) {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({ email: "" });
	const [showForm, setShowForm] = useState(false);
	const [showPasswordForm, setShowPasswordForm] = useState(false);

	return (
		<div className='w-1/3 mx-auto'>
			<div className='grid grid-cols-2 m-6 gap-4'>
				<div className='m-6  bg-white rounded-lg p-4 border border-bleuF shadow-md'>
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
			</div>
			<div className='m-6 bg-white rounded-lg p-4 border border-bleuF shadow-md'>
				<div className='col-span-3 space-y-6'>
					<p className='text-rouge font-bold text-lg'>
						Informations personnelles
					</p>
					<div className='grid grid-cols-4'>
						<div className='flex flex-col space-y-1'>
							<div className='flex items-center space-x-2'>
								<p className='text-bleuF font-bold'>Nom de l'etablissement</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Nom de l'etablissement",
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
								<p className='text-bleuF font-bold'>Type d'etablissement</p>
								<RiEdit2Fill 
									size={10}
									color={"#FF584D"}
									className='cursor-pointer'
									onClick={() => {
										setFormData({
											label: "Type",
											key: "type",
											value: data.type,
										});
										setShowForm(true);
									}}
								/>
							</div>
							<p className='text-sm text-bleuF'>
								{data.type? data.type : "-"}
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
			{loading && <Spinner />}
		</div>
	);
}
