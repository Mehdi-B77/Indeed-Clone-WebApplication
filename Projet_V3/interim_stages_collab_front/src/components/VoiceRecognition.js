import React from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import { FaTimesCircle } from "react-icons/fa";
import { ButtonRond } from "./ButtonRond";
import { FaMicrophone, FaMicrophoneSlash, FaRedo } from "react-icons/fa";

export const VoiceRecognition = ({ onClose, onConfirm }) => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	const handleConfirm = (transcript) => {
		onClose();
		onConfirm(transcript);
	};

	return (
		<div>
			<div
				className={`fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 block`}
			/>
			<div className='fixed z-50 overlay flex flex-col items-center p-4 w-1/4 h-fit bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
				<div className='flex justify-between w-full mb-6'>
					<h1 className='text-xl text-bleuF font-bold'>Recherche vocale</h1>
					<FaTimesCircle className='cursor-pointer text-bleuF' onClick={onClose} />
				</div>

				<div className='flex justify-between items-center w-full'>
					<div className='flex items-center'>
						<input
							className='bg-violet border border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500'
							type='text'
							disabled={true}
							value={transcript}
						></input>
					</div>
					<div className='flex items-center'>
						{listening ? (
							<button
								onClick={SpeechRecognition.stopListening}
								className='flex items-center bg-rouge text-violet px-2 py-1 rounded-lg w-8 h-8 hover:filter hover:brightness-90 transition-all duration-300'
							>
								<div>
									<FaMicrophone />
								</div>{" "}
							</button>
						) : (
							<button
								onClick={() =>
									SpeechRecognition.startListening({ language: "fr-FR" })
								}
								className='flex items-center bg-vertF text-violet px-2 py-1 rounded-lg w-8 h-8 hover:filter hover:brightness-90 transition-all duration-300'
							>
								<div>
									<FaMicrophoneSlash />
								</div>{" "}
							</button>
						)}
					</div>
					<div className='flex items-center'>
						<button
							className='flex items-center justify-center bg-rouge p-1 rounded-lg w-8 h-8 hover:filter hover:brightness-90 transition-all duration-300'
							onClick={resetTranscript}
						>
							{" "}
							<FaRedo color='EEEDFF' />
						</button>
					</div>
				</div>
				<div className='w-full mt-4'>
					<div className='flex justify-end'>
						<ButtonRond
							couleur={"rouge"}
							couleurTexte={"violet"}
							contenu={"Lancer la recherche"}
							width={"full"}
							height={"fit"}
							onClick={() => handleConfirm(transcript)}
						></ButtonRond>
					</div>
				</div>
			</div>
		</div>
	);
};
