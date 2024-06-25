import React from "react";
import { useRef, useState } from "react";
import { axiosInstance } from "../util/axios";

export function Form() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();

	const [err, setErr] = useState("");

	async function addUser() {
		let firstName = firstNameRef.current.value;
		let lastName = lastNameRef.current.value;
		console.log(firstName, lastName);
		const user = {
			firstName,
			lastName,
		};
		const response = await axiosInstance.post("/add-user", user);
		console.log(response.data);

		firstNameRef.current.value = "";
		lastNameRef.current.value = "";
	}

	return (
		<div className='flex bg-[#9CC7FA] h-screen justify-center items-center'>
			<div className='flex flex-col justify-center items-center'>
				<div className='text-left flex flex-col'>
					<label
						htmlFor='badgeNumber'
						className='text-white font-bold mb-2 flex-initial'
					>
						First Name
					</label>
					<input
						id='badgeNumber'
						className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						type='text'
						ref={firstNameRef}
						onChange={() => {
							setErr("");
						}}
					/>
				</div>
				<div className='text-left flex flex-col mt-2'>
					<label
						htmlFor='password'
						className='text-white font-bold mb-2 flex-initial'
					>
						Last Name
					</label>
					<input
						id='password'
						className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						type='text'
						ref={lastNameRef}
						onChange={() => {
							setErr("");
						}}
					/>
					<h4 className='font-semibold text-md text-red-500 mt-2'>{err}</h4>
				</div>

				<button
					onClick={addUser}
					className='bg-[#496696] text-white font-bold py-2 px-4 mt-6 rounded w-48'
				>
					Add User
				</button>
			</div>
		</div>
	);
}
