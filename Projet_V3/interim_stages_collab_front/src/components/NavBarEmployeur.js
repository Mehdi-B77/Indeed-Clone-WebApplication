import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBarEmployeur({ selected }) {
	const [selectedItem, setSelectedItem] = useState(selected);

	return (
		<div className=''>
			<div className='flex items-center justify-center'>
				<nav>
					<ul className='flex space-x-8 items-center p-2 mt-2'>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 0
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							}`}
						>
							<NavLink to={"/employeur/offres"}>Offres</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 1
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							}`}
						>
							<NavLink to={"/employeur/candidatures"}>Candidatures</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 2
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							}`}
						>
							<NavLink to={"/employeur/emplois"}>Emplois</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
