import React from "react";
import {Footer, Header, InscriptionChercheur} from "../../components";

export function RegisterChercheur() {
	return (
		<div className='min-h-screen w-full flex flex-col'>
			<Header></Header>
		<div className='min-h-screen p-5 items-center justify-center flex w-full'>
			<InscriptionChercheur></InscriptionChercheur>
		</div>
			<Footer></Footer>
			</div>
	);
}
