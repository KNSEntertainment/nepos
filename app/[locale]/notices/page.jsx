import { getTranslations } from "next-intl/server";
import EventsAndNoticesClient from "./EventsAndNoticesClient";
import { getEvents } from "@/lib/data/events";
import { getNotices } from "@/lib/data/notices";
import { normalizeDocs } from "@/lib/utils";

export const metadata = {
	title: "Notices | RSP Norway",
	description: "Stay informed with the latest notices from RSP Norway. Get updates on events, announcements, and important information for our community.",
	openGraph: {
		title: "Notices | RSP Norway",
		description: "Stay informed with the latest notices from RSP Norway. Get updates on events, announcements, and important information for our community.",
		url: "/notices",
		siteName: "RSP Norway",
		type: "website",
	},
};

export default async function EventsAndNoticesPage() {
	const events = await getEvents();
	const notices = await getNotices();

	const eventsNorm = normalizeDocs(events);
	const noticesNorm = normalizeDocs(notices);

	const t = await getTranslations("notices");

	const translations = {
		title: t("title"),
		description: t("description"),
		events_tab: t("events_tab"),
		notices_tab: t("notices_tab"),
		back: t("back"),
		other_events: t("other_events"),
		other_notices: t("other_notices"),
		learn_more: t("learn_more"),
		read_more: t("read_more"),
		no_events: t("no_events"),
		no_events_desc: t("no_events_desc"),
		no_notices: t("no_notices"),
		no_notices_desc: t("no_notices_desc"),
	};

	return <EventsAndNoticesClient events={eventsNorm} notices={noticesNorm} translations={translations} />;
}
