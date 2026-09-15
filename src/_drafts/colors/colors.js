const chars = "0123456789ABCDEF".split("");
const colors = [];
chars.forEach((e) => {
	chars.forEach((ee) => {
		chars.forEach((eee) => {
			colors.push("" + e + ee + eee);
		});
	});
});
document.querySelector("#colors-container").innerHTML = colors.reduce(
	(str, color) => {
		return (
			str +
			`<div style="display:inline-block; width:16px; height:16px; background-color:#${color}"></div>`
		);
	},
	"",
);