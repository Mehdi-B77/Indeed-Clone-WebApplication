import React from "react";
import { Link, useLocation } from "react-router-dom";
import Notifications from "./Notifications";
import Compte from "./Compte";
import Groupes from "./Groupes";

export function HeaderChercheur() {
	const location = useLocation();

	// Function to check if the route matches the given path
	const isRouteActive = (path) => {
		return location.pathname === path;
	};

	return (
		<div className='py-4 sticky top-0 z-10 bg-white border-b'>
			<div className='flex mx-10 items-center justify-between'>
				<h1 className='text-2xl font-bold text-bleuF'>
					<Link to="/" className="cursor-pointer">Stages - Etudiant</Link>
				</h1>
				<nav className={`flex space-x-6 items-center`}>
					<ul className='flex space-x-6 items-center'>
						<li>
							<Link
								to="/chercheur/candidatures"
								className={`cursor-pointer ${isRouteActive("/chercheur/candidatures") ? " underline font-bold" : ""}  text-bleuF hover:bg-gray-300 rounded-md p-2`}
							>
								Candidatures
							</Link>
						</li>
						<li>
							<Link
								to="/chercheur/conventions"
								className={`cursor-pointer ${isRouteActive("/chercheur/conventions") ? " underline font-bold" : ""}  text-bleuF hover:bg-gray-300 rounded-md p-2`}
							>
								Conventions
							</Link>
						</li>
						<li>
							<Link
								to="/chercheur/emplois"
								className={`cursor-pointer ${isRouteActive("/chercheur/emplois") ? " underline font-bold" : ""}  text-bleuF hover:bg-gray-300 rounded-md p-2`}
							>
								Stages
							</Link>
						</li>
						<li

						>
							<Link to={"/chercheur/agenda"}
								className={`cursor-pointer ${isRouteActive("/chercheur/agenda") ? " underline font-bold" : ""}  text-bleuF hover:bg-gray-300 rounded-md p-2`}
							>
								Agenda
							</Link>
						</li>
					</ul>
					<ul className='flex space-x-6 items-center'>
						<li className='cursor-pointer'>
							<Groupes />
						</li>
						<li className='cursor-pointer relative'>
							<Notifications />
						</li>
						<li className='cursor-pointer'>
							<Compte />
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
