import fs from "fs";
console.log("Deleting folder `dist` ...")
fs.rm("./dist", { force: true, recursive: true }, (err) => {
	if (err) {
		console.error("Error deleting dist\\n" + err);
		process.exit(1);
	}
});
