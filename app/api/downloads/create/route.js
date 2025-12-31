import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Download from "@/models/Download.Model";
import { saveUploadedFile } from "@/lib/saveUploadedFile";

export async function POST(request) {
	try {
		await connectDB();
		const formData = await request.formData();
		const title = formData.get("title");
		const date = formData.get("date");
		const category = formData.get("category");
		const file = formData.get("file");
		const image = formData.get("image");

		if (!title || !date || !category || !file) {
			return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
		}

		// Save file
		const savedFile = await saveUploadedFile(file, "downloads");
		let savedImage = null;
		if (image) {
			try {
				savedImage = await saveUploadedFile(image, "downloads");
			} catch (e) {
				// Optional: ignore image upload errors
				savedImage = null;
				console.error("Error saving image:", e);
			}
		}

		const download = await Download.create({
			title,
			date,
			category,
			fileUrl: savedFile.url,
			imageUrl: savedImage ? savedImage.url : "",
			fileSize: savedFile.size,
			imageSize: savedImage ? savedImage.size : undefined,
		});
		return NextResponse.json({ success: true, download }, { status: 201 });
	} catch (error) {
		console.error("Error creating download:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
