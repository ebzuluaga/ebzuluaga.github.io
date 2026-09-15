function createBoxes() {
	let str = "";
	const colors = ["mint", "sky", "violet", "mandarin", "pink"];
	for (c of colors) {
		str += `<div id="box_a" class="item animate" color="${c}"><p>${c.replace(c[0], c[0].toUpperCase())}</p></div>\n`;
	}
	document.querySelector("#boxes-container").innerHTML = str;
}
createBoxes();