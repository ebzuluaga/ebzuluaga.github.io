document.querySelectorAll("[data-include]").forEach(e => {
	const url = `/partials/${e.dataset.include}.html`
	fetch(url)
		.then(res => res.text())
		.then(text => {
			e.outerHTML = text
		}).catch(err => {
			console.log(`ERROR WHILE FETCHING ${url}\n` + err)
		})
})