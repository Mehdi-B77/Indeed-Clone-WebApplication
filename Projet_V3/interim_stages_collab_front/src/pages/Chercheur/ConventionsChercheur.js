import React, { useState, useEffect } from "react";
import {
    HeaderChercheur,
    NavBarChercheur,
    
    Spinner,
} from "../../components";
import {TableauConventionsChercheur} from "../../components/TableauConventionsChercheur";

import { axiosInstance } from "../../util/axios";

export function ConventionsChercheur() {
    let [offres, setOffres] = useState([]);
    let [loading, setLoading] = useState(false);
    let [vide, setVide] = useState(false);
    let [idOffre, setIdOffre] = useState(null);


	async function deleteCandidature(id) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/conventions/chercheur/annule",
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.request.status === 200) {
				setLoading(false);
				window.location.href = "/chercheur/conventions";
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
			const response = await axiosInstance.get("/conventions/chercheur", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
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

    return (
        <div>
            <HeaderChercheur/>

            <div className='mx-10'>
                <h1 className='text-2xl font-bold my-4'>Mes conventions</h1>
                <div className='flex justify-between items-center'>
                    <div>
                        <p className='text-lg'>Liste des conventions signées</p>
                    </div>
                </div>
                {loading ? (
                    <Spinner/>
                ) : (
                    <TableauConventionsChercheur data={offres} onDelete={deleteCandidature}/>
                )}
            </div>
        </div>
    );
}