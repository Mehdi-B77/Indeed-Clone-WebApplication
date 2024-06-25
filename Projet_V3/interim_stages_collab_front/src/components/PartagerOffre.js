import React, { useState, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { FaShareSquare, FaUserPlus, FaTimesCircle } from "react-icons/fa";
import { axiosInstance } from "../util/axios";
import { CadrePartage } from "./CadrePartage";

export function PartagerOffre({
	offre,
	onGroupeShare,
	onFriendShare,
	onDismiss,
}) {
	const [loading, setLoading] = useState(false);

	const [showGroupe, setShowGroupe] = useState(false);
	const [groupes, setGroupes] = useState([]);
	const [selectedGroupe, setSelectedGroupe] = useState({});

	const [showAmi, setShowAmi] = useState(false);
	const [amis, setAmis] = useState([]);
	const [selectedAmi, setSelectedAmi] = useState({});

	const [url, setUrl] = useState("");

	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/auth");
			if (response.status === 200) {
				setUrl(response.data);
			} else {
				setUrl("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function getGroupes() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/users/chercheur/groupes", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setGroupes(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function getAmis() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/users/chercheur/amis", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				setAmis(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getGroupes();
		getAmis();
		getUrl();
	}, []);

	const handleGroupeConfirm = async () => {
		try {
			setLoading(true);

			await onGroupeShare(selectedGroupe._id, offre._id);
			onDismiss();
		} catch (error) {
			console.error("Confirmation error:", error);
			setLoading(false);
		}
	};

	const handleFriendConfirm = async () => {
		try {
			setLoading(true);

			await onFriendShare(selectedAmi.ami._id, offre._id);
			onDismiss();
		} catch (error) {
			console.error("Confirmation error:", error);
			setLoading(false);
		}
	};

	return (
		<div className='fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			{!loading && (
				<div className=' w-1/3 h-fit bg-white p-4 rounded-md space-y-8'>
					<div className='space-y-4'>
						<FaTimesCircle
							size={20}
							className='text-gray-600 hover:text-gray-900 cursor-pointer'
							onClick={onDismiss}
						/>
						<div className='flex items-center justify-center space-x-2'>
							<p className='text-lg font-bold text-bleuF text-center'>
								Partager une offre
							</p>

							<FaShareSquare size={30} className='text-bleuF' />


						</div>

						<div>
							<CadrePartage Offre={offre} />
						</div>

						{!showAmi && !showGroupe && (
							<div className='flex flex-col justify-end space-y-2'>
								<ButtonCarre
									couleur={"bleuF"}
									couleurTexte={"violet"}
									contenu={"Partager avec un ami"}
									width={"w-full text-xs"}
									height={"fit"}
									onclick={() => setShowAmi(true)}
								></ButtonCarre>
								<ButtonCarre
									couleur={"rouge"}
									couleurTexte={"violet"}
									contenu={"Partager dans un groupe"}
									width={"w-full text-xs"}
									height={"fit"}
									onclick={() => setShowGroupe(true)}
								></ButtonCarre>
							</div>
						)}

						{showAmi && (
							<div className='space-y-2'>
								<p className='text-sm font-bold text-bleuF'>
									Partager avec un ami
								</p>
								<div className='flex flex-col'>
									<select
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										onChange={(e) => {
											if (e.target.value) {
												const selectedAmiId = e.target.value;
												const selectedAmi = amis.find(
													(ami) => ami._id === selectedAmiId
												);
												setSelectedAmi(selectedAmi);
											} else {
												setSelectedAmi({});
											}
										}}
									>
										<option value=''>Sélectionnez une personne</option>
										{amis.map((item, index) => (
											<option key={item._id} value={item._id}>
												{item.ami.nom} {item.ami.prenom}
											</option>
										))}
									</select>
								</div>
								<div className='flex justify-between bg-bleu p-4 rounded-lg'>
									<div className='flex w-full items-center space-x-2'>
										<div className='flex gap-[5px] mt-2'>
											<div className='img-container'>
												{selectedAmi.ami && (
													<img
														src={url + selectedAmi.ami.image}
														className='w-10 h-10 rounded-full'
													/>
												)}
											</div>
										</div>
										<p className='text-sm text-bleuF font-bold'>
											{selectedAmi.ami ? selectedAmi.ami.nom : ""}{" "}
											{selectedAmi.ami ? selectedAmi.ami.prenom : ""}
										</p>
									</div>
								</div>
							</div>
						)}
						{showGroupe && (
							<div className='space-y-2'>
								<p className='text-sm font-bold text-bleuF'>
									Partager dans un groupe
								</p>
								<div className='flex flex-col'>
									<select
										className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
										onChange={(e) => {
											if (e.target.value) {
												const selectedGroupId = e.target.value;
												const selectedGroup = groupes.find(
													(group) => group._id === selectedGroupId
												);
												setSelectedGroupe(selectedGroup);
											} else {
												setSelectedGroupe({});
											}
										}}
									>
										<option value=''>Sélectionnez un groupe</option>
										{groupes.map((item, index) => (
											<option key={item._id} value={item._id}>
												{item.nom}
											</option>
										))}
									</select>
								</div>
								<div className='flex justify-between bg-bleu p-4 rounded-lg'>
									<div>
										<p className='text-sm text-bleuF font-bold'>
											Groupe {selectedGroupe.nom}
										</p>
										<p className='text-sm text-bleuF font-semibold'>
											{selectedGroupe.description}
										</p>
										<div className='flex gap-[5px] mt-2'>
											{selectedGroupe.membres
												? selectedGroupe.membres.map((item, index) => (
													<img
														key={index}
														src={url + item.image}
														alt={item.altText}
														className='w-10 h-10 rounded-full -mr-3'
													/>
												))
												: ""}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					{showAmi && (
						<div className='flex justify-end space-x-2'>
							<ButtonCarre
								couleur={"bleuF"}
								couleurTexte={"violet"}
								contenu={"Annuler"}
								width={"fit text-xs"}
								height={"fit"}
								onclick={onDismiss}
							></ButtonCarre>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"violet"}
								contenu={"Partager"}
								width={"fit text-xs"}
								height={"fit"}
								onclick={handleFriendConfirm}
							></ButtonCarre>
						</div>
					)}
					{showGroupe && (
						<div className='flex justify-end space-x-2'>
							<ButtonCarre
								couleur={"bleuF"}
								couleurTexte={"violet"}
								contenu={"Annuler"}
								width={"fit text-xs"}
								height={"fit"}
								onclick={onDismiss}
							></ButtonCarre>
							<ButtonCarre
								couleur={"rouge"}
								couleurTexte={"violet"}
								contenu={"Partager"}
								width={"fit text-xs"}
								height={"fit"}
								onclick={handleGroupeConfirm}
							></ButtonCarre>
						</div>
					)}
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
