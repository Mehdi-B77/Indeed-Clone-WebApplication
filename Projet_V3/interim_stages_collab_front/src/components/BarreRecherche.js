import React, { useState, useRef, useEffect } from "react";
import {FaSearch, FaMicrophone, FaCog, FaMapMarkerAlt, FaMicrophoneAlt, FaCogs} from "react-icons/fa";
import { Carousel } from "./Carousel";
import { VoiceRecognition } from "./VoiceRecognition";
import { RechercheAvancee } from "./RechercheAvancee";
import { axiosInstance } from "../util/axios";

export function BarreRecherche({ onSearch, onAdvancedSearch }) {
	const suggestionsRef = useRef(null);

	const lieuRef = useRef(null);
	const searchRef = useRef(null);

	const handleSearchIconClick = () => {
		setShowLieux(false);
		setShowSuggestions(false);
		setShowMetiers(false);
		onSearch(
			searchRef.current.value,
			lieuRef.current.value
		);
	};

	const handleAdvancedSearch = (
		date_debut,
		date_fin,
		salaire_min,
		salaire_max,
		entreprise,
		lieu,
		metier
	) => {
		setShowRechercheAvancee(false);
		onAdvancedSearch(
			date_debut,
			date_fin,
			salaire_min,
			salaire_max,
			entreprise,
			lieu,
			metier
		);
	};

	const [showSuggestions, setShowSuggestions] = useState(false);
	const suggestions = ["Développeur", "Jardinier", "Peintre"];
	const [filteredSuggestions, setFilteredSuggestions] = useState([
		"Développeur",
		"Devops",
		"Ingenieur",
	]);

	const [showMetiers, setShowMetiers] = useState(false);
	const [metiers, setMetiers] = useState([
		"Développeur",
		"Devops",
		"Ingenieur",
	]);
	const [filtredMetiers, setFilteredMetiers] = useState([
		"Développeur",
		"Jardinier",
		"Peintre",
	]);

	async function getMetiers() {
		try {
			const response = await axiosInstance.get("/offres/metiers");

			console.log(response);

			if (response.status === 200) {
				const metiers = response.data.map((item) => item.nom);
				setMetiers(metiers);
				setFilteredMetiers(metiers);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleInputMetierChange = (e) => {
		const searchTerm = e.target.value.toLowerCase();
		const filteredMetiers = metiers.filter((metier) =>
			metier.toLowerCase().includes(searchTerm)
		);
		setFilteredMetiers(filteredMetiers);
	};

	const handleInputLieuChange = (e) => {
		const searchTerm = e.target.value.toLowerCase();
		const filteredLieux = lieux.filter((lieu) =>
			lieu.toLowerCase().includes(searchTerm)
		);
		setFilteredLieux(filteredLieux);
	};

	const [showLieux, setShowLieux] = useState(false);
	const [lieux, setLieux] = useState(["Montpellier", "Ales", "Nimes"]);
	const [filteredLieux, setFilteredLieux] = useState([
		"Montpellier",
		"Ales",
		"Nimes",
	]);

	const [showVocal, setShowVocal] = useState(false);
	const [showRechercheAvancee, setShowRechercheAvancee] = useState(false);

	const handleInputSearchChange = (e) => {
		const searchTerm = e.target.value.toLowerCase();
		const filteredSuggestions = suggestions.filter((suggestion) =>
			suggestion.toLowerCase().includes(searchTerm)
		);
		setFilteredSuggestions(filteredSuggestions);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target) &&
				!lieuRef.current.contains(event.target)
			) {
				setShowSuggestions(false);
				setShowMetiers(false);
				setShowLieux(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		getMetiers();
	}, []);

	const handleVoiceSearch = (search) => {
		const cleanedSearch = search.replace(/[.,]/g, "");
		searchRef.current.value = cleanedSearch;
		onSearch(cleanedSearch);
	};


	return (
		<div className='mt-20 flex items-center justify-center'>
			<div className='flex flex-col w-full lg:flex-row lg:w-2/3'>
				<div
					className={`relative flex bg-white items-center rounded-l-lg border flex-grow mb-4 lg:mb-0 lg:rounded-l-lg`}>
					<button
						className={`bg-white h-12 rounded-l-lg border-r`}
						onClick={handleSearchIconClick}
						title={"Recherche textuelle"}
					>
						<FaSearch className={`text-gray-500 ml-4 mr-4 cursor-pointer`}/>
					</button>
					<input
						ref={searchRef}
						placeholder='Rechercher un métier, une entreprise...'
						className={`p-2 bg-white outline-none pr-8 truncate flex-grow`}
						onFocus={() => {
							setShowSuggestions(true);
							setShowLieux(false);
							setShowMetiers(false);
						}}
						onChange={handleInputSearchChange}
					/>
					{showSuggestions && (
						<div
							ref={suggestionsRef}
							className='absolute left-0 top-full w-full bg-white border border-gray-300 overflow-hidden shadow-md'
						>
							{filteredSuggestions.map((suggestion, index) => (
								<div
									key={index}
									className='p-2 cursor-pointer hover:bg-gray-100 transition'
									onClick={() => {
										setShowSuggestions(false);
										searchRef.current.value = suggestion;
									}}
								>
									{suggestion}
								</div>
							))}
						</div>
					)}
				</div>

				<div className={`relative flex bg-white items-center border flex-grow`}>
					<div className={`border-l border-l-gray-300 h-full justify flex items-center `}>
						<FaMapMarkerAlt className='text-gray-500 mx-2 cursor-pointer'/>
					</div>
					<input
						placeholder='Ville, région, code postal...'
						ref={lieuRef}
						className={`w-full p-2 border-r bg-white outline-none truncate flex-grow`}
						onFocus={() => {
							setShowLieux(true);
							setShowMetiers(false);
							setShowSuggestions(false);
						}}
						onChange={handleInputLieuChange}
					/>
					{showLieux && (
						<div
							className='absolute left-0 top-full w-full bg-white border border-gray-300 overflow-hidden shadow-md'
							ref={suggestionsRef}
						>
							{filteredLieux.slice(0, 3).map((lieu, index) => (
								<div
									key={index}
									className='p-2 cursor-pointer hover:bg-gray-100 transition'
									onClick={() => {
										setShowLieux(false);
										lieuRef.current.value = lieu;
									}}
								>
									{lieu}
								</div>
							))}
						</div>
					)}
				</div>

				<div className='flex items-center border rounded-r-lg '>
					<FaMicrophoneAlt
						className="text-gray-500 mx-2 cursor-pointer"
						onClick={() => setShowVocal(true)}
						title={"Recherche vocale"}
					/>
					<FaCogs
						className="text-gray-500 mx-2 mr-4 cursor-pointer"
						onClick={() => setShowRechercheAvancee(true)}
						title={"Recherche avancée"}
					></FaCogs>
				</div>
			</div>
			{showVocal && (
				<VoiceRecognition
					onClose={() => setShowVocal(false)}
					onConfirm={onSearch}
				/>
			)}

			{showRechercheAvancee && (
				<RechercheAvancee
					onClose={() => setShowRechercheAvancee(false)}
					onConfirm={handleAdvancedSearch}
				/>
			)}
		</div>


	);
}
