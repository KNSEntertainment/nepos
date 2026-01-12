import Blogs from "@/components/Blogs";
import React from "react";

export const metadata = {
	title: "Blogs | RSP Norway",
	description: "Explore the latest blogs from RSP Norway. Stay informed with our insights, updates, and stories. Dive into our blog section for valuable information and news.",
	openGraph: {
		title: "Blogs | RSP Norway",
		description: "Explore the latest blogs from RSP Norway. Stay informed with our insights, updates, and stories. Dive into our blog section for valuable information and news.",
		url: "/blogs",
		siteName: "RSP Norway",
		type: "website",
	},
};

const page = () => {
	return <Blogs />;
};

export default page;
