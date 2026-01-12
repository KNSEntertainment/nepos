import type { Metadata } from "next";
import { getDownloads } from "@/lib/data/downloads";
import DownloadsClient from "./DownloadsClient";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
	title: "Downloads | RSP Norway",
	description: "Download important documents, forms, and resources from RSP Norway. All files are available for members and visitors.",
	openGraph: {
		title: "Downloads | RSP Norway",
		description: "Download important documents, forms, and resources from RSP Norway. All files are available for members and visitors.",
		url: "/downloads",
		siteName: "RSP Norway",
		type: "website",
	},
};

export default async function DownloadsPage() {
	const t = await getTranslations("downloads");
	const downloads = await getDownloads();

	const documents = downloads.map((doc) => {
		let id: string;
		if (typeof doc._id === "string") {
			id = doc._id;
		} else if (doc._id && typeof doc._id === "object" && "toString" in doc._id && typeof doc._id.toString === "function") {
			id = doc._id.toString();
		} else {
			id = "";
		}
		return {
			id,
			title: doc.title,
			date: doc.date,
			fileUrl: doc.fileUrl,
			imageUrl: doc.imageUrl,
			category: doc.category,
			downloadCount: doc.downloadCount ?? 0,
		};
	});

	return (
		<section className="px-4">
			<SectionHeader heading={t("title")} />

			<DownloadsClient
				documents={documents}
				translations={{
					searchPlaceholder: t("search_placeholder"),
					download: t("download"),
					all: t("all"),
					downloadsCount: t("downloads_count"),
					noDocuments: t("no_documents"),
					noDocumentsDesc: t("no_documents_desc"),
				}}
			/>
		</section>
	);
}
