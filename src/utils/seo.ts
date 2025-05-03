// utils/seo.ts
import { Metadata } from "next";

type SEOParams = {
	title: string;
	description: string;
	pathname?: string;
	image?: {
		url: string;
		width?: number;
		height?: number;
		alt?: string;
	};
	keywords?: string[];
};

export function generateSEOMetadata({
	title,
	description,
	pathname = "/",
	image = {
		url: "https://evo-mocha-one.vercel.app/assets/images/logo/logo.png",
		width: 1200,
		height: 630,
		alt: "EVO Logo Preview",
	},
	keywords = [],
}: SEOParams): Metadata {
	const siteName = "EVO";
	const siteUrl = "https://evo-mocha-one.vercel.app";
	const fullUrl = `${siteUrl}${pathname}`;

	return {
		title: `${title} | ${siteName}`,
		description,
		keywords,
		metadataBase: new URL(siteUrl),
		authors: [{ name: "RytClick", url: siteUrl }],
		robots: { index: true, follow: true },
		alternates: {
			canonical: pathname,
		},
		openGraph: {
			title: `${title} | ${siteName}`,
			description,
			url: fullUrl,
			siteName,
			images: [
				{
					url: image.url,
					width: image.width,
					height: image.height,
					alt: image.alt,
				},
			],
			locale: "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} | ${siteName}`,
			description,
			images: [image.url],
			site: "@myapp",
		},
	};
}
