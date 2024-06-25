import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);

export const Agenda = ({ data }) => {
	console.log(data);
	return (
		<div>
			<Calendar
				localizer={localizer}
				events={data}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 1000 }}
			/>
		</div>
	);
};
