

export default {
	secondsToTime(seconds) {
		const hour = Math.floor(seconds / 3600);
		const min = Math.floor((seconds % 3600) / 60);
		const second = Math.floor((seconds % 3600) % 60);
		return (hour > 0 ?(hour <= 9 ? "0" + hour : hour) + ":" : "") + (min <= 9 ? "0" + min : min) + ":" + (second <= 9 ? "0" + second : second);
	},
	timeToSeconds(time) {
		let seconds = 0;
		const parts = time.split(":", 3);
		for (let x = 0; x < parts.length; x++) {
			seconds += (parseInt(parts[x]) || 0) * Math.pow(60, parts.length - x - 1);
		}
		return seconds;
	}
};
