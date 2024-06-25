import React, { useState, useEffect } from "react";
import { HeaderEtablissement, Spinner,ProfileEta} from "../../components";
import { axiosInstance } from "../../util/axios";

export function ProfileEtablissement() {
	const [loading, setLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [data, setData] = useState({});
	async function getProfile() {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/users/profile", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				setData(response.data);
				setLoading(false);
				console.log(data);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	async function updateProfile(data) {
		try {
			setLoading(true);
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.put("/users/profile", data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.request.status === 200) {
				localStorage.setItem("user", JSON.stringify(response.data.user));
				getProfile();
				setLoading(false);
				setShowUpdate(true);
				console.log(data);
				setTimeout(() => setShowUpdate(false), 1000);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
			setShowError(true);
			setTimeout(() => setShowError(false), 1000);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<div className='min-h-screen pb-10'>
			<HeaderEtablissement></HeaderEtablissement>
			<ProfileEta data={data} onUpdate={(data) => updateProfile(data)} />
			{showError && (
				<div className='absolute left-1/2 top-1/2 transform -translate-x-1/2'>
					<p className='bg-rouge p-2 rounded-lg border border-rouge text-white'>
						{"Mot de passe incorrect"}
					</p>
				</div>
			)}
			{showUpdate && (
				<div className='absolute left-1/2 top-1/2 transform -translate-x-1/2'>
					<p className='bg-vertF p-2 rounded-lg border border-vertF text-white'>
						{"Mise à jour réussie"}
					</p>
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
