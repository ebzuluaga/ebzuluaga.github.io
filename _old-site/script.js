function toggleLorem() {
	const lorem = document.querySelector("#lorem-ipsum")
	if (lorem) { lorem.hidden = !lorem.hidden }
}
function print_viewport() {
	console.log("%O", window.visualViewport)
}