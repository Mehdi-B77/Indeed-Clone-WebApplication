import React, { useState, useRef, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { FaPlus } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import { BsInfoCircleFill } from "react-icons/bs";

export function NouvelleCandidatureSpontanee({
	employeur,
	onConfirm,
	onDismiss,
}) {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleStartDateChange = (e) => {
		const selectedDate = e.target.value;
		setStartDate(selectedDate);
		if (new Date(selectedDate) > new Date(endDate)) {
			setEndDate(selectedDate);
		}
	};

	const handleEndDateChange = (e) => {
		const selectedDate = e.target.value;
		if (new Date(selectedDate) >= new Date(startDate)) {
			setEndDate(selectedDate);
		}
	};

	const [selectedEmployeur, setSelectedEmployeur] = useState("");
	const [employeurs, setEmployeurs] = useState([]);
	const [selectedEmployeurs, setSelectedEmployeurs] = useState(
		employeur ? [employeur] : []
	);

	const addEmployeur = (selectedIndex) => {
		if (selectedIndex !== "") {
			const selectedEmployeur = employeurs[selectedIndex];
			const alreadySelected = selectedEmployeurs.find(
				(employeur) => employeur._id === selectedEmployeur._id
			);

			if (!alreadySelected) {
				const updatedSelectedEmployeurs = [...selectedEmployeurs];
				updatedSelectedEmployeurs.push(selectedEmployeur);
				setSelectedEmployeurs(updatedSelectedEmployeurs);
			}
		}
	};

	const deleteEmployeur = (index) => {
		const updatedSelectedEmployeurs = [...selectedEmployeurs];
		updatedSelectedEmployeurs.splice(index, 1);
		setSelectedEmployeurs(updatedSelectedEmployeurs);
	};

	async function getEmployeurs() {
		try {
			const response = await axiosInstance.get("/users/employeurs");

			console.log(response);

			if (response.status === 200) {
				setEmployeurs(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const [selectedMetier, setSelectedMetier] = useState("");
	const [metiers, setMetiers] = useState([]);
	const [selectedMetiers, setSelectedMetiers] = useState([]);

	const addMetier = (selectedIndex) => {
		if (selectedIndex !== "") {
			const selectedMetier = metiers[selectedIndex];
			const alreadySelected = selectedMetiers.find(
				(metier) => metier._id === selectedMetier._id
			);

			if (!alreadySelected) {
				const updatedSelectedMetiers = [...selectedMetiers];
				updatedSelectedMetiers.push(selectedMetier);
				setSelectedMetiers(updatedSelectedMetiers);
			}
		}
	};

	const deleteMetier = (index) => {
		const updatedSelectedMetiers = [...selectedMetiers];
		updatedSelectedMetiers.splice(index, 1);
		setSelectedMetiers(updatedSelectedMetiers);
	};

	async function getMetiers() {
		try {
			const response = await axiosInstance.get("/offres/metiers");

			console.log(response);

			if (response.status === 200) {
				setMetiers(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getMetiers();
		getEmployeurs();
	}, []);

	const redirectToProfile = () => {
		window.location.href = "/chercheur/profile";
	};

	const handleSubmit = async () => {
		const employeurs = selectedEmployeurs.map((employeur) => employeur._id);
		const metiers = selectedMetiers.map((metier) => metier._id);
		const date_debut = startDate;
		const date_fin = endDate;

		if (employeurs.length > 0 && metiers.length > 0) {
			onConfirm({ date_debut, date_fin, employeurs, metiers });
			onDismiss();
		}
	};
	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='w-3/4 h-fit bg-white p-4 rounded-md space-y-4'>
				<h1 className='text-xl text-bleuF font-bold'>
					Nouvelle Candidature Spontanée{" "}
					{employeur ? 'chez "' + employeur.entreprise + '"' : ""}
				</h1>
				<p className='mb-10'>
					Vous avez la possibilité de sélectionner plusieurs employeurs et
					plusieurs métiers.
				</p>
				<div className='grid grid-cols-3 gap-10 mt-8'>
					<div className='flex flex-col'>
						<div className='flex w-full justify-between space-x-2'>
							<div className='flex flex-col flex-grow'>
								<select
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									onChange={(e) => setSelectedMetier(e.target.value)}
								>
									<option value=''>Sélectionnez un métier</option>
									{metiers.map((item, index) => (
										<option key={item._id} value={index}>
											{item.nom}
										</option>
									))}
								</select>
							</div>
							<ButtonCarre
								couleur='bleuF'
								couleurTexte={"violet"}
								contenu={<FaPlus />}
								width={"fit text-sm"}
								height={"fit"}
								onclick={() => {
									addMetier(selectedMetier);
									console.log(selectedMetiers);
								}}
							></ButtonCarre>
						</div>
						<div>
							<table>
								<thead>
									<tr>
										<th>Liste des métiers</th>
									</tr>
								</thead>
								<tbody>
									{selectedMetiers.map((item, index) => (
										<tr key={index} className='justify-between'>
											<td>{item.nom}</td>
											<td>
												<p
													className='hover:underline text-rouge text-xs cursor-pointer'
													onClick={() => deleteMetier(index)}
												>
													Supp
												</p>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='flex flex-col'>
						<div className='flex w-full justify-between space-x-2'>
							<div className='flex flex-col flex-grow'>
								<select
									className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
									onChange={(e) => setSelectedEmployeur(e.target.value)}
								>
									<option value=''>Sélectionnez un employeur</option>
									{employeurs.map((item, index) => (
										<option key={item._id} value={index}>
											{item.entreprise}
										</option>
									))}
								</select>
							</div>
							<ButtonCarre
								couleur='bleuF'
								couleurTexte={"violet"}
								contenu={<FaPlus />}
								width={"fit text-sm"}
								height={"fit"}
								onclick={() => {
									addEmployeur(selectedEmployeur);
									console.log(selectedEmployeurs);
								}}
							></ButtonCarre>
						</div>
						<div>
							<table>
								<thead>
									<tr>
										<th>Liste des employeurs</th>
									</tr>
								</thead>
								<tbody>
									{selectedEmployeurs.map((item, index) => (
										<tr key={index}>
											<td>{item.entreprise}</td>
											<td>
												<p
													className='hover:underline text-rouge text-xs cursor-pointer'
													onClick={() => deleteEmployeur(index)}
												>
													Supp
												</p>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='flex-col gap-8 mx-4 mb-10'>
						<div className='flex flex-col'>
							<label className='text-bleuF text-xs font-bold'>Début</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='date'
								value={startDate}
								onChange={handleStartDateChange}
							></input>
						</div>
						<div className='flex flex-col'>
							<label className='text-bleuF text-xs font-bold'>Fin</label>
							<input
								className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								type='date'
								value={endDate}
								onChange={handleEndDateChange}
							></input>
						</div>
					</div>
				</div>

				<div className='flex justify-between mt-10'>
					<div className='flex space-x-2'>
						<BsInfoCircleFill color={"FF584D"} />
						<p className='text-rouge text-xs font-bold'>
							Les candidatures spontanées se font avec votre profil. <br></br>
							Pour modifier,{" "}
							<span
								className='hover:underline cursor-pointer'
								onClick={redirectToProfile}
							>
								cliquez ici
							</span>
						</p>
					</div>
					<div className='flex space-x-2'>
						<ButtonCarre
							couleur='bleuF'
							couleurTexte={"violet"}
							contenu={"Annuler"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={() => onDismiss()}
						></ButtonCarre>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Envoyer"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={() => handleSubmit()}
						></ButtonCarre>
					</div>
				</div>
			</div>
		</div>
	);
}
