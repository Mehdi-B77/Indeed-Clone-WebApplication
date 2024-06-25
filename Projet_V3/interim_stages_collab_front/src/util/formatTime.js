import {
	format,
	getTime,
	formatDistanceToNow,
	differenceInMilliseconds,
	differenceInCalendarDays,
	differenceInCalendarMonths,
	differenceInCalendarWeeks,
} from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
	const fm = newFormat || "dd MMM yyyy";

	return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date, newFormat) {
	const fm = newFormat || "dd MMM yyyy p";

	return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date) {
	return date ? getTime(new Date(date)) : "";
}

export function fToNow(date) {
	return date
		? formatDistanceToNow(new Date(date), {
				addSuffix: true,
		  })
		: "";
}

export function calculateDuration(startDate, endDate) {
	if (!startDate || !endDate) return "";

	const days = differenceInCalendarDays(new Date(endDate), new Date(startDate));

	let formattedDuration = "";

	if (days > 0) {
		if (formattedDuration !== "") formattedDuration += ", ";
		formattedDuration += `${days} jours`;
	}

	return formattedDuration.trim();
}

export function getCurrentDateTime(formatString) {
	const defaultFormat = "dd MMM yyyy HH:mm:ss"; // Format par défaut (exemple)
	const formattedDateTime = format(new Date(), formatString || defaultFormat);
	return formattedDateTime;
}
