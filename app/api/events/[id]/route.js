import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event.Model";
import { uploadToCloudinary, deleteFromCloudinary } from "@/utils/saveFileToCloudinaryUtils";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function PUT(request, { params }) {
	const { id } = params;

	try {
		await connectDB();

		const formData = await request.formData();
		const eventId = id;

		const eventData = {};
		for (const [key, value] of formData.entries()) {
			if (key !== "eventposter" && key !== "eventposter2" && key !== "eventposter3" && key !== "eventvideo") {
				eventData[key] = value;
			}
		}

		const event = await Event.findById(eventId);
		if (!event) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
		}

		// Handle video update and deletion
		const eventvideo = formData.get("eventvideo");
		if (eventvideo && eventvideo.size > 0) {
			if (event.eventvideoUrl) {
				console.log("Old video URL:", event.eventvideoUrl);
				await deleteFromCloudinary(event.eventvideoUrl, "video");
			}
			eventData.eventvideoUrl = await uploadToCloudinary(eventvideo, "NEPOSnorway_event_images");
		}

		const eventposter = formData.get("eventposter");
		if (eventposter && eventposter.size > 0) {
			if (event.eventposterUrl) {
				console.log("Old poster URL:", event.eventposterUrl);
				await deleteFromCloudinary(event.eventposterUrl, "image");
			}
			eventData.eventposterUrl = await uploadToCloudinary(eventposter, "NEPOSnorway_event_images");
		}

		const eventposter2 = formData.get("eventposter2");
		if (eventposter2 && eventposter2.size > 0) {
			if (event.eventposter2Url) {
				console.log("Old poster2 URL:", event.eventposter2Url);
				await deleteFromCloudinary(event.eventposter2Url, "image");
			}
			eventData.eventposter2Url = await uploadToCloudinary(eventposter2, "NEPOSnorway_event_images");
		}

		const eventposter3 = formData.get("eventposter3");
		if (eventposter3 && eventposter3.size > 0) {
			if (event.eventposter3Url) {
				console.log("Old poster3 URL:", event.eventposter3Url);
				await deleteFromCloudinary(event.eventposter3Url, "image");
			}
			eventData.eventposter3Url = await uploadToCloudinary(eventposter3, "NEPOSnorway_event_images");
		}

		const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });

		return NextResponse.json({ success: true, event: updatedEvent }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

// DELETE API to delete event
export async function DELETE(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const token = request.cookies.get("authToken")?.value;
		if (!token) {
			return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
		}
		let payload;
		try {
			const secretKey = new TextEncoder().encode(JWT_SECRET);
			({ payload } = await jwtVerify(token, secretKey));
		} catch {
			return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
		}
		const role = payload?.role;
		if (!role || !["admin"].includes(role)) {
			return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
		}

		const event = await Event.findById(id);
		if (!event) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
		}

		await Event.findByIdAndDelete(id);

		// Delete images from Cloudinary
		if (event.eventposterUrl) await deleteFromCloudinary(event.eventposterUrl);
		if (event.eventposter2Url) await deleteFromCloudinary(event.eventposter2Url);
		if (event.eventposter3Url) await deleteFromCloudinary(event.eventposter3Url);
		// if (event.eventvideoUrl) await deleteFromCloudinary(event.eventvideoUrl);

		return NextResponse.json({ success: true, message: "Event deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}

// GET API to fetch event details
export async function GET(request, { params }) {
	const { id } = await params;

	try {
		await connectDB();

		const event = await Event.findById(id);
		if (!event) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true, event }, { status: 200 });
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
