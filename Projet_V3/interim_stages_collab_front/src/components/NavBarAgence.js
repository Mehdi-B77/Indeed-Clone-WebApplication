import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBarAgence({ selected }) {
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
							<NavLink to={"/agence/fichiers"}>Fichiers</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
