import PropTypes from "prop-types";
import { set, sub } from "date-fns";
import { noCase } from "change-case";
import { useState, useEffect } from "react";
import { FaBell, FaCheckCircle, FaClock, FaTag, FaUser } from "react-icons/fa";
import { fToNow } from "../util/formatTime";
import {
	Box,
	List,
	Badge,
	Button,
	Avatar,
	Tooltip,
	Divider,
	Popover,
	Typography,
	IconButton,
	ListSubheader,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { axiosInstance } from "../util/axios";

// const NOTIFICATIONS = [
// 	{
// 		id: "1",
// 		title: "Nouvelle offre disponible.",
// 		description: "KPMG vient de partager une nouvelle offre.",
// 		avatar: null,
// 		createdAt: set(new Date(), { hours: 10, minutes: 30 }),
// 		isUnRead: true,
// 	},
// 	{
// 		id: "2",
// 		title: "Candidature refusée.",
// 		description: "KPMG vient de partager une nouvelle offre.",
// 		avatar: null,
// 		createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
// 		isUnRead: true,
// 	},
// ];

export default function Notifications() {
	const [notifications, setNotifications] = useState([]);

	async function getNotifications() {
		try {
			let accessToken = localStorage.getItem("accessToken");
			const response = await axiosInstance.get("/notifications", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response);

			if (response.status === 200) {
				const dataNonLu = response.data.filter(
					(item) => item.statut === "non lu"
				);
				setNotifications(dataNonLu);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getNotifications();
	}, []);

	const totalUnRead = notifications.filter(
		(item) => item.statut === "non lu"
	).length;

	const [open, setOpen] = useState(null);

	const handleOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(null);
	};

	const handleMarkAllAsRead = () => {
		notifications.map(
			async (notification) => await handleMarkAsRead(notification._id)
		);
	};

	const handleMarkAsRead = async (id) => {
		try {
			let accessToken = localStorage.getItem("accessToken");
			console.log(accessToken);
			const response = await axiosInstance.put(
				"/notifications/" + id,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.request.status === 200) {
				getNotifications();
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<IconButton
				color={open ? "primary" : "default"}
				onClick={handleOpen}
				sx={{ width: 40, height: 40 }}
			>
				<Badge badgeContent={totalUnRead} color='error'>
					<FaBell color='465475' />
				</Badge>
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						mt: 1.5,
						ml: 0.75,
						width: 360,
					},
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant='subtitle1'>Notifications</Typography>
						<Typography variant='body2' sx={{ color: "text.secondary" }}>
							Vous avez {totalUnRead} messages non lus
						</Typography>
					</Box>

					{totalUnRead > 0 && (
						<Tooltip title=' Mark all as read'>
							<IconButton color='primary' onClick={handleMarkAllAsRead}>
								<FaCheckCircle />
							</IconButton>
						</Tooltip>
					)}
				</Box>

				<Divider sx={{ borderStyle: "dashed" }} />

				<List
					disablePadding
					subheader={
						<ListSubheader
							disableSticky
							sx={{ py: 1, px: 2.5, typography: "overline" }}
						>
							Nouveau
						</ListSubheader>
					}
				>
					{notifications.slice(0, 2).map((notification) => (
						<NotificationItem
							key={notification._id}
							notification={notification}
						/>
					))}
				</List>

				<Divider sx={{ borderStyle: "dashed" }} />

				<Box sx={{ p: 1 }}>
					<Button fullWidth disableRipple>
						Voir tout
					</Button>
				</Box>
			</Popover>
		</>
	);
}

NotificationItem.propTypes = {
	notification: PropTypes.shape({
		_id: PropTypes.string,
		type: PropTypes.string,
		contenu: PropTypes.string,
		date_creation: PropTypes.string,
		statut: PropTypes.string,
	}),
};

function NotificationItem({ notification }) {
	const { avatar, title } = renderContent(notification);

	const handleMarkAsRead = async (id) => {
		try {
			let accessToken = localStorage.getItem("accessToken");
			console.log(accessToken);
			const response = await axiosInstance.put(
				"/notifications/" + id,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			console.log(response);

			if (response.request.status === 200) {
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleNotificationClick = async (notification) => {
		await handleMarkAsRead(notification._id);
		window.location.href = notification.lien;
	};

	return (
		<ListItemButton
			onClick={() => handleNotificationClick(notification)}
			sx={{
				py: 1.5,
				px: 2.5,
				mt: "1px",
				...(notification.isUnRead && {
					bgcolor: "action.selected",
				}),
			}}
		>
			<ListItemAvatar>
				<Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={title}
				secondary={
					<Typography
						variant='caption'
						sx={{
							mt: 0.5,
							display: "flex",
							alignItems: "center",
							color: "text.disabled",
						}}
					>
						<FaClock className='mr-1' />
						{fToNow(notification.createdAt)}
					</Typography>
				}
			/>
		</ListItemButton>
	);
}

function renderContent(notification) {
	let avatar = notification.type;
	let title = notification.contenu;

	return { avatar, title };
}
