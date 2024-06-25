import React, { useState } from "react";
import { ButtonCarre } from "./ButtonCarre";

export function Criteres({ onConfirm, onDismiss }) {
	const [selected, setSelected] = useState([null, null, null, null, null]);

	const handleCheckboxChange = (index) => {
		const newSelected = [...selected];
		newSelected[index] = !newSelected[index];
		setSelected(newSelected);
	};

	const handleConfirm = () => {
		onConfirm(selected);
	};

	return (
		<div className='fixed z-30 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			<div className='w-1/4 h-fit bg-white p-4 rounded-md space-y-8'>
				<div className='space-y-2'>
					<p className='text-lg font-bold text-center'>Ajouter un critère</p>
				</div>

				<div className='h-1/2'>
					{[
						"Dates",
						"Salaire",
						"Entreprise",
						"Lieu",
						"Horaires de travail",
					].map((critere, index) => (
						<label
							key={index}
							className='flex items-center justify-between rounded-lg'
						>
							<span className='text-bleuF font-bold text-sm'>{critere}</span>
							<input
								type='checkbox'
								name='options'
								className='focus:ring-blue-200'
								checked={selected[index]}
								onChange={() => handleCheckboxChange(index)}
							/>
						</label>
					))}
				</div>

				<div className='flex justify-between'>
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
						contenu={"Ajouter"}
						width={"fit text-xs"}
						height={"fit"}
						onclick={handleConfirm}
					></ButtonCarre>
				</div>
			</div>
		</div>
	);
}
