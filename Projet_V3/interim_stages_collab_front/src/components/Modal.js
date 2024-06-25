import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { Stack, MenuItem, IconButton, Popover } from "@mui/material";

import esi from "../assets/logo_esi.png";
import { FaEllipsisV, FaShareSquare, FaTrashAlt } from "react-icons/fa";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function Modal({ onShare }) {
	const MENU_OPTIONS = [
		{
			label: "Partager",
			icon: FaShareSquare,
			onClick: onShare,
		},
		{
			label: "Supprimer",
			icon: FaTrashAlt,
			onClick: () => {},
		},
	];

	const [open, setOpen] = useState(null);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = (event) => {
		event.stopPropagation();
		setOpen(null);
	};

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<IconButton
				onClick={handleOpen}
				sx={{
					p: 0,
					...(open && {
						"&:before": {
							zIndex: 1,
							content: "''",
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							position: "absolute",
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
						},
					}),
				}}
			>
				<FaEllipsisV color='#465475' size={15} />
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						p: 0,
						mt: 1.5,
						ml: 0.75,
						width: 180,
						"& .MuiMenuItem-root": {
							typography: "body2",
							borderRadius: 0.75,
						},
					},
				}}
			>
				<Stack sx={{ p: 1 }}>
					{MENU_OPTIONS.map((option) => (
						<MenuItem
							key={option.label}
							onClick={(e) => {
								handleClose(e);
								option.onClick();
							}}
						>
							<Stack direction='row' alignItems='center'>
								<option.icon size={16} style={{ marginRight: 8 }} />
								{option.label}
							</Stack>
						</MenuItem>
					))}
				</Stack>
			</Popover>
		</div>
	);
}
