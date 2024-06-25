import React from "react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../util/axios";
import { FaTrashAlt } from "react-icons/fa";

export function List() {
	const [list, setList] = useState([]);

	async function getUsers() {
		const response = await axiosInstance.get("/get-users");
		console.log(response.data);
		setList(response.data);
	}

	async function deleteUser(userId) {
		await axiosInstance.delete(`/users/${userId}`);
		console.log("done");
		setList((list) => list.filter((user) => user._id !== userId));
	}

	useEffect(() => {
		getUsers();
	}, [list]);

	return (
		<div className='flex bg-[#c8ad7f] h-screen justify-center items-center'>
			<table className='w-2/3 divide-y divide-gray-200'>
				<thead>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							FirstName
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
							LastName
						</th>
					</tr>
				</thead>
				<tbody className=' divide-y divide-gray-200'>
					{list.map((user, index) => (
						<tr key={index}>
							<td className='px-6 py-4 whitespace-nowrap'>{user.firstName}</td>
							<td className='px-6 py-4 whitespace-nowrap'>{user.lastName}</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<FaTrashAlt
									className='cursor-pointer'
									onClick={() => deleteUser(user._id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
