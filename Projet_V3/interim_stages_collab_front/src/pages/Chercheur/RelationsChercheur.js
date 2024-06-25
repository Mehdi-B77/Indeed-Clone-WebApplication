import React, { useState, useEffect } from "react";
import { HeaderChercheur, Spinner, ProfileC } from "../../components";
import { axiosInstance } from "../../util/axios";
import { FaPlus, FaUserPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
	NouveauGroupe,
	CadrePartage,
	AjouterUser,
	NouveauAmi,
} from "../../components";

export function RelationsChercheur() {
	const [groupes, setGroupes] = useState([]);
	const [selectedGroupe, setSelectedGroupe] = useState({});
	const [showNouveauGroupe, setShowNouveauGroupe] = useState(false);

	const [amis, setAmis] = useState([]);
	const [selectedAmi, setSelectedAmi] = useState({});
	const [showNouvelAmi, setShowNouvelAmi] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);

	const [showAmis, setShowAmis] = useState(true);

	const [loading, setLoading] = useState(false);

	const { id } = useParams();
	const currentPath = window.location.pathname;

	async function getGroupes() {
		try {
			setLoading(true);
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
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function getAmis() {
		try {
			setLoading(true);
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
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function addGroupe(nom, description) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/addGroupe",
				{
					nom,
					description,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 201) {
				getGroupes();
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function addAmi(email, numero) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/addAmi",
				{
					email: email ? email : undefined,
					numero: numero ? numero : undefined,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.status === 201) {
				getAmis();
			}
			if (response.status === 202) {
				setShowUpdate(true);
				setTimeout(() => setShowUpdate(false), 3000);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const navigate = useNavigate();
	function handleGroupeClick(groupId) {
		navigate(`/chercheur/relations/groupes/${groupId}`);
	}

	function handleAmiClick(amiId) {
		navigate(`/chercheur/relations/amis/${amiId}`);
	}

	function updateSelectedGroupe(id, groupes, setShowAmis) {
		if (id && currentPath.includes("groupes") && groupes.length > 0) {
			const selectedGroupe = groupes.find((groupe) => groupe._id === id);
			setSelectedGroupe(selectedGroupe);
			setShowAmis(false);
		}
	}

	function updateSelectedAmi(id, amis, setShowAmis) {
		if (id && currentPath.includes("amis") && amis.length > 0) {
			const selectedAmi = amis.find((ami) => ami.ami._id === id);
			setSelectedAmi(selectedAmi);
			setShowAmis(true);
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			await getGroupes();
			await getAmis();
			getUrl();
		};

		(async () => {
			await fetchData();
			console.log(groupes, amis, selectedGroupe, selectedAmi);
		})();
	}, []);

	useEffect(() => {
		updateSelectedGroupe(id, groupes, setShowAmis);
		updateSelectedAmi(id, amis, setShowAmis);
	}, [groupes, amis]);

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

	const [showAddUser, setShowAddUser] = useState(false);
	const user = JSON.parse(localStorage.getItem("user"));

	async function addUserToGroupe(id, email, numero) {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/users/chercheur/addUserToGroupe",
				{
					id,
					email,
					numero,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				getGroupes();
			}
			if (response.status === 201) {
				setShowUpdate(true);
				setTimeout(() => setShowUpdate(false), 3000);
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className='min-h-screen pb-10'>
			<HeaderChercheur></HeaderChercheur>
			<div className='mx-10 my-6'>
				<div className='flex space-x-2'>
					<p
						className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF font-bold rounded-full ${showAmis ? "border border-bleuF" : ""
							}`}
						onClick={() => {
							setShowAmis(true);
							if (selectedAmi.ami) {
								navigate(`/chercheur/relations/amis/${selectedAmi.ami._id}`);
							} else {
								navigate(`/chercheur/relations/amis`);
							}
						}}
					>
						Amis
					</p>
					<p
						className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF font-bold rounded-full ${showAmis ? "" : "border border-bleuF"
							}`}
						onClick={() => {
							setShowAmis(false);
							if (selectedGroupe && selectedGroupe._id) {
								navigate(`/chercheur/relations/groupes/${selectedGroupe._id}`);
							} else {
								navigate(`/chercheur/relations/groupes`);
							}
						}}
					>
						Groupes
					</p>
				</div>

				<div className='grid grid-cols-3 mt-4 gap-2'>
					<div>
						<div className='relative border border-bleuF rounded-lg h-96 mt-2 mr-6 p-2 overflow-y-scroll scrollbar-track-transparent'>
							<div className='flex flex-col space-y-2'>
								{!showAmis &&
									groupes.map((item) => (
										<div
											key={item._id}
											className={`flex flex-col justify-between bg-${selectedGroupe._id === item._id ? "bleu" : "violet"
												} p-2 rounded-lg border border-bleuF cursor-pointer`}
											onClick={() => {
												setLoading(true);
												setTimeout(() => {
													setSelectedGroupe(item);
													handleGroupeClick(item._id);
													setLoading(false);
												}, 500);
											}}
										>
											<p className='text-sm text-bleuF font-bold'>
												Groupe {item.nom}
											</p>
											<p className='text-sm text-bleuF font-semibold'>
												{item.description}
											</p>
											<div className='flex gap-[5px] mt-2'>
												{item.membres.map((member, index) => (
													<img
														key={index}
														src={url + member.image}
														alt={member.altText}
														title={member.nom + " " + member.prenom}
														className='w-10 h-10 rounded-full -mr-3'
													/>
												))}
											</div>
										</div>
									))}

								{showAmis &&
									amis.map((item) => (
										<div
											key={item.ami ? item.ami._id : ""}
											className={`flex flex-col justify-between bg-${(selectedAmi.ami ? selectedAmi.ami._id : "") ===
												(item.ami ? item.ami._id : "")
												? "bleu"
												: "violet"
												} p-2 rounded-lg border border-bleuF cursor-pointer`}
											onClick={() => {
												setLoading(true);
												setTimeout(() => {
													setSelectedAmi(item);
													handleAmiClick(item.ami._id);
													setLoading(false);
												}, 500);
											}}
										>
											<div className='flex w-full items-center space-x-2'>
												<div className='img-container'>
													<img
														src={url + item.ami.image}
														title={item.ami.nom + " " + item.ami.prenom}
														className='w-10 h-10 rounded-full'
													/>
												</div>
												<p className='text-sm text-bleuF font-bold'>
													{item.ami ? item.ami.nom : ""}{" "}
													{item.ami ? item.ami.prenom : ""}
												</p>
											</div>
										</div>
									))}
							</div>
							<button
								className='bg-bleuF w-12 h-12 absolute bottom-0 right-0 mb-6 justify-center items-center flex rounded-full'
								onClick={() => {
									if (showAmis) {
										setShowNouvelAmi(true);
									} else {
										setShowNouveauGroupe(true);
									}
								}}
							>
								<FaPlus size={20} color='EEEDFF' />
							</button>
						</div>
					</div>
					<div className='col-span-2'>
						{!showAmis && (
							<div className='grid grid-cols-2 gap-4'>
								<div className='border border-bleuF rounded-lg p-4'>
									<p className='text-sm text-bleuF font-bold'>
										Groupe {selectedGroupe.nom}
									</p>
									<p className='text-sm text-bleuF'>
										{selectedGroupe.description}
									</p>
								</div>
								<div className='border border-bleuF rounded-lg px-4 py-2'>
									<div className='flex items-center'>
										<p className='text-sm text-bleuF font-bold'>Membres</p>
										{user.email ===
											(selectedGroupe.createur
												? selectedGroupe.createur.email
												: "") ? (
											<FaUserPlus
												className=' cursor-pointer m-2'
												color='FF584D'
												size={20}
												onClick={(e) => {
													e.stopPropagation();
													setShowAddUser(true);
												}}
											/>
										) : (
											""
										)}
									</div>
									<div className='flex gap-[5px] mt-2'>
										{selectedGroupe.membres
											? selectedGroupe.membres.map((item, index) => (
												<img
													key={index}
													src={url + item.image}
													alt={item.altText}
													title={item.nom + " " + item.prenom}
													className='w-10 h-10 rounded-full -mr-3'
												/>
											))
											: ""}
									</div>
								</div>
							</div>
						)}

						<div className='border border-bleuF rounded-lg h-96 mt-2 p-2 overflow-y-scroll scrollbar-track-transparent'>
							<div className='flex flex-col space-y-2'>
								{!showAmis && selectedGroupe.offres
									? selectedGroupe.offres.map((item, index) => (
										<div className='flex items-center space-x-4'>
											<div className='flex flex-col items-center'>
												<img
													key={index}
													src={url + (item.emetteur ? item.emetteur.image : "")}
													alt={item.altText}
													title={
														item.emetteur
															? item.emetteur.nom + " " + item.emetteur.prenom
															: ""
													}
													className='w-10 h-10 rounded-full'
												/>
												<p className='text-center text-xs'>{item.emetteur ? item.emetteur.nom + " " + item.emetteur.prenom : ""}</p>
											</div>
											<div className='w-2/3'>
												<CadrePartage
													Offre={item.offre}
													onClick={() => {
														window.open(
															"/offres/" + item.offre._id,
															"_blank"
														);
													}}
												></CadrePartage>
											</div>
											<p className='text-bleuF text-xs'>{item.date}</p>
										</div>
									))
									: ""}
								{showAmis && selectedAmi.offresPartagees
									? selectedAmi.offresPartagees.map((item, index) => (
										<div className='flex items-center space-x-4'>
											<div className='flex flex-col items-center'>
												<img
													key={index}
													src={url + (item.emetteur ? item.emetteur.image : "")}
													alt={item.altText}
													title={
														item.emetteur
															? item.emetteur.nom + " " + item.emetteur.prenom
															: ""
													}
													className='w-10 h-10 rounded-full'
												/>
												<p className='text-center text-xs'>{item.emetteur ? item.emetteur.nom + " " + item.emetteur.prenom : ""}</p>
											</div>

											<div className='w-2/3'>
												<CadrePartage
													Offre={item.offre}
													onClick={() => {
														window.open(
															"/offres/" + item.offre._id,
															"_blank"
														);
													}}
												></CadrePartage>
											</div>
											<p className='text-bleuF text-xs'>{item.date}</p>
										</div>
									))
									: ""}
							</div>
						</div>
					</div>
				</div>
			</div>

			{showNouveauGroupe && (
				<NouveauGroupe
					onDismiss={() => setShowNouveauGroupe(false)}
					onConfirm={(nom, description) => addGroupe(nom, description)}
				/>
			)}

			{showNouvelAmi && (
				<NouveauAmi
					onDismiss={() => setShowNouvelAmi(false)}
					onConfirm={(email, numero) => addAmi(email, numero)}
				/>
			)}

			{showAddUser && (
				<AjouterUser
					data={selectedGroupe}
					onConfirm={(email, numero) =>
						addUserToGroupe(selectedGroupe._id, email, numero)
					}
					onDismiss={() => setShowAddUser(false)}
				/>
			)}
			{showUpdate && (
				<div className='absolute left-1/2 top-1/2 transform -translate-x-1/2'>
					<p className='bg-vertF p-2 rounded-lg border border-vertF text-white'>
						{"Utilisateur non inscrit.\nUn mail à été envoyé"}
					</p>
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
