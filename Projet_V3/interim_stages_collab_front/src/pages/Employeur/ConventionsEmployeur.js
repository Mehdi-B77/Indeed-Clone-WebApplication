import React, { useState, useEffect } from "react";
import {
    Footer,
    HeaderEmployeur,
    NavBarEmployeur,
    Spinner,
} from "../../components";
import { TableauConventionEmployeur ,} from "../../components/TableauConventionEmployeur";

import { axiosInstance } from "../../util/axios";

export function ConventionsEmployeur() {
    let [offres, setOffres] = useState([]);
    let [loading, setLoading] = useState(false);
    let [vide, setVide] = useState(false);
    let [idOffre, setIdOffre] = useState(null);


	async function deleteCandidature(id) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.post(
				"/conventions/employeur/annule",
				{ id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.request.status === 200) {
				setLoading(false);
				window.location.href = "/employeur/conventions";
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
			const response = await axiosInstance.get("/conventions/employeur", {
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
        console.log(offres)

    }, []);
    return (
        <div>
            <HeaderEmployeur/>
            <div className='min-h-screen flex flex-col'>
                <h1 className='text-2xl font-bold my-4'>Mes conventions</h1>
                <div className='flex justify-between items-center'>
                    <div>
                        <p className='text-lg'>Liste des conventions signées</p>
                    </div>
                </div>
                {loading ? (
                    <Spinner/>
                ) : (
                    <TableauConventionEmployeur data={offres} onDelete={deleteCandidature}/>
                )}
            </div>
            <Footer />
        </div>
    );
}