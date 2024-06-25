import React, { useState, useEffect } from "react";
import {
    FaEllipsisV,
    FaDollarSign,
    FaStar,
    FaBookmark,
    FaHeart,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { TiTime } from "react-icons/ti";
import { ButtonRond } from "./ButtonRond";
import { ButtonCarre } from "./ButtonCarre";
import esi from "../assets/logo_esi.png";
import { Modal } from "./Modal";
import {
    fDate,
    fToNow,
    getCurrentDateTime,
    calculateDuration,
} from "../util/formatTime";
import { axiosInstance } from "../util/axios";
import { PartagerOffre } from "./PartagerOffre";
import { ShareButtons } from "./ShareButtons";

export function CadreFocus({ Offre }) {
    console.log("CadreFocus:Offre:" + Offre);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [showMessage, setShowMessage] = useState(false);
    const [showPartageTab, setShowPartageTab] = useState(false);
    const [message, setMessage] = useState("");
    const [isFavorite, setIsFavorite] = useState(
        user ? (user.favoris ? user.favoris.includes(Offre?._id) : false) : false
    );
    const [isSaved, setIsSaved] = useState(
        user
            ? user.enregistrements
                ? user.enregistrements.includes(Offre?._id)
                : false
            : false
    );

    useEffect(() => {
        const updatedUser = {
            ...user,
            enregistrements: user ? user.enregistrements : [],
            favoris: user ? user.favoris : [],
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
    }, [isSaved, isFavorite]);

    async function saveOffre() {
        try {
            let accessToken = localStorage.getItem("accessToken");
            const response = await axiosInstance.post(
                "/offres/chercheur/save",
                { id: Offre?._id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response);

            if (response.status === 200) {
                setMessage(response.data.message);
                setUser({ ...user, enregistrements: response.data.enregistrements });
                setIsSaved(!isSaved);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 1000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function likeOffre() {
        try {
            let accessToken = localStorage.getItem("accessToken");
            const response = await axiosInstance.post(
                "/offres/chercheur/like",
                { id: Offre?._id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response);

            if (response.status === 200) {
                setMessage(response.data.message);
                setUser({ ...user, favoris: response.data.favoris });
                setIsFavorite(!isFavorite);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 1000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function partagerOffreDansGroupe(id_groupe, offre) {
        try {
            let accessToken = localStorage.getItem("accessToken");
            const response = await axiosInstance.post(
                "/users/chercheur/partagerOffreDansGroupe",
                { id_groupe, offre },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response);

            if (response.status === 200) {
                setMessage(response.data.message);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 1000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function partagerOffreAvecAmi(id_ami, offre) {
        try {
            let accessToken = localStorage.getItem("accessToken");
            const response = await axiosInstance.post(
                "/users/chercheur/partagerAmi",
                { id_ami, offre },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response);

            if (response.status === 200) {
                setMessage(response.data.message);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 1000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const toggleFavorite = () => {
        likeOffre();
    };

    const toggleSaved = () => {
        saveOffre();
    };

    const redirect = () => {
        window.location.href = "/offres/" + (Offre?._id || "") +"/postuler";
    };

    const [urlOffres, setUrlOffres] = useState("");
    async function getUrlOffres() {
        try {
            const response = await axiosInstance.get("/services/offres");
            if (response.status === 200) {
                console.log(response.data);
                setUrlOffres(response.data);
            } else {
                setUrlOffres("/");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const [urlAuth, setUrlAuth] = useState("");
    async function getUrlAuth() {
        try {
            const response = await axiosInstance.get("/services/auth");
            if (response.status === 200) {
                console.log(response.data);
                setUrlAuth(response.data);
            } else {
                setUrlAuth("/");
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUrlOffres();
        getUrlAuth();
    }, []);

    return (
        <div className='bg-white rounded-lg border-2 border-bleuF h-300'>
            { Offre && Offre.employeur && Offre.employeur.image ? (
            <>
            <div className='flex px-4 py-2  rounded-lg'>
                {Offre && Offre.employeur && Offre.employeur.image && (
                    <img
                        className='rounded-full w-12 h-12'
                        src={urlAuth + Offre.employeur.image}
                        alt='logo'
                    />
                )}
                <div className='ml-4'>
                    <p
                        className='text-bleuF font-bold cursor-pointer'
                        onClick={() => window.open(Offre?.employeur?.site_web, "_blank")}
                    >
                        {Offre?.employeur?.entreprise}
                    </p>
                    <p className='text-bleuF'>{fDate(Offre?.date)}</p>
                </div>
                <div className='ml-auto my-auto'>
                    <Modal onShare={() => setShowPartageTab(true)} />
                </div>
                {showMessage && (
                    <div className='fixed left-1/2 top-1/2 transform -translate-x-1/2'>
                        <p className='bg-bleuF p-2 rounded-lg border border-bleuF text-white'>
                            {message}
                        </p>
                    </div>
                )}
            </div>
            <div>
                {Offre && Offre.image && (
                    <img
                        className='w-full h-48 bg-white'
                        src={Offre.image ? urlOffres + Offre.image : esi}
                        alt='image'
                    />
                )}
            </div>
            <div className='w-full px-4 '>
                <div className='flex justify-between mt-1'>
                    <div className='cursor-pointer' onClick={toggleFavorite}>
                        <FaHeart color={isFavorite ? "#FF584D" : "gray"} size={20} />
                    </div>
                    <div className='cursor-pointer' onClick={toggleSaved}>
                        <FaBookmark color={isSaved ? "#465475" : "gray"} size={20} />
                    </div>
                </div>

                <p className='text-bleuF font-bold'>{Offre?.titre}</p>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <MdLocationOn color='#465475' />
                        <p className='text-bleuF'>{Offre?.lieu ? Offre.lieu : "Montpellier"}</p>
                    </div>
                    <div className='flex items-center'>
                        <FaDollarSign color='#465475' />
                        <p className='text-bleuF'>{Offre?.remuneration}</p>
                    </div>
                    <div className='flex items-center'>
                        <TiTime size={20} color='#465475' />
                        <p className='text-bleuF ml-1'>
                            {calculateDuration(Offre?.debut, Offre?.fin)}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <p className='mx-4 my-4 text-sm text-bleuF max-h-20 '>
                    {Offre?.description}{" "}
                </p>

                <div className='flex justify-between m-4 h-10'>
                </div>
            </div>


            <div className='flex justify-between m-4 h-10'>
                <ShareButtons url={"esi.dz"} title='' description={""} />
                <ButtonCarre
                    couleur={"rouge"}
                    couleurTexte={"violet"}
                    contenu={"Candidater"}
                    width={"fit"}
                    height={"h-8"}
                    onclick={redirect}
                ></ButtonCarre>
            </div>

            {showPartageTab && (
                <PartagerOffre
                    offre={Offre}
                    onGroupeShare={partagerOffreDansGroupe}
                    onFriendShare={partagerOffreAvecAmi}
                    onDismiss={() => setShowPartageTab(false)}
                />
            )}
            </>
    ) : (
        <h1 className={`p-3`}>Veuillez sélectionner une offre pour l'afficher complètement ici</h1>
    )}
        </div>
    );
}
