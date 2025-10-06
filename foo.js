const text = ()=>(`window.devicePixelRatio: ${window.devicePixelRatio}

/* BODY */
document.documentElement.clientHeight: ${document.documentElement.clientHeight}
document.documentElement.clientWidth: ${document.documentElement.clientWidth}

/* LAYOUT VIEWPORT */
window.innerHeight: ${window.innerHeight}
window.innerWidth: ${window.innerWidth}

/* VISUAL VIEWPORT */
window.outerHeight: ${window.outerHeight}
window.outerWidth: ${window.outerWidth}
`)

function set_text () {
	document.getElementById('disp').textContent = text()
	// console.log("updating...")
}
setInterval(set_text, 500)