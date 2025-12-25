import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(req) {
	try {
		const { name, email, message } = await req.json();
		if (!name || !email || !message) {
			return NextResponse.json({ error: "All fields are required." }, { status: 400 });
		}
		await sendContactEmail({ name, email, message });
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
	}
}
