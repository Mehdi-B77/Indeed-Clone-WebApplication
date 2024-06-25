import React, { useState } from "react";

export function Footer() {

	const redirect = () => {
		window.location.href = "/";
	};
	return (
		<footer className="bg-bleuF py-8 lg:py-8 mt-auto w-full">
			<div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-center items-center">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						<div>
							<h2 className="text-xl font-bold mb-4 text-white">A propos</h2>
							<ul className="text-gray-400">
								<li className="mb-2">
									<a href="#" className="hover:text-gray-200">Qui sommes nous ?</a>
								</li>
								<li>
									<a href="#" className="hover:text-gray-200">Nous contacter</a>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="text-xl font-bold mb-4 text-white">Mentions légales</h2>
							<ul className="text-gray-400">
								<li className="mb-2">
									<a href="#" className="hover:text-gray-200">CGV / CGU</a>
								</li>
								<li>
									<a href="#" className="hover:text-gray-200">Confidentialité</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
