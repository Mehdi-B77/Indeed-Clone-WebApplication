import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	Agenda,
	Spinner,
} from "../../components";
import { axiosInstance } from "../../util/axios";
import moment from "moment";

export function AgendaChercheur() {
	let [data, setData] = useState([]);
	let [alertes, setAlertes] = useState([]);
	let [loading, setLoading] = useState(false);

	async function getEmplois() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/emplois/chercheur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				const agendaData = response.data.filter((item) => item.agenda === true);
				setData(agendaData);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getAlertes() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/users/profile", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				setAlertes(response.data.alertes);
				setLoading(false);
				console.log(data);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	const myEventsList = [
		...data.map((item) => ({
			id: item._id,
			title: item.offre.titre,
			start: new Date(item.offre.debut),
			end: new Date(item.offre.fin),
		})),
		...alertes.map((alerte) => ({
			id: alerte._id,
			title: alerte.titre,
			start: moment(alerte.date, "YYYY-MM-DD [à] HH:mm").toDate(),
			end: moment(alerte.date, "YYYY-MM-DD [à] HH:mm").toDate(),
		})),
	];

	useEffect(() => {
		getEmplois();
		getAlertes();
	}, []);

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<div className='mx-6 mt-2 bg-white rounded-lg p-4 border shadow'>
				<div className=''>
					<div className='w-full'>
						<Agenda data={myEventsList} />
					</div>
				</div>
			</div>

			{loading && <Spinner />}
		</div>
	);
}
