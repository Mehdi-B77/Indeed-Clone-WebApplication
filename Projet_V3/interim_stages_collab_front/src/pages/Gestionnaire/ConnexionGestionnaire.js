import React, { useState, useRef } from "react";
import { ButtonCarre } from "../../components";
import { axiosInstance } from "../../util/axios";

export function ConnexionGestionnaire() {

	const nomRef = useRef();
	const passwordRef = useRef();
	const [err, setErr] = useState("");

	async function handleLogin(e) {
		setErr("");
		e.preventDefault();
		const nom = nomRef.current.value;
		const password = passwordRef.current.value;

		try {
			console.log({
				nom,
				password,
			});
			const response = await axiosInstance.post(
				"/auth/login/gestionnaire",
				{
					nom,
					password,
				}
			);

			console.log(response);

			if (response.request.status === 200) {
				localStorage.setItem("accessToken", response.data.accessToken);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				window.location.href = "/gestionnaire" ;
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

	



	return (
		<div className='fixed z-50 overlay flex flex-col justify-center items-center p-4 w-1/3 h-4/5 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
			
				<div className='flex flex-col w-full items-center'>
					<h1 className='text-xl text-bleuF font-bold mb-6'>
						Se connecter - Gestionnaire
					</h1>
					<div className='flex flex-col m-2 w-3/4'>
						<label className='text-bleuF text-xs font-bold'>Nom</label>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='email'
							ref={nomRef}
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

					
				</div>
			
		</div>
	);
}
