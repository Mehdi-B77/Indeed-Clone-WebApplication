import React, { useState } from "react";
import esi from "../assets/logo_esi.png";
import { FaBell } from "react-icons/fa";
import Notifications from "./Notifications";
import Compte from "./Compte";
import {Link, useLocation} from "react-router-dom";

export function HeaderEmployeur({}) {
	const redirect = () => {
		window.location.href="/";
	}

	const location = useLocation();

	// Function to check if the route matches the given path
	const isRouteActive = (path) => {
		return location.pathname === path;
	};
	return (
		<div className='py-4 sticky top-0 z-10 bg-white border-b'>
			<div className='flex mx-10 items-center justify-between'>
				<h1 className='text-2xl font-bold text-bleuF' onClick={redirect}>Stages - Employeur</h1>
				<nav className={`flex space-x-6 items-center`}>
					<ul className='flex space-x-6 items-center'>
						<li>
							<Link
								to="/employeur/offres"
								className={`cursor-pointer ${isRouteActive("/employeur/offres") ? " underline font-bold" : ""}  text-bleuF hover:bg-gray-300 rounded-md p-2`}
							>
								Offres
							</Link>
						</li>
						<li>
							<Link
								to="/employeur/candidatures"
								className={`cursor-pointer ${isRouteActive("/employeur/candidatures") ? " underline font-bold" : ""}  text-bleuF hover:bg-gray-300 rounded-md p-2`}
							>
								Candidatures
							</Link>
						</li>
						<li>
							<Link
								to="/employeur/conventions"
								className={`cursor-pointer ${isRouteActive("/employeur/conventions") ? " underline font-bold" : ""}  text-bleuF hover:bg-gray-300 rounded-md p-2`}
							>
								Conventions
							</Link>
						</li>
						<li>
							<Link
								to="/employeur/emplois"
								className={`cursor-pointer ${isRouteActive("/employeur/emplois") ? " underline font-bold" : ""}  text-bleuF hover:bg-gray-300 rounded-md p-2`}
							>
								Stages
							</Link>
						</li>
					</ul>
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
