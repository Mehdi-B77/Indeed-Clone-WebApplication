import React, { useState, useEffect } from "react";
import {
    HeaderChercheur,
    NavBarChercheur,
    TableauConventionsChercheur,
    Spinner, 
     NavBarEtablissement,
} from "../../components";
import {TableauConventionsEtablissement} from "../../components/TableauConventionsEtablissement";
import {HeaderEtablissement} from "../../components/HeaderEtablissement";


import { axiosInstance } from "../../util/axios";

export function ConventionsEtablissement() {
   
    let [offres, setOffres] = useState([]);
    let [loading, setLoading] = useState(false);
    let [vide, setVide] = useState(false);
    let [idOffre, setIdOffre] = useState(null);


	async function deleteCandidature(id) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/conventions/etablissement/annule",
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.request.status === 200) {
				setLoading(false);
				window.location.href = "/etablissement/conventions";
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

    async function getConventions() {
        try {
            setLoading(true);
            let accessToken = localStorage.getItem("accessToken");

            const response = await axiosInstance.get("/conventions/etablissement", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
            console.log(response);

            if (response.request.status === 200) {
                setOffres(response.data);
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        getConventions();
    }, []);

    console.log(offres);

    return (
        <div>
            <HeaderEtablissement/>
            <div className='mx-10'>
                <h1 className='text-2xl font-bold my-4'>Conventions de l'établissement</h1>
                <div className='flex justify-between items-center'>
                    <div>
                        <p className='text-lg'>Liste des conventions signées</p>
                    </div>
                </div>
                {loading ? (
                    <Spinner/>
                ) : (
                    <TableauConventionsEtablissement data={offres} onDelete={deleteCandidature}/>
                )}
            </div>
        </div>
    );
}