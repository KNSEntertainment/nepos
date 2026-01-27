import Gallery from "@/components/Gallery";
import GlobalLoading from "@/components/GlobalLoading";
import React, { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Gallery | NEPOS",
	description: "Explore the gallery of NEPOS, showcasing our events, community, and memorable moments. See the vibrant life of our organization through photos and videos.",
	openGraph: {
		title: "Gallery | NEPOS",
		description: "Explore the gallery of NEPOS, showcasing our events, community, and memorable moments. See the vibrant life of our organization through photos and videos.",
		url: "/gallery",
		siteName: "NEPOS",
		type: "website",
	},
};

const page = () => {
	return (
		<Suspense fallback={<GlobalLoading />}>
			<Gallery />
		</Suspense>
	);
};
export default page;
