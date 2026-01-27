import Blogs from "@/components/Blogs";
import React from "react";

export const metadata = {
	title: "Blogs | NEPOS",
	description: "Explore the latest blogs from NEPOS. Stay informed with our insights, updates, and stories. Dive into our blog section for valuable information and news.",
	openGraph: {
		title: "Blogs | NEPOS",
		description: "Explore the latest blogs from NEPOS. Stay informed with our insights, updates, and stories. Dive into our blog section for valuable information and news.",
		url: "/blogs",
		siteName: "NEPOS",
		type: "website",
	},
};

const page = () => {
	return <Blogs />;
};

export default page;
