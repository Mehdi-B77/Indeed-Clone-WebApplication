import React, { useState, useEffect } from "react";
import {
	FaEllipsisV,
	FaDollarSign,
	FaStar,
	FaBookmark,
	FaHeart, FaTimesCircle, FaClock,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import { ButtonCarre } from "./ButtonCarre";
import esi from "../assets/logo_esi.png";
import { Modal } from "./Modal";
import {
	fDate,
	fToNow,
	getCurrentDateTime,
	calculateDuration,
} from "../util/formatTime";
import { axiosInstance } from "../util/axios";
import { PartagerOffre } from "./PartagerOffre";
import { ShareButtons } from "./ShareButtons";
import {FaTimeline} from "react-icons/fa6";

export function Cadre({ Offre, focusCadre }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [showMessage, setShowMessage] = useState(false);
	const [showPartageTab, setShowPartageTab] = useState(false);
	const [message, setMessage] = useState("");
	const [isFavorite, setIsFavorite] = useState(
		user ? (user.favoris ? user.favoris.includes(Offre._id) : false) : false
	);
	const [isSaved, setIsSaved] = useState(
		user
			? user.enregistrements
				? user.enregistrements.includes(Offre._id)
				: false
			: false
	);

	useEffect(() => {
		const updatedUser = {
			...user,
			enregistrements: user ? user.enregistrements : [],
			favoris: user ? user.favoris : [],
		};
		localStorage.setItem("user", JSON.stringify(updatedUser));
	}, [isSaved, isFavorite]);

	async function toggleFavorite(event) {
		event.stopPropagation(); // Prevent click event from bubbling up
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/offres/chercheur/like",
				{ id: Offre._id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);

			if (response.status === 200) {
				setMessage(response.data.message);
				setUser({ ...user, favoris: response.data.favoris });
				setIsFavorite(!isFavorite);
				setShowMessage(true);
				setTimeout(() => {
					setShowMessage(false);
				}, 1000);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function toggleSaved(event) {
		event.stopPropagation(); // Prevent click event from bubbling up
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/offres/chercheur/save",
				{ id: Offre._id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);

			if (response.status === 200) {
				setMessage(response.data.message);
				setUser({ ...user, enregistrements: response.data.enregistrements });
				setIsSaved(!isSaved);
				setShowMessage(true);
				setTimeout(() => {
					setShowMessage(false);
				}, 1000);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function partagerOffreDansGroupe(id_groupe, offre) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/partagerOffreDansGroupe",
				{ id_groupe, offre },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);

			if (response.status === 200) {
				setMessage(response.data.message);
				setShowMessage(true);
				setTimeout(() => {
					setShowMessage(false);
				}, 1000);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function partagerOffreAvecAmi(id_ami, offre) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/partagerAmi",
				{ id_ami, offre },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);

			if (response.status === 200) {
				setMessage(response.data.message);
				setShowMessage(true);
				setTimeout(() => {
					setShowMessage(false);
				}, 1000);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const redirect = () => {
		window.location.href = "/offres/" + Offre._id+"/postuler";
	};

	const [urlOffres, setUrlOffres] = useState("");
	async function getUrlOffres() {
		try {
			const response = await axiosInstance.get("/services/offres");
			if (response.status === 200) {
				console.log(response.data);
				setUrlOffres(response.data);
			} else {
				setUrlOffres("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	const [urlAuth, setUrlAuth] = useState("");
	async function getUrlAuth() {
		try {
			const response = await axiosInstance.get("/services/auth");
			if (response.status === 200) {
				console.log(response.data);
				setUrlAuth(response.data);
			} else {
				setUrlAuth("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUrlOffres();
		getUrlAuth();
	}, []);

	return (
		<div className='bg-white rounded-md border-2 border-gray-300 shadow-md hover:border-bleuF hover:shadow-xl'>
			<div className='flex px-4 py-2  rounded-lg'>
				<img
					className='rounded-full w-12 h-12'
					src={urlAuth + Offre.employeur.image}
					alt='logo'
				/>

				<div className='ml-auto my-auto flex'>
					<div className='cursor-pointer mr-4' onClick={toggleFavorite}>
						<FaHeart color={isFavorite ? "#FF584D" : "gray"} size={20}/>
					</div>
					<div className='cursor-pointer' onClick={toggleSaved}>
						<FaBookmark color={isSaved ? "#465475" : "gray"} size={20}/>
					</div>
				</div>
			</div>
			<div className='w-full px-4'>
				<p className='text-bleuF capitalize font-bold text-xl'>{Offre.titre}</p>
				<a className='text-bleuF capitalize cursor-pointer'
				   onClick={() => window.open(Offre.employeur.site_web, "_blank")}>
					{Offre.employeur.entreprise}
				</a>
				<p className='text-bleuF'>{Offre.lieu ? Offre.lieu : "Montpellier"} - {fDate(Offre.date)}</p>
				<div className='flex items-center'>
					<FaDollarSign color='#465475'/>
					<p className='text-bleuF'>{Offre.remuneration}</p>
				</div>
				<div className='flex items-center'>
					<FaClock color='#465475'/>
					<p className='text-bleuF ml-1'>
						{calculateDuration(Offre.debut, Offre.fin)} restants...
					</p>
				</div>
			</div>
			<div>
				<p className='mx-4 my-4 text-sm text-bleuF max-h-20 overflow-hidden truncate'>
					{Offre.description}
				</p>
			</div>
			<div className='flex justify-between m-4 h-10'>
				<ShareButtons url={""} title='' description={""}/>
				<ButtonCarre
					couleur={"rouge"}
					couleurTexte={"violet"}
					contenu={"Candidater"}
					width={"fit"}
					height={"h-8"}
					onclick={redirect}
				></ButtonCarre>
			</div>
			{showPartageTab && (
				<PartagerOffre
					offre={Offre}
					onGroupeShare={partagerOffreDansGroupe}
					onFriendShare={partagerOffreAvecAmi}
					onDismiss={() => setShowPartageTab(false)}
				/>
			)}
		</div>

	);
}
