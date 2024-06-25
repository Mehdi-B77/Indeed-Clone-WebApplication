import React, { useState, useEffect } from "react";
import {
	HeaderGestionnaire,
	NavBarGestionnaire,
	CadreInscription,
	Spinner,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function InscriptionGestionnaire() {
	const [data, setData] = useState({
		adresse: {
			rue: "",
			ville: "",
		},
		_id: "",
		email: "",
		password: "",
		entreprise: "",
		service: "",
		sous_service: "",
		numero_EDA: "",
		site_web: "",
		linkedin: "",
		facebook: "",
		valide: "",
		contacts: [
			{
				nom: "",
				email: "",
				numero: "",
			},
		],
	});
	const [reponses, setReponses] = useState([]);

	const [loading, setLoading] = useState(false);

	let { id } = useParams();

	async function getInscription() {
		try {
			setLoading(true);
			const response = await axiosInstance.get("/auth/inscriptions/" + id);

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

	async function getReponses() {
		try {
			const response = await axiosInstance.post("/auth/inscriptions/reponses", {
				id,
			});
			console.log(response);

			if (response.status === 200) {
				setReponses(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleClick = () => {
		window.location.href = `/gestionnaire/inscriptions`;
	};

	async function validateInscription(id) {
		try {
			const response = await axiosInstance.post(`/auth/inscription/validate`, {
				id,
			});

			if (response.request.status === 201) {
				console.log(response.data);
				getInscription();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function refuseInscription(id) {
		try {
			const response = await axiosInstance.post(`/auth/inscription/refuse`, {
				id,
			});

			if (response.request.status === 201) {
				console.log(response.data);
				getInscription();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function contact(id, titre, contenu) {
		try {
			const type_emetteur = "gestionnaire";
			const emetteur = id;
			const type_destinataire = "employeur";
			const destinataire = id;
			const response = await axiosInstance.post(`/auth/inscriptions/contact`, {
				type_emetteur,
				emetteur,
				type_destinataire,
				destinataire,
				titre,
				contenu,
			});

			if (response.request.status === 201) {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleContact = async (id, titre, contenu) => {
		try {
			await contact(id, titre, contenu);
			await getReponses();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getInscription();
		console.log(data);
		getReponses();
	}, []);

	const couleur = (emetteur) => {
		switch (emetteur) {
			case "gestionnaire":
				return "bleu";
			case "employeur":
				return "violet";
			default:
				return "";
		}
	};

	const position = (emetteur) => {
		switch (emetteur) {
			case "gestionnaire":
				return "justify-end";
			case "employeur":
				return "justify-start";
			default:
				return "";
		}
	};

	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire selected={0}></NavBarGestionnaire>
			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex'>
					<p
						className='text-xl font-bold text-bleuF cursor-pointer'
						onClick={handleClick}
					>
						Inscriptions
					</p>
					<span className='ml-2'></span>
					<p className='text-xl font-bold text-bleuF'>
						{">"} {data.entreprise}
					</p>
				</div>
				<div className='mt-4'>
					<CadreInscription
						data={data}
						onAccept={validateInscription}
						onRefuse={refuseInscription}
						onContact={handleContact}
					></CadreInscription>
					<div className='space-y-2 mt-2'>
						<p className='text-bleuF font-bold text-xl'>Conversation</p>
						{reponses.map((item, index) => (
							<div className={`flex ${position(item.type_emetteur)}`}>
								<div
									key={index}
									className={`flex flex-col w-1/2 space-y-1 border border-bleuF rounded-lg p-2 bg-${couleur(
										item.type_emetteur
									)}`}
								>
									<div className='flex justify-between'>
										<p className='text-bleuF font-semibold'>{item.titre}</p>
										<p className='text-bleuF'>
											{item.createdAt.split("T")[0]} |{" "}
											{item.createdAt.split("T")[1].split(".")[0]}
										</p>
									</div>
									<p className='text-sm text-bleuF'>{item.contenu}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			{loading && <Spinner />}
		</div>
	);
}
