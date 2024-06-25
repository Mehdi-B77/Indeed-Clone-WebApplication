import React, { useState } from "react";
import esi from "../assets/logo_esi.png";
import { FaBell } from "react-icons/fa";
import Notifications from "./Notifications";
import Compte from "./Compte";
import {NavBarAgence} from "./NavBarAgence";
import {NavBarEtablissement} from "./NavBarEtablissement";

export function HeaderEtablissement({selected}) {
	const redirect = () => {
		window.location.href="/";
	}
	return (
		<div className='py-4 bg-bleuF'>
			<div className='flex mx-10 items-center justify-between'>
				<h1 className='text-2xl font-bold text-violet' onClick={redirect}>Stages - Etablissement</h1>
				<nav className='flex items-center justify-center space-x-8'>
					<NavBarEtablissement selected={selected}/>
					<ul className='flex space-x-6 items-center'>
						<li className='cursor-pointer relative'>
							<Notifications/>
						</li>
						<li className='cursor-pointer'>
							<Compte/>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}