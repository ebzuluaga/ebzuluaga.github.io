import fs from "fs";

export default function (eleventyConfig) {
	// set better directory names for source and destination
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("dist");

	// add css as a format so css files get copied over to their respective folders (otherwise they'd have to put them in the _public directory)
	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addTemplateFormats("js");

	// ignore template files. relative to project's root
	eleventyConfig.ignores.add("src/_drafts/");
	eleventyConfig.ignores.add("src/_public/");
	eleventyConfig.ignores.add("src/**/_*");

	// the key is the directory to copy, relative to the root of the project
	// the value where it is put relative to the output directory
	eleventyConfig.addPassthroughCopy({ "src/_public/": "/" });

	// shortcodes for automatically detecting page's stylesheets & scripts
	eleventyConfig.addShortcode("auto_css", function (filePathStem) {
		if (fs.existsSync(`./src${filePathStem}.css`)) {
			return `<link rel="stylesheet" href="${filePathStem}.css">`;
		}
		return "";
	});
	eleventyConfig.addShortcode("auto_js", function (filePathStem) {
		if (fs.existsSync(`./src${filePathStem}.js`)) {
			return `<script defer src="${filePathStem}.js"></script>`;
		}
		return "";
	});
}

export const config = {
	// use nunjucks instead of liquid to process html and md files
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};
