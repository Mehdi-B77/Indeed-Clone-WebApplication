import {
	MapContainer,
	TileLayer,
	Popup,
	Marker,
	ScaleControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ButtonCarre } from "./ButtonCarre";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export function Map({ data, onDismiss }) {
	let point;

	if (data.latitude && data.longitude) {
		point = [data.longitude, data.latitude];
	} else {
		point = [43.62505, 3.862038];
	}

	return (
		<div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col items-center z-50 justify-center space-y-2'>
			<div className='col-span-2 overflow-hidden bg-gray-50 gap-4 w-1/2 h-1/2 rounded-md shadow hover:shadow-lg border-solid border-2'>
				<MapContainer
					center={point}
					zoom={16}
					scrollWheelZoom={false}
					style={{ height: "100%", width: "100%" }}
				>
					<ScaleControl />
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Marker position={point}>
						<Popup offset={new L.point(12, 10)}>{JSON.stringify(point)}</Popup>
					</Marker>
				</MapContainer>
			</div>
			<div className='flex justify-between'>
				<ButtonCarre
					couleur={"bleuF"}
					couleurTexte={"violet"}
					contenu={"Fermer"}
					width={"fit text-xs"}
					height={"fit"}
					onclick={onDismiss}
				></ButtonCarre>
			</div>
		</div>
	);
}
