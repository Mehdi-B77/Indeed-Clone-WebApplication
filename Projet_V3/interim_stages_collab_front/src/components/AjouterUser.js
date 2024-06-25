import React, { useState, useRef, useEffect } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { axiosInstance } from "../util/axios";

export function AjouterUser({ data, onConfirm, onDismiss }) {
	const [loading, setLoading] = useState(false);
	const emailRef = useRef("");
	const numeroRef = useRef("");

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

	useEffect(() => {
		getUrl();
	}, []);

	const handleConfirm = async () => {
		const email = emailRef.current.value;
		const numero = numeroRef.current.value;
		try {
			setLoading(true);

			await onConfirm(email, numero);
			setTimeout(() => {
				setLoading(false);
				onDismiss();
			}, 1000);
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
						<div className='flex items-center justify-center space-x-2'>
							<p className='text-lg font-bold text-bleuF text-center'>
								Ajouter un membre
							</p>
							<FaUserPlus size={30} className='text-bleuF' />
						</div>
						<div className='flex justify-between bg-bleu p-4 rounded-lg'>
							<div>
								<p className='text-sm text-bleuF font-bold'>
									Groupe {data.nom}
								</p>
								<p className='text-sm text-bleuF font-semibold'>
									{data.description}
								</p>
								<div className='flex gap-[5px] mt-2'>
									{data.membres.map((item, index) => (
										<img
											key={index}
											src={url + item.image}
											alt={item.altText}
											className='w-10 h-10 rounded-full -mr-3'
										/>
									))}
								</div>
							</div>
						</div>
						<div>
							<p className='text-sm text-bleuF font-semibold'>Email</p>
							<input
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								ref={emailRef}
								type='email'
							/>
							<div className='flex items-center w-full mt-4'>
								<div className='flex-grow border-t border-bleuF w-full mx-2'></div>
								<span className='text-xs text-bleuF'>OU</span>
								<div className='flex-grow border-t border-bleuF w-full mx-2'></div>
							</div>
						</div>

						<div>
							<p className='text-sm text-bleuF font-semibold'>
								Numero de téléphone
							</p>
							<input
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								ref={numeroRef}
								type='tel'
							/>
						</div>
					</div>
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
							contenu={"Ajouter"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={handleConfirm}
						></ButtonCarre>
					</div>
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
