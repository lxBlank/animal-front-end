function funcformateDate2(dateString) {
	dateString = parseInt(dateString);
	let date = new Date(dateString);
	let formatStr = dateUtils.dateFormat('YYYY年mm月dd日 HH:MM:SS', date);
	return formatStr;
}

function funcformateDate2(dateString) {
	dateString = parseInt(dateString) * 1000;
	let date = new Date(dateString);
	let formatStr = dateUtils.dateFormat('HH:MM:SS', date);
	return formatStr;
}