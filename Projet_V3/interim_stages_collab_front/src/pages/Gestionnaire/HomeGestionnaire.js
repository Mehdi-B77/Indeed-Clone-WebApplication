import React from "react";
import { HeaderGestionnaire, NavBarGestionnaire } from "../../components";

export function HomeGestionnaire() {
	return (
		<div className='min-h-screen bg-bleu pb-10'>
			<HeaderGestionnaire></HeaderGestionnaire>
			<NavBarGestionnaire></NavBarGestionnaire>
		</div>
	);
}
