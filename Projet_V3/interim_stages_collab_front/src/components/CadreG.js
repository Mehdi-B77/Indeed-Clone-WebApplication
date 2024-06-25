import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import { ButtonCarre } from "./ButtonCarre";
import { Modal } from "./Modal";
import esi from "../assets/logo_esi.png";
import { axiosInstance } from "../util/axios";
import { Connexion } from "./Connexion";

export function CadreG({ id }) {
	const [show, setShow] = useState(false);
	// let offre = {
	// 	employeur: "KPMG",
	// 	"Date de publication": "12 Décembre, 20:20",
	// 	titre: "Jardinier",
	// 	Localisation: "Montpellier",
	// 	Salaire: "10$/heure",
	// 	Duree: "2 semaines",
	// 	Description:
	// 		"Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.Votre mission sera de planter quelques plantes dans les espaces verts de l’entreprise, afin de rendre le paysage plus radieux.",
	// };
	const [offre, setOffre] = useState({});

	async function getOffre() {
		try {
			const response = await axiosInstance.get(`/offres/${id}`);
			if (response.status === 200) {
				setOffre(response.data);
				console.log(offre);
			} else {
				console.log(response);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getOffre();
	}, [id]);

	const redirect = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user.username) {
			window.location.href = `/offres/${id}/postuler`;
		} else {
			setShow(true);
		}
	};

	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/offres");
			if (response.status === 200) {
				console.log(response.data);
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUrl();
	}, []);

	return (
		<div className='w-full bg-violet rounded-lg'>
			<div className='flex px-10 py-2'>
				<div>
					<p className='text-bleuF font-bold text-xl'>{offre.titre}</p>
					<div className='flex'>
						<p className='text-bleuF'>
							{offre.employeur ? offre.employeur.entreprise : ""}
						</p>
						<p className='text-bleuF ml-4'>{offre.date}</p>
						<p className='text-bleuF ml-4'>{offre.Localisation}</p>
						<p className='text-bleuF ml-4'>
							{offre.candidatures ? offre.candidatures.length : ""} candidats
						</p>
					</div>
				</div>
				<div className='ml-auto my-auto'>
					<Modal />
				</div>
			</div>
			<div>
				<img
					className=' bg-white w-full h-48'
					src={offre.image ? url + offre.image : esi}
				></img>
			</div>

			<div className='px-10 py-2'>
				<p className='text-bleuF font-bold text-lg'>A propos de l'offre</p>
				<div className='mt-2'>
					<p className='text-bleuF font-bold'>Durée du stage</p>
					<p className='text-sm text-bleuF'>Du {offre.debut} au {offre.fin} </p>
					<p className='text-bleuF font-bold'>Description</p>
					<p className='text-sm text-bleuF'>{offre.description} </p>
				</div>
			</div>

			<div></div>
			<div className='flex justify-end m-4'>
				<ButtonCarre
					couleur={"rouge"}
					couleurTexte={"violet"}
					contenu={"Candidater"}
					width={"fit"}
					height={"fit"}
					onclick={redirect}
				></ButtonCarre>
			</div>

			{show && (
				<div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center z-50 justify-center'>
					<Connexion onClose={() => setShow(false)} />
				</div>
			)}
		</div>
	);
}
