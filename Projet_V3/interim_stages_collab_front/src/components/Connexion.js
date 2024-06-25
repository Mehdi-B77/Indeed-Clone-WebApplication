import React, { useState, useRef } from "react";
import { ButtonRond } from "./ButtonRond";
import { ButtonCarre } from "./ButtonCarre";
import { FaTimesCircle } from "react-icons/fa";
import { axiosInstance } from "../util/axios";

export function Connexion({ onClose, onInscription }) {
	const [selectedOption, setSelectedOption] = useState(null);

	const emailRef = useRef();
	const passwordRef = useRef();
	const [err, setErr] = useState("");

	async function handleLogin(e) {
		setErr("");
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			console.log({
				email,
				password,
			});
			const response = await axiosInstance.post(
				"/auth/login/" + selectedOption,
				{
					email,
					password,
				}
			);

			console.log(response);

			if (response.request.status === 200) {
				localStorage.setItem("accessToken", response.data.accessToken);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				window.location.href = "/" + selectedOption;
			} else {
				setErr(
					"Une erreur s'est produite, vérifiez vos identifiants ou contactez l'admin."
				);
			}
		} catch (e) {
			console.log(e);
			setErr(
				"Une erreur s'est produite, vérifiez vos identifiants ou contactez l'admin."
			);
		}
	}

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};

	const [show, setShow] = useState(false);

	const handleClick = () => {
		if (selectedOption) {
			setShow(true);
		} else {
		}
	};

	return (
		<div className='fixed z-50 overlay flex flex-col justify-center items-center p-4 w-3/4 h-4/5 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
			<div className='flex justify-end w-full mb-6'>
				<div
					onClick={onClose}
					className='cursor-pointer absolute top-4 right-4 flex justify-center items-center w-8 h-8 rounded-full hover:bg-bleu transition duration-300'
				>
					<FaTimesCircle color='#465475' />
				</div>
			</div>

			{!show && (
				<div className='flex flex-col items-center justify-center'>
					<h1 className='text-xl text-bleuF font-bold mb-6'>Se connecter</h1>
					<div className='flex flex-col m-2 w-full'>
						<p className='text-bleuF text-sm font-semibold'>
							Vous voulez vous connecter en tant que :{" "}
						</p>
					</div>

					<div className='w-full m-4'>
						<label className='flex items-center justify-start bg-violet w-full p-2 rounded-lg'>
							<input
								type='radio'
								name='options'
								className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
								checked={selectedOption === "chercheur"}
								onChange={() => handleOptionChange("chercheur")}
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								Etudiant
							</span>
						</label>

						<label className='flex items-center justify-start mt-1 bg-violet w-full p-2 rounded-lg'>
							<input
								type='radio'
								name='options'
								className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
								checked={selectedOption === "employeur"}
								onChange={() => handleOptionChange("employeur")}
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								{" "}
								Employeur
							</span>
						</label>
						<label className='flex items-center justify-start  mt-1 bg-violet w-full p-2 rounded-lg'>
							<input
								type='radio'
								name='options'
								className='h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200'
								checked={selectedOption === "etablissement"}
								onChange={() => handleOptionChange("etablissement")}
							/>
							<span className='ml-2 text-bleuF font-bold text-sm'>
								Etablissement
							</span>
						</label>
					</div>

					<div className='w-full'>
						<ButtonCarre
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Continuer"}
							width={"w-full mt-2"}
							height={"fit"}
							onclick={handleClick}
						></ButtonCarre>
					</div>

					<div className='flex mt-8'>
						<p className='text-xs text-bleuF'>Vous n'avez pas de compte ? </p>
						<p
							className='text-xs text-rouge underline ml-1 cursor-pointer'
							onClick={onInscription}
						>
							S'inscrire
						</p>
					</div>
				</div>
			)}

			{show && (
				<div className='flex flex-col w-full items-center'>
					<h1 className='text-xl text-bleuF font-bold mb-6'>
						Connexion
					</h1>
					<div className='flex flex-col m-2 w-3/4'>
						<label className='text-bleuF text-xs font-bold'>Email</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
							ref={emailRef}
							onFocus={() => setErr("")}
						></input>
					</div>
					<div className='flex flex-col m-2 w-3/4 mb-4'>
						<label className='text-bleuF text-xs font-bold'>Mot de passe</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='password'
							ref={passwordRef}
							onFocus={() => setErr("")}
						></input>
						<p className='text-bleuF text-xs underline'>
							Mot de passe oublié ?
						</p>
						<p className='text-rouge text-xs mt-4'>{err}</p>
					</div>

					<div className='flex items-center justify-center'></div>

					<div className='w-3/4'>
						<ButtonCarre
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Continuer"}
							width={"w-full mt-2"}
							height={"fit"}
							onclick={(e) => handleLogin(e)}
						></ButtonCarre>
					</div>

					<div className='flex mt-8'>
						<p className='text-xs text-bleuF'>Vous n'avez pas de compte ? </p>
						<p
							className='text-xs text-rouge underline ml-1 cursor-pointer'
							onClick={onInscription}
						>
							S'inscrire
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
