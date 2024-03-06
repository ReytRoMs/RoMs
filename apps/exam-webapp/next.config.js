const { withGluestackUI } = require("@gluestack/ui-next-adapter");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.youtube.com",
				port: ""
			}
		]
	}
};

module.exports = withGluestackUI(nextConfig);
