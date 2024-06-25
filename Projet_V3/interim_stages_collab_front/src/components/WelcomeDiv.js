import React, { useState } from "react";
import {ButtonCarre} from "./ButtonCarre";
import {ButtonRond} from "./ButtonRond";

export function WelcomeDiv() {
	const [popupContent, setPopupContent] = useState("");

	const handlePopup = (content) => {
		setPopupContent(content);
	};

	const handleClosePopup = () => {
		setPopupContent("");
	};

	return (
		<div className="relative mt-10">
			<div className="h-auto bg-bleuF text-violet rounded-lg mt-20 mx-20 p-10">
				<h1 className="text-2xl font-bold mb-6">
					Bienvenue sur notre plateforme de recherche de stages.
				</h1>
				<div className="flex flex-wrap justify-center">
					<div
						className="bg-violet w-full sm:w-2/5 rounded-lg mb-6 sm:mr-6"
						onClick={() =>
							handlePopup(
								"Trouvez une offre de stage adaptée à votre profil. Des milliers d’entreprises proposent leurs offres ici, alors déposez votre CV et saisissez votre chance."
							)
						}
					>
						<h2 className="text-bleuF font-semibold m-4 text-center">
							Vous êtes un étudiant ?
						</h2>
					</div>
					<div
						className="bg-violet w-full sm:w-2/5 rounded-lg mb-6 sm:mx-6"
						onClick={() =>
							handlePopup(
								"Vous êtes une entreprise et vous souhaitez recruter des stagiaires ? Vous êtes au bon endroit. Connectez-vous et accédez à une panoplie de fonctionnalités."
							)
						}
					>
						<h2 className="text-bleuF font-semibold m-4 text-center">
							Vous êtes une entreprise ?
						</h2>
					</div>
					<div
						className="bg-violet w-full sm:w-2/5 rounded-lg mb-6 sm:ml-6"
						onClick={() =>
							handlePopup(
								"Vous êtes un établissement et vous souhaitez gérer les stages de vos étudiants ainsi que les conventions de stage ? Connectez-vous"
							)
						}
					>
						<h2 className="text-bleuF font-semibold m-4 text-center">
							Vous êtes un établissement ?
						</h2>
					</div>
				</div>
			</div>
			{popupContent && (
				<div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-8 rounded-lg justify-center items-center flex flex-col">
						<p className="text-gray-800">{popupContent}</p>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Fermer"}
							width={"fit"}
							height={"fit"}
							onClick={handleClosePopup}
						></ButtonRond>

					</div>
				</div>
			)}
		</div>
	);
}
