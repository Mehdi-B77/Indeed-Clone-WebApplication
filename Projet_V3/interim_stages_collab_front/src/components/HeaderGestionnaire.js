import React, { useState } from "react";
import esi from "../assets/logo_esi.png";
import { FaBell } from "react-icons/fa";
import Notifications from "./Notifications";
import Compte from "./Compte";
import {Link, NavLink, useLocation} from "react-router-dom";
import {
	Box,
	Divider,
	Typography,
	Stack,
	MenuItem,
	Avatar,
	IconButton,
	Popover,
} from "@mui/material";
export function HeaderGestionnaire({}) {
	const redirect = () => {
		window.location.href="/";
	}

	const location = useLocation();
	const deconnexion = () => {
		window.location.href = "/";
		localStorage.clear();

	};
	// Function to check if the route matches the given path
	const isRouteActive = (path) => {
		return location.pathname === path;
	};
	return (
		<div className='py-4 bg-bleuF'>
			<div className='flex mx-10 items-center justify-between'>
				<h1 className='text-2xl font-bold text-violet' onClick={redirect}>
					Stages - Gestionnaire
				</h1>
				<nav>
				<MenuItem onClick={deconnexion} sx={{ m: 1 }}>
					Déconnexion
				</MenuItem>

				</nav>
			</div>
		</div>
	);
}
