import React, { useState, useEffect } from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	TableauMetiers,
	ButtonCarre,
	MetierForm,
	Spinner,
} from "../../components";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../util/axios";

export function MetiersGestionnaire() {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(false);
	let [vide, setVide] = useState(false);
	const [showForm, setShowForm] = useState(false);

	async function getMetiers() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/offres/metiers");

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

	async function updateMetier(id, nom, secteur, description) {
		try {
			setLoading(true);
			const response = await axiosInstance.put("/offres/metiers/" + id, {
				nom,
				secteur,
				description,
			});

			if (response.request.status === 200) {
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function deleteMetier(id) {
		try {
			setLoading(true);
			const response = await axiosInstance.delete("/offres/metiers/" + id);

			if (response.request.status === 200) {
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const handleModify = async (id, nom, secteur, description) => {
		await updateMetier(id, nom, secteur, description);
		getMetiers();
	};

	const handleDelete = async (id) => {
		await deleteMetier(id);
		getMetiers();
	};

	useEffect(() => {
		getMetiers();
	}, []);

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={3}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-bleuF'>Métiers</p>
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
							contenu={"Nouveau métier"}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => {
								setShowForm(true);
							}}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<TableauMetiers
						data={data}
						vide={vide}
						onModify={handleModify}
						onDelete={handleDelete}
					></TableauMetiers>
				</div>
			</div>

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
	);
}
