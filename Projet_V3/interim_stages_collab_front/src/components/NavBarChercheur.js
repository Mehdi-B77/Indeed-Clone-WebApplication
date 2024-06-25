import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBarChercheur({ selected }) {
	const [selectedItem, setSelectedItem] = useState(selected);

	return (
		<div className='mt-2'>
			<div className='flex items-center justify-center'>
				<nav>
					<ul className='flex space-x-8 items-center p-2'>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 0
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							}`}
						>
							<NavLink to={"/chercheur/candidatures"}>Candidatures</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full ${
								selectedItem === 4
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							}`}
						>
							<NavLink to={"/chercheur/conventions"}>Conventions</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full border hover:filter hover:brightness-90 transition-all duration-300 ${
								selectedItem === 1
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							}`}
						>
							<NavLink to={"/chercheur/emplois"}>Emplois</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full border hover:filter hover:brightness-90 transition-all duration-300 ${
								selectedItem === 2
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							}`}
						>
							<NavLink to={"/chercheur/agenda"}>Agenda</NavLink>
						</li>
						<li
							className={`px-3 pt-1 pb-2 cursor-pointer bg-violet text-bleuF text-base rounded-full border hover:filter hover:brightness-90 transition-all duration-300 ${
								selectedItem === 3
									? "border border-bleuF"
									: "hover:filter hover:brightness-90 transition-all duration-300"
							}`}
						>
							<NavLink to={"/chercheur/candidaturesSpontanees"}>
								Candidature Spontanée
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
