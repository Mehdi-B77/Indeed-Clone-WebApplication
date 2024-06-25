import React, { useState } from "react";
import Notifications from "./Notifications";
import Compte from "./Compte";

export function HeaderAgence({}) {
	return (
		<div className='py-4 sticky top-0 z-10 bg-white border-b'>
			<div className='flex mx-10 items-center justify-between'>
				<h1 className='text-2xl font-bold text-violet'>Intérim - Agence</h1>
				<nav>
					<ul className='flex space-x-6 items-center'>
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
