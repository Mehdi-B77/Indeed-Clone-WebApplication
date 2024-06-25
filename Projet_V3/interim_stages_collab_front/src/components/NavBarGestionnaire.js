import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBarGestionnaire({ selected }) {
	const [selectedItem, setSelectedItem] = useState(selected);

	return (
		<div className='bg-violet'>
			<div className='flex items-center justify-center'>
				<nav>
					<ul className='flex space-x-8 items-center'>
						<li
							className={`px-2 py-1 cursor-pointer text-base font-bold ${
								selectedItem === 0 ? "bg-bleuF text-violet" : "text-bleuF"
							}`}
						>
							<NavLink to={"/gestionnaire/inscriptions"}>Inscriptions</NavLink>
						</li>
						<li
							className={`px-2 py-1 cursor-pointer text-base font-bold ${
								selectedItem === 1 ? "bg-bleuF text-violet" : "text-bleuF"
							}`}
						>
							<NavLink to={"/gestionnaire/utilisateurs"}>Utilisateurs</NavLink>
						</li>
						<li
							className={`px-2 py-1 cursor-pointer text-base font-bold ${
								selectedItem === 2 ? "bg-bleuF text-violet" : "text-bleuF"
							}`}
						>
							<NavLink to={"/gestionnaire/statistiques"}>Statistiques</NavLink>
						</li>
						<li
							className={`px-2 py-1 cursor-pointer text-base font-bold ${
								selectedItem === 3 ? "bg-bleuF text-violet" : "text-bleuF"
							}`}
						>
							<NavLink to={"/gestionnaire/metiers"}>Métiers</NavLink>
						</li>
						<li
							className={`px-2 py-1 cursor-pointer text-base font-bold ${
								selectedItem === 4 ? "bg-bleuF text-violet" : "text-bleuF"
							}`}
						>
							<NavLink to={"/gestionnaire/abonnements"}>Abonnements</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
