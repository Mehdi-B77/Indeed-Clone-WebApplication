import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	CandidatureSpontanee,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";
import { FaPlus } from "react-icons/fa";
import { ButtonCarre } from "../../components";

export function CandidatureSpontaneeChercheur() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	async function getCandidatureSpontanee() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				"/candidatures/chercheur/spontanees/" + id,
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

	useEffect(() => {
		getCandidatureSpontanee();
	}, []);

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<NavBarChercheur selected={3}></NavBarChercheur>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex justify-between'>
					<p className='text-xl font-bold text-rouge mb-4'>
						Candidature Spontanée
					</p>
				</div>
				<CandidatureSpontanee candidature={data} />
			</div>

			{loading && <Spinner />}
		</div>
	);
}
