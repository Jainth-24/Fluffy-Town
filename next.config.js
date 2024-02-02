/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true
	},
	images: {
		dangerouslyAllowSVG: true,
		domains: ['cdn.shopify.com', 'www.netlify.com'],
	},
};

module.exports = nextConfig;
	