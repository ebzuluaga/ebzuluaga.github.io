console.log("hello from js!");
document.querySelector("#output")
if ("storage" in navigator && "estimate" in navigator.storage) {
	navigator.storage.estimate().then(({ quota, usage, usageDetails }) => {
		const quotaMB = (quota / 1024 / 1024).toFixed(2);
		const usageMB = (usage / 1024 / 1024).toFixed(2);

		output.innerText = `Estimated Quota: ${quotaMB} MB \nEstimated Usage: ${usageMB} MB`;
		if (usageDetails) {
			output.innerText += `\nIndexedDB Specific Usage: ${(usageDetails.indexedDB / 1024 / 1024).toFixed(2)} MB`;
		}
	});
} else {
	output.innerText =
		"Storage Estimation API is not supported in this browser.";
}
