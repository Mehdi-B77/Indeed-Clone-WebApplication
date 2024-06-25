import React, { useRef, useState } from "react";
import { RiLockFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { ButtonRond } from "./ButtonRond";
import { axiosInstance } from "../util/axios";

export function InscriptionConfirmation({ data, onConfirm }) {
	let [status, setStatus] = useState(false);
	let [err, setErr] = useState("");
	let codeRef = useRef(null);

	async function validateCode(e) {
		e.preventDefault();
		const email = data;
		console.log(codeRef);
		const code = codeRef.current.value;
		try {
			const response = await axiosInstance.post(`/auth/code/validate`, {
				email,
				code,
			});

			console.log(response);

			if (response.request.status === 200) {
				console.log(response.data);
				onConfirm();
				setStatus(true);
			} else {
				setErr("Code de confirmation incorrect");
			}
		} catch (e) {
			setErr("Code de confirmation incorrect");
		}
	}

	const handleReturn = () => {
		window.location.href = "/";
	};

	const handleClick = (e) => {
		validateCode(e);
	};

	return (
		<div className='overlay flex justify-center items-center w-full'>
			<div className='z-50 justify-center items-center p-10 w-fit h-4/5 bg-white rounded-lg'>
				<div className='flex flex-col items-center justify-center space-y-4'>
					{status ? (
						<FaCheckCircle size={40} className='text-vertF' />
					) : (
						<RiLockFill size={40} className='text-bleuF' />
					)}

					{status ? (
						<h1 className='text-xl text-vertF font-bold'>Code vérifié !</h1>
					) : (
						<h1 className='text-xl text-bleuF font-bold'>
							Vérification de code
						</h1>
					)}
				</div>
				{status ? (
					<h1 className='text-sm text-bleuF mt-6'>
						Le code a été vérifié avec succés.
					</h1>
				) : (
					<p className='text-sm text-bleuF mt-10'>
						{" "}
						On vous a envoyé un code de confirmation à <strong>{data}</strong>.
					</p>
				)}

				{status ? (
					""
				) : (
					<div className='flex flex-col items-center justify-between mt-10 space-y-2'>
						<p className='text-sm text-bleuF'> Veuillez entrer le code </p>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							ref={codeRef}
							onFocus={() => setErr("")}
						></input>
						<p className='text-sm text-rouge'> {err} </p>
					</div>
				)}

				{status ? (
					<div className='mt-10'>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Retour à Acceuil"}
							width={"w-full"}
							height={"fit"}
							onClick={handleReturn}
						></ButtonRond>
					</div>
				) : (
					<div className='mt-10'>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Continuer"}
							width={"w-full"}
							height={"fit"}
							onClick={(e) => handleClick(e)}
						></ButtonRond>
					</div>
				)}
			</div>
		</div>
	);
}
