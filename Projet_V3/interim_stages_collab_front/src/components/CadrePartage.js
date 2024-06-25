import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaDollarSign } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import { FaTimesCircle } from "react-icons/fa";
import google from "../assets/google.png";
import { calculateDuration } from "../util/formatTime";
import { axiosInstance } from "../util/axios";

export function CadrePartage({ Offre, className, onClick }) {
	const [urlAuth, setUrlAuth] = useState("");
	async function getUrlAuth() {
		try {
			const response = await axiosInstance.get("/services/auth");
			if (response.status === 200) {
				console.log(response.data);
				setUrlAuth(response.data);
			} else {
				setUrlAuth("/");
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getUrlAuth();
	}, []);

	return (
		<div
			className={`bg-violet rounded-lg w-full ${className} cursor-pointer`}
			onClick={onClick}
		>
			<div className='flex w-full px-4 py-2'>
				<img
					className='rounded-full w-12 h-12 border border-bleuF'
					src={Offre.employeur ? urlAuth + Offre.employeur.image : google}
				></img>

				<div className='flex flex-col w-full pl-4'>
					<div className='flex justify-start'>
						<div>
							<p className='text-bleuF font-bold'>{Offre.titre}</p>
							<p className='text-bleuF'>{Offre.date}</p>
						</div>
					</div>
					<div className='flex items-center justify-between mt-2 mr-6'>
						<div className='flex items-center'>
							<MdLocationOn color='#465475' />
							<p className='text-bleuF'>{Offre.lieu}</p>
						</div>
						<div className='flex items-center'>
							<FaDollarSign color='#465475' />
							<p className='text-bleuF'>{Offre.remuneration}</p>
						</div>
						<div className='flex items-center'>
							<TiTime size={20} color='#465475' />
							<p className='text-bleuF ml-1'>
								{calculateDuration(Offre.debut, Offre.fin)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
