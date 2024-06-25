import React, { useState, useEffect } from "react";
import {
	HeaderChercheur,
	NavBarChercheur,
	CandidatureC,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function CandidatureChercheur() {
	const [data, setData] = useState({});
	const [reponses, setReponses] = useState([]);
	const [loading, setLoading] = useState(false);

	let { id } = useParams();

	async function getDetails() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				"/candidatures/chercheur/" + id,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				setLoading(false);
				console.log(data);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getReponses() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get(
				`/candidatures/chercheur/${id}/reponses`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);

			if (response.request.status === 200) {
				setReponses(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function deleteCandidature(id) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/candidatures/chercheur/delete",
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.request.status === 200) {
				setLoading(false);
				window.location.href = "/chercheur/candidatures";
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function updateCandidature(id, cv, motivation, commentaire) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.put(
				"/candidatures/chercheur/" + id,
				{
					cv,
					motivation,
					commentaire,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				setLoading(false);
				getDetails();
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function contact(id, titre, contenu) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/chercheur/${id}/contact`,
				{
					titre,
					contenu,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getReponses();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function validate(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/chercheur/validate`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getDetails();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function refuse(id) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/chercheur/refuse`,
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getDetails();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function declareProblem(candidature, titre, contenu) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				`/candidatures/chercheur/declareProblem`,
				{
					candidature,
					titre,
					contenu,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				console.log(response.data);
				getReponses();
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getDetails();
		console.log(data);
		getReponses();
	}, []);

	const couleur = (emetteur) => {
		switch (emetteur) {
			case "chercheur":
				return "bleu";
			case "employeur":
				return "violet";
			default:
				return "";
		}
	};

	const position = (emetteur) => {
		switch (emetteur) {
			case "chercheur":
				return "justify-end";
			case "employeur":
				return "justify-start";
			default:
				return "";
		}
	};

	return (
		<div className="min-h-screen pb-10">
			<header>
				<HeaderChercheur></HeaderChercheur>
			</header>
			<div className="w-full container bg-white rounded-lg p-4">
				<div className="flex justify-between">
					<h2 className="text-xl font-bold text-bleuF">
						Candidatures &gt; {data.offre ? data.offre.titre : ""} ({data.status})
					</h2>
				</div>
				<div className=" mt-4 ml-auto mr-auto flex justify-center">
					<CandidatureC
						candidature={data}
						onDelete={deleteCandidature}
						onContact={contact}
						onUpdate={updateCandidature}
						onAccept={validate}
						onRefuse={refuse}
						onDeclareProblem={declareProblem}
					/>
					<div className=" mt-4 ml-auto mr-auto flex justify-center"> </div>
					<div className=" mt-4 ml-auto mr-auto flex justify-center"> </div>

					<div className=" mt-4 ml-auto mr-auto flex justify-center"> </div>

				</div>
				<div className="space-y-2 mt-2">
				<div className=" mt-4 ml-auto mr-auto flex justify-center"> </div>
				<div className=" mt-4 ml-auto mr-auto flex justify-center"> </div>
				<div className=" mt-4 ml-auto mr-auto flex justify-center"> </div>
				<div className=" mt-4 ml-auto mr-auto flex justify-center"> </div>
				<div className=" mt-4 ml-auto mr-auto flex justify-center"> </div>

					<h3 className="text-bleuF font-bold text-xl">Conversation</h3>
					{reponses.map((item, index) => (
						<div className="flex {position(item.type_emetteur)}">
							<div key={index}
								 className="message-container flex flex-col w-1/2 space-y-1 border border-bleuF rounded-lg p-2 bg-{couleur(item.type_emetteur)}">
								<div className="flex justify-between">
									<p className="text-bleuF font-semibold">{item.titre}</p>
									<p className="text-bleuF">{item.createdAt.split("T")[0]} | {item.createdAt.split("T")[1].split(".")[0]}</p>
								</div>
								<p className="text-sm text-bleuF">{item.contenu}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			{loading && <Spinner/>}
		</div>


	);
}
