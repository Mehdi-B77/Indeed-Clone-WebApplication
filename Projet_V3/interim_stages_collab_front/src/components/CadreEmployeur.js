import React, { useState, useEffect } from "react";
import { FaDollarSign, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import google from "../assets/google.png";
import { axiosInstance } from "../util/axios";

export function CadreEmployeur({ data, className, onClick }) {
	const [url, setUrl] = useState("");
	async function getUrl() {
		try {
			const response = await axiosInstance.get("/services/auth");
			if (response.status === 200) {
				console.log(response.data);
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

	return (
		<div
			className={`bg-violet rounded-lg w-full ${className} cursor-pointer border border-bleuF`}
			onClick={onClick}
		>
			<div className='flex w-full px-4 py-2'>
				<img
					className='rounded-full w-12 h-12 border border-bleuF'
					src={data.image ? url + data.image : google}
				></img>

				<div className='flex flex-col w-full pl-4'>
					<div className='flex justify-between'>
						<div>
							<p className='text-bleuF font-bold'>
								{data ? data.entreprise : ""}
							</p>
							<div className='flex items-center justify-between mr-6 space-x-4'>
								<div className='flex items-center'>
									<MdLocationOn color='#465475' />
									<p className='text-bleuF'>
										{data.adresse ? data.adresse.rue : ""},{" "}
										{data.adresse ? data.adresse.ville : ""}
									</p>
								</div>
							</div>
						</div>
						<div>
							<p
								className={`text-${
									data.spontanee ? "vertF" : "rouge"
								} font-bold text-sm`}
							>
								{data.spontanee ? "Accepte CS" : "Pas de CS"}
							</p>
						</div>
					</div>
					<div className='flex flex-col w-full'>
						<div className='flex items-center mr-6 mt-2 space-x-4'>
							<div className='flex items-center space-x-1'>
								<FaEnvelope color='#465475' />
								<p className='text-bleuF'>
									{data.contacts ? data.contacts[0].email : ""}
								</p>
							</div>
							<div className='flex items-center space-x-1'>
								<FaPhone color='#465475' />
								<p className='text-bleuF'>
									{data.contacts ? data.contacts[0].numero : ""}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
