import React, { useState, useRef } from "react";
import { ButtonCarre } from "./ButtonCarre";
import { Spinner } from "./Spinner";

export function PasswordForm({ onConfirm, onDismiss }) {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleConfirm = async () => {
		try {
			setLoading(true);

			await onConfirm({ oldPassword: oldPassword, newPassword: newPassword });
			setLoading(false);
			onDismiss();
		} catch (error) {
			console.error("Confirmation error:", error);
			setLoading(false);
		}
	};

	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
			{!loading && (
				<div className=' w-1/2 h-fit bg-white p-4 rounded-md space-y-4'>
					<div className='space-y-2'>
						<p className='text-lg font-bold text-bleuF'>Ancien mot de passe</p>

						<div>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='1'
								onChange={(e) => setOldPassword(e.target.value)}
							></textarea>
						</div>
					</div>
					<div className='space-y-2'>
						<p className='text-lg font-bold text-bleuF'>Nouveau mot de passe</p>

						<div>
							<textarea
								className='w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
								rows='1'
								onChange={(e) => setNewPassword(e.target.value)}
							></textarea>
						</div>
					</div>
					<div className='flex justify-end space-x-2'>
						<ButtonCarre
							couleur={"bleuF"}
							couleurTexte={"violet"}
							contenu={"Annuler"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={onDismiss}
						></ButtonCarre>
						<ButtonCarre
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Modifier"}
							width={"fit text-xs"}
							height={"fit"}
							onclick={handleConfirm}
						></ButtonCarre>
					</div>
				</div>
			)}
			{loading && <Spinner />}
		</div>
	);
}
