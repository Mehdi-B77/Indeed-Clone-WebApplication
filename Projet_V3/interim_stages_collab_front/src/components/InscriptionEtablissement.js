import React, {useState, useRef} from "react";
import {ButtonRond} from "./ButtonRond";
import {FaTimesCircle, FaPlus, FaPlusCircle, FaPlusSquare} from "react-icons/fa";
import {axiosInstance} from "../util/axios";
import {Spinner} from "./Spinner";
import {InscriptionConfirmation} from "./InscriptionConfirmation";
import {ButtonCarre} from "./ButtonCarre";

export function InscriptionEtablissement({onPass}) {
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [etablissementError, setEtablissementError] = useState("");

    function validateForm() {
        let isValid = true;

        if (formData.email.trim() === "") {
            setEmailError("Email est requis");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (formData.password.trim() === "") {
            setPasswordError("Mot de passe est requis");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (formData.nom.trim() === "") {
            setEtablissementError("Nom de l'établissement est requis");
            isValid = false;
        } else {
            setEtablissementError("");
        }
        return isValid;
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        nom: "",
        type: "",
        numero: "",
        adresse: {
            rue: "",
            ville: "",
        },
        contacts: [{nom: "", email: "", numero: ""}],
    });

    const inputRefs = {
        email: useRef(),
        password: useRef(),
        nom: useRef(),
        type: useRef(),
        numero: useRef(),
        adresse: {
            rue: useRef(),
            ville: useRef(),
        },
        contacts: [
            {
                nom: useRef(),
                email: useRef(),
                numero: useRef(),
            },
        ],
    };

    async function register() {


        const response = await axiosInstance.post(
            `/auth/register/etablissement`,
            formData
        );

        if (response.request.status === 200) {
            console.log(response.data);
        }
    }

    async function sendCode() {
        const email = formData.email;
        const response = await axiosInstance.post(`/auth/code`, {email});

        if (response.request.status === 200) {
            console.log(response.data);
        }
    }

    function handleInputChange(event, field, nestedField) {
        const value = event.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: nestedField
                ? {
                    ...prevFormData[field],
                    [nestedField]: value,
                }
                : value,
        }));
    }

    function handleContactChange(event, index, field) {
        const value = event.target.value;
        setFormData((prevFormData) => {
            const newContacts = [...prevFormData.contacts];
            newContacts[index] = {
                ...newContacts[index],
                [field]: value,
            };
            return {
                ...prevFormData,
                contacts: newContacts,
            };
        });
    }

    function addContact() {
        setFormData((prevFormData) => ({
            ...prevFormData,
            contacts: [
                ...prevFormData.contacts,
                {
                    nom: "",
                    email: "",
                    numero: "",
                },
            ],
        }));
    }

    function removeContact(index) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            contacts: prevFormData.contacts.filter((_, i) => i !== index),
        }));
    }

    function handleClick() {
        console.log(formData);
        const isValid = validateForm();

        if (isValid) {
            setLoading(true);
            sendCode();
            setTimeout(() => {
                setLoading(false);
                setShowConfirmation(true);
            }, 1000);
        }
    }

    return (
        <div className='flex justify-center items-center w-full pt-4 pb-4'>
            {!showConfirmation && (
                <div className=''>
                    <h1 className='text-xl text-bleuF font-bold mb-6 text-center'>Création de compte etablissement</h1>
                    <div className={`border-2 border-bleuF pl-3 pr-3 pt-4 rounded-lg`}>
                        {/* Informations de base */}
                        <h2 className="text-lg font-semibold  text-bleuF  mb-4">Informations de base :</h2>
                        <div className='border-b border-gray-300 mb-8 pb-4'>
                            <div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
                                <div className='flex flex-col'>
                                    <label className='text-bleuF text-xs font-bold'>
                                        Email <span className='text-rouge'>*</span>
                                    </label>
                                    <input
                                        className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                        type='email'
                                        ref={inputRefs.email}
                                        onChange={(e) => handleInputChange(e, "email")}
                                        onFocus={() => setEmailError("")}
                                    ></input>
                                    <p className='text-rouge text-xs'>{emailError}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-bleuF text-xs font-bold'>
                                        Mot de passe <span className='text-rouge'>*</span>
                                    </label>
                                    <input
                                        className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                        type='password'
                                        ref={inputRefs.password}
                                        onChange={(e) => handleInputChange(e, "password")}
                                        onFocus={() => setPasswordError("")}
                                    ></input>
                                    <p className='text-rouge text-xs'>{passwordError}</p>
                                </div>
                            </div>
                        </div>
						{/* Informations de l'etablissement */}
						<h2 className="text-lg font-semibold  text-bleuF  mb-4">Informations de l'établissement :</h2>
						<div className='border-b border-gray-300 mb-8 pb-4'>
                        <div className='grid grid-cols-3 gap-8 mx-4 mb-4'>
                            <div className='flex flex-col'>
                                <label className='text-bleuF text-xs font-bold'>
                                    Nom de l'etablissement{" "}
                                    <span className='text-rouge'>*</span>
                                </label>
                                <input
                                    className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                    type='text'
                                    ref={inputRefs.nom}
                                    onChange={(e) => handleInputChange(e, "nom")}
                                    onFocus={() => setEtablissementError("")}
                                ></input>
                                <p className='text-rouge text-xs'>{etablissementError}</p>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-bleuF text-xs font-bold'>Type</label>
                                <input
                                    className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                    type='text'
                                    ref={inputRefs.type}
                                    onChange={(e) => handleInputChange(e, "type")}
                                ></input>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-bleuF text-xs font-bold'>Numero</label>
                                <input
                                    className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                    type='text'
                                    ref={inputRefs.numero}
                                    onChange={(e) => handleInputChange(e, "numero")}
                                ></input>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-bleuF text-xs font-bold'>Ville</label>
                                <input
                                    className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                    type='text'
                                    ref={inputRefs.adresse.ville}
                                    onChange={(e) => handleInputChange(e, "adresse", "ville")}
                                ></input>
                            </div>
                        </div>
						</div>
						{/* Contacts */}
						<div className='border-gray-300 mb-8 pb-4'>
                        <div className='flex space-x-4'>
                            <p className='text-lg font-semibold  text-bleuF  mb-4'>Contacts</p>
                            <button
                                className='flex justify-center items-center bg-rouge text-bleuF w-6 h-6 rounded-full'
                                onClick={addContact}
                            >
                                <FaPlusSquare
                                    className='text-white w-4 h-4'
                                    title={"Ajouter un contact"}

                                />
                            </button>
                        </div>

                        {formData.contacts.map((contact, index) => (
                            <div key={index} className='grid grid-cols-7 gap-8 mx-4 mb-4'>
                                <div className='flex flex-col col-span-2'>
                                    <label className='text-bleuF text-xs font-bold'>Nom</label>
                                    <input
                                        className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                        type='text'
                                        value={contact.nom}
                                        onChange={(e) => handleContactChange(e, index, "nom")}
                                    ></input>
                                </div>
                                <div className='flex flex-col col-span-2'>
                                    <label className='text-bleuF text-xs font-bold'>Email</label>
                                    <input
                                        className=' bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                        type='email'
                                        value={contact.email}
                                        onChange={(e) => handleContactChange(e, index, "email")}
                                    ></input>
                                </div>
                                <div className='flex flex-col col-span-2'>
                                    <label className='text-bleuF text-xs font-bold'>Numero</label>
                                    <input
                                        className=' bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
                                        type='tel'
                                        value={contact.numero}
                                        onChange={(e) => handleContactChange(e, index, "numero")}
                                    ></input>
                                </div>

                                {index > 0 && (
                                    <div className='flex items-center justify-center'>
                                        <p
                                            className='text-rouge cursor-pointer underline text-sm'
                                            onClick={() => removeContact(index)}
                                        >
                                            Supprimer
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
						</div>
                    </div>
                    <div className='flex justify-center mr-4 pt-4'>
                        <ButtonCarre
                            couleur={"rouge"}
                            couleurTexte={"violet"}
                            contenu={"Continuer"}
                            width={"w-26"}
                            height={"fit"}
                            onclick={handleClick}
                        ></ButtonCarre>
                    </div>
                </div>
            )}

            {loading && <Spinner/>}

            {showConfirmation && (
                <InscriptionConfirmation data={formData.email} onConfirm={register}/>
            )}
        </div>
    );
}