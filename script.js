// I REALLY should just set up an SSG, I'm putting it off untill it's absolutely
// necessary, please don't judge me

function initialize_navbar() {
	const content = `
		<div class="left">
			<div class="logo animate"></div>
			<div class="nav-link animate"><a href="#">BTN_1</a></div>
			<div class="nav-link animate"><a href="#">BTN_2</a></div>
			<div class="nav-link animate"><a href="#">BTN_3</a></div>
		</div>
		<div class="right">
			<div class="nav-link animate"><a href="/index.html">Homepage</a></div>
			<div class="nav-link animate"><a href="/boxes.html">Box</a></div>
			<div class="nav-link animate"><a href="/colors.html">Colors</a></div>
			<div class="nav-link animate"><a href="#">Foo</a></div>
		</div>`
	document.querySelector("#top-nav-bar").innerHTML = content
}
function initialize_footer() {
	document.querySelector("#footer").innerHTML =(
		`Made by <a href="https://github.com/ebzuluaga">Esteban Beodya</a>`)
}
initialize_navbar()
initialize_footer()