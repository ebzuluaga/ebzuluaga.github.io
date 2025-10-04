// I REALLY should just set up an SSG, I'm putting it off untill it's absolutely
// necessary, please don't judge me

function toggleLorem() {
	const lorem = document.querySelector("#lorem-ipsum")
	lorem && ( lorem.hidden = !lorem.hidden )
}