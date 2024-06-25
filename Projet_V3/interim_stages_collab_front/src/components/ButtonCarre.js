import React from "react";

export function ButtonCarre({
	couleur,
	couleurTexte,
	contenu,
	width,
	height,
	onclick,
}) {
	const buttonWidth = width || "w-10";
	const buttonHeight = height || "h-10";

	return (
		<div>
			<button
				className={`flex rounded-lg ${buttonWidth} ${buttonHeight} bg-${couleur} text-${couleurTexte} text-sm justify-center font-bold px-4 py-2 items-center hover:filter hover:brightness-90 transition-all duration-300`}
				onClick={onclick}
			>
				{contenu}
			</button>
		</div>
	);
}
