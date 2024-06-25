import React, { useState } from "react";
import { Cadre } from "./Cadre";
import { CadreFocus } from "./CadreFocus";

export function Cadres({saved, search, data }) {
	console.log("Cadres:data:" + data);
	const [focus, setFocus] = useState(data);

	console.log("Cadres:focus:" + focus);

	const focusCadre = (item) => {
		setFocus(item);
	};

	return (
		<div className="my-20 mx-auto max-w-screen-lg">
			{ saved ? (
				<p className="text-xl text-bleuF font-bold mb-6">
					Découvrez les offres de stages enregistrées
				</p>
			) : (
				<p className="text-xl text-bleuF font-bold mb-6">
					Découvrez les offres de stages {search ? `associées à "${search}"` : ""}
				</p>
			)}
			<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center ">
				<div className="flex flex-col w-full md:max-w-xs lg:max-w-sm space-y-6 overflow-y-scroll h-1/2 md:h-screen">
					{data.map((item, index) => (
						<div
							key={index}
							onClick={() => focusCadre(item)}
							className="cursor-pointer"
						>
							<Cadre Offre={item}/>
						</div>
					))}
				</div>
				<div className="w-full md:max-w-lg h-1/2 md:h-screen">
					<CadreFocus Offre={focus} />
				</div>
			</div>
		</div>
	);
}