import React from "react";
import {
	Header,
	HeaderChercheur,
	NavBarChercheur,
	CadreP,
	CadreG,
	Footer,
} from "../components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../util/axios";
import { calculateDuration } from "../util/formatTime";

export function Offre() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

	const [selectedOffer, setSelectedOffer] = useState(0);
	const [offres, setOffres] = useState([]);

	const [isCheckedEmployeur, setIsCheckedEmployeur] = useState(false);
	const [isCheckedPeriode, setIsCheckedPeriode] = useState(false);
	const [isCheckedMetier, setIsCheckedMetier] = useState(false);
	const [isCheckedLieu, setIsCheckedLieu] = useState(false);
	const [filtredOffres, setFiltredOffres] = useState([]);
	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;

		switch (name) {
			case "memeEmployeur":
				setIsCheckedEmployeur(checked);
				break;
			case "memePeriode":
				setIsCheckedPeriode(checked);
				break;
			case "memeMetier":
				setIsCheckedMetier(checked);
				break;
			case "memeLieu":
				setIsCheckedLieu(checked);
				break;
			default:
				break;
		}
	};

	const handleFiltering = () => {
		let newData = [...offres];

		if (isCheckedEmployeur) {
			const selectedEmployeur = newData[selectedOffer].employeur._id;
			newData = newData.filter(
				(item) => item.employeur._id === selectedEmployeur
			);
		}
		if (isCheckedPeriode) {
			const selectedPeriode = calculateDuration(
				newData[selectedOffer].debut,
				newData[selectedOffer].fin
			);
			newData = newData.filter(
				(item) => calculateDuration(item.debut, item.fin) === selectedPeriode
			);
		}
		if (isCheckedMetier) {
			const selectedMetier = newData[selectedOffer].metier._id;
			newData = newData.filter((item) => item.metier._id === selectedMetier);
		}
		if (isCheckedLieu) {
			const selectedLieu = newData[selectedOffer].lieu;
			newData = newData.filter((item) => item.lieu === selectedLieu);
		}

		setFiltredOffres(newData);
	};

	async function getOffres() {
		try {
			const response = await axiosInstance.get("/offres");

			console.log(response);

			if (response.status === 200) {
				const data = response.data;
				const indexToMove = data.findIndex((item) => item._id === selectedId);

				if (indexToMove !== -1) {
					const updatedOffres = [
						data[indexToMove],
						...data.slice(0, indexToMove),
						...data.slice(indexToMove + 1),
					];
					setOffres(updatedOffres);
					setFiltredOffres(updatedOffres);
					setSelectedOffer(0);
				}
			} else {
				console.log(response);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getOffres();
	}, []);

	useEffect(() => {
		handleFiltering();
	}, [isCheckedEmployeur, isCheckedPeriode, isCheckedMetier, isCheckedLieu]);

	let { id } = useParams();
	const [selectedId, setSelectedId] = useState(id);

	const handleOfferSelection = (index, idOffre) => {
		setSelectedOffer(index);
		setSelectedId(idOffre);
	};
	const handleDeleteOffer = (e, index) => {
		const updatedOffres = [...filtredOffres];
		if (filtredOffres.length > 1) {
			updatedOffres.splice(index, 1);
		}
		setFiltredOffres(updatedOffres);
		if (index == updatedOffres.length) {
			handleOfferSelection(index - 1, updatedOffres[index - 1]._id);
		} else {
			handleOfferSelection(index, updatedOffres[index]._id);
		}
	};

	return (
		<div className='min-h-screen'>
			{user.type === "chercheur" ? (
				<>
					<HeaderChercheur />\
				</>
			) : (
				<Header></Header>
			)}

			<div className='m-6 bg-white rounded-lg p-4'>
				<div className='flex'>
					<div className='w-2/5'>
						<div className='grid grid-cols-2 mr-6'>
							<label className='flex items-center justify-start rounded-lg'>
								<input
									type='checkbox'
									name='memeEmployeur'
									className='h-4 w-4 text-blue-500 focus:ring-blue-200'
									checked={isCheckedEmployeur}
									onChange={handleCheckboxChange}
								/>
								<span className='ml-2 text-rouge font-bold text-sm'>
									Même employeur
								</span>
							</label>
							<label className='flex items-center justify-start rounded-lg'>
								<input
									type='checkbox'
									name='memePeriode'
									className='h-4 w-4 text-blue-50 focus:ring-blue-200'
									checked={isCheckedPeriode}
									onChange={handleCheckboxChange}
								/>
								<span className='ml-2 text-rouge font-bold text-sm'>
									Même période
								</span>
							</label>

							<label className='flex items-center justify-start rounded-lg'>
								<input
									type='checkbox'
									name='memeMetier'
									className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
									checked={isCheckedMetier}
									onChange={handleCheckboxChange}
								/>
								<span className='ml-2 text-rouge font-bold text-sm'>
									Même métier
								</span>
							</label>
							<label className='flex items-center justify-start rounded-lg'>
								<input
									type='checkbox'
									name='memeLieu'
									className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
									checked={isCheckedLieu}
									onChange={handleCheckboxChange}
								/>
								<span className='ml-2 text-rouge font-bold text-sm'>
									Même lieu
								</span>
							</label>
						</div>
						<div className='border border-bleuF rounded-lg h-96 mt-2 mr-6 p-2 overflow-y-scroll scrollbar-track-transparent'>
							{filtredOffres.map((item, index) => (
								<div className='mb-2'>
									<CadreP
										onClick={() => handleOfferSelection(index, item._id)}
										onDelete={(e) => handleDeleteOffer(e, index)}
										className={`${
											selectedOffer === index ? "border-2 border-bleuF" : ""
										}`}
										Offre={filtredOffres[index]}
									></CadreP>
								</div>
							))}
						</div>

						<style jsx>{`
							/* Styles spécifiques à la barre de défilement */
							::-webkit-scrollbar {
								width: 8px; /* Largeur de la barre de défilement */
							}

							::-webkit-scrollbar-thumb {
								background-color: #465475; /* Couleur de la poignée */
								border-radius: 4px; /* Bord arrondi de la poignée */
							}

							::-webkit-scrollbar-track {
								background-color: transparent; /* Couleur de la piste (fond) */
							}
						`}</style>
					</div>

					<div className='w-3/5 flex justify-center border border-bleuF rounded-lg p-2 h-96 overflow-y-scroll scrollbar-track-transparent mt-12'>
						<div className='w-full'>
							<CadreG id={selectedId}></CadreG>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
