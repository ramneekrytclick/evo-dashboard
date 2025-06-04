/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"localhost",
			"evo-backend-new.onrender.com",
			"backend.evoskillgrowth.com",
		],
	},
	reactStrictMode: false,
};

module.exports = nextConfig;
