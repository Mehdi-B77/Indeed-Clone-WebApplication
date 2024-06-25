import React, { useState, useEffect } from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	TableauAbonnements,
	ButtonCarre,
	AbonnementForm,
	Spinner,
} from "../../components";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../util/axios";

export function AbonnementsGestionnaire() {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);
	const [showForm, setShowForm] = useState(false);

	async function getAbonnements() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/abonnements");

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				if (response.data.length === 0) {
					setVide(true);
				}
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setVide(true);
		}
	}

	async function addAbonnement(nom, duree, prix, avantages, conditions) {
		try {
			setLoading(true);
			const response = await axiosInstance.post("/abonnements/add", {
				nom,
				duree,
				prix,
				avantages,
				conditions,
			});

			if (response.request.status === 201) {
				setLoading(false);
				getAbonnements();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function updateAbonnement(id, nom, duree, prix, avantages, conditions) {
		try {
			setLoading(true);
			const response = await axiosInstance.put("/abonnements/" + id, {
				nom,
				duree,
				prix,
				avantages,
				conditions,
			});

			if (response.request.status === 200) {
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function deleteAbonnement(id) {
		try {
			setLoading(true);
			const response = await axiosInstance.delete("/abonnements/" + id);

			if (response.request.status === 200) {
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const handleModify = async (id, nom, duree, prix, avantages, conditions) => {
		await updateAbonnement(id, nom, duree, prix, avantages, conditions);
		getAbonnements();
	};

	const handleDelete = async (id) => {
		await deleteAbonnement(id);
		getAbonnements();
	};

	useEffect(() => {
		getAbonnements();
	}, []);

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={4}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Abonnements</p>
					<div className='flex space-x-4'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Rechercher'
								className='h-9 px-4 border rounded-md outline-none focus:border-blue-500'
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							<button className='absolute right-3 top-1/2 transform -translate-y-1/2'>
								<FaSearch color='#465475' />
							</button>
						</div>

						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={"Nouvel abonnement"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => {
								setShowForm(true);
							}}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<TableauAbonnements
						data={data}
						vide={vide}
						onModify={handleModify}
						onDelete={handleDelete}
					></TableauAbonnements>
				</div>
			</div>

			{showForm && (
				<AbonnementForm
					titre={"Ajouter un abonnement"}
					onConfirm={(nom, duree, prix, avantages, conditions) => {
						addAbonnement(nom, duree, prix, avantages, conditions);
					}}
					onDismiss={() => setShowForm(false)}
				/>
			)}
			{loading && <Spinner />}
		</div>
	);
}
