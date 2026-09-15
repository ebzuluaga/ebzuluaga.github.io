import fs from "fs";
import path from "path";
export default function (eleventyConfig) {
	// set better directory names for source and destination
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("dist");

	// copy necessary non-template files
	eleventyConfig.addPassthroughCopy({ "src/public": "/" });
	eleventyConfig.addPassthroughCopy("src/**/*.(css|js)");

	eleventyConfig.addGlobalData("layout", "base");

	eleventyConfig.addFilter("find_globals", (page, extension) => {
		// inputPath = ./currently/my/current/page/myFile.md
		let custom_styles = [];
		function find_styles_recursive(path) {
			const parent = path.dirname(path)
			const stylesheet = path.join(parent, path.basename(parent) + '.css')
			if (fs.existsSync(stylesheet)) {
				custom_styles.unshift(stylesheet);
			}
			find_styles_recursive(parent)
		}
		const file = page.inputPath?.replace(/([^\.]*)$/, "css");
		return fs.existsSync(file) ? file : false;
	})
	eleventyConfig.addFilter("get_custom_styles", (page) => {
		const file = page.inputPath?.replace(/([^\.]*)$/, "css");
		return fs.existsSync(file) ? file : false;
	});
	eleventyConfig.addFilter("get_custom_scripts", (page) => {
		const file = page.inputPath?.replace(/([^\.]*)$/, "js");
		return fs.existsSync(file) ? file : false;
	});
}

export const config = {
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};
