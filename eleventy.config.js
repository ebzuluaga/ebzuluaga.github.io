export default function (eleventyConfig) {
	// set better directory names for source and destination
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("dist");

	// copy necessary non-template files
	eleventyConfig.addPassthroughCopy({ "src/public": "/" });

	eleventyConfig.addGlobalData("layout", "base");
}
export const config = {
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};
