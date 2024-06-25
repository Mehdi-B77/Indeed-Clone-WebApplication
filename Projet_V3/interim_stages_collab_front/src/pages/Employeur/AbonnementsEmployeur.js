import React, { useState, useEffect } from "react";
import {
	HeaderEmployeur,
	NavBarEmployeur,
	CadreGEmployeur,
	Spinner,
	Abonnements,
} from "../../components";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export function AbonnementsEmployeur() {
	return (
		<div className='min-h-screen bg-bleu pb-10 flex items-center justify-center'>
			<Abonnements />
		</div>
	);
}
