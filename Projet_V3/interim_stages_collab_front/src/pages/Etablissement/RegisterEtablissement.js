import React from "react";
import {Footer, Header, InscriptionEtablissement} from "../../components";

export function RegisterEtablissement() {
	return (
		<div className='min-h-screen w-full'>
			<Header></Header>
			<div className='min-h-screen p-5 items-center justify-center flex w-full'>
			<InscriptionEtablissement></InscriptionEtablissement>
			</div>
			<Footer></Footer>
		</div>
	);
}