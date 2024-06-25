import React from "react";

export function ButtonRond({
	couleur,
	couleurTexte,
	contenu,
	width,
	height,
	onClick,
}) {
	const buttonWidth = width || "w-10";
	const buttonHeight = height || "h-10";

	return (
		<button
			className={`rounded-3xl ${buttonWidth} ${buttonHeight} bg-${couleur} text-${couleurTexte} text-sm font-bold px-4 pt-1 pb-2 hover:filter hover:brightness-90 transition-all duration-300`}
			onClick={onClick}
		>
			{contenu}
		</button>
	);
}
