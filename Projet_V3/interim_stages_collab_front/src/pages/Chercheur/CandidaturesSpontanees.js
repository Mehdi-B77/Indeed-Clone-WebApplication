import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	TableauCandidaturesSpontanees,
	NouvelleCandidatureSpontanee,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";
import { FaPlus } from "react-icons/fa";
import { ButtonCarre } from "../../components";

export function CandidaturesSpontanees() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showNouvelleCandidature, setShowNouvelleCandidature] = useState(false);

	async function getCandidaturesSpontanees() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				"/candidatures/chercheur/spontanees",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 200) {
				setData(response.data);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function addCandidatureSpontanee(data) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/candidatures/chercheur/spontanees/add",
				data,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 201) {
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	useEffect(() => {
		getCandidaturesSpontanees();
	}, []);

	const handleClick = (id) => {
		window.location.href = `/chercheur/candidaturesSpontanees/${id}`;
	};

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur selected={3}></NavBarChercheur>
			<div className='mx-6 mt-2 bg-white rounded-lg p-4 border shadow'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-rouge'>
						Candidatures Spontanées
					</p>
					<div className='flex space-x-4'>
						<ButtonCarre
							couleur='rouge'
							couleurTexte={"violet"}
							contenu={<FaPlus />}
							width={"fit text-sm"}
							height={"fit"}
							onclick={() => setShowNouvelleCandidature(true)}
						></ButtonCarre>
					</div>
				</div>
				<div>
					<TableauCandidaturesSpontanees
						data={data}
						onRowClick={handleClick}
					></TableauCandidaturesSpontanees>
				</div>
			</div>

			{showNouvelleCandidature && (
				<NouvelleCandidatureSpontanee
					onConfirm={addCandidatureSpontanee}
					onDismiss={() => setShowNouvelleCandidature(false)}
				/>
			)}

			{loading && <Spinner />}
		</div>
	);
}
