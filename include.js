document.querySelectorAll("[data-include]")
	.forEach(e => {
		fetch(`/partials/${e.dataset.include}.html`)
			.then(res => res.text())
			.then(text => {
				e.outerHTML = text
			}).catch(err => {
				console.log(`ERROR WHILE FETCHING /partials/${e.dataset.include}.html\n` + err)
			})
	})