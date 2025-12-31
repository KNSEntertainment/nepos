import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Download from "@/models/Download.Model";
import { saveUploadedFile } from "@/lib/saveUploadedFile";
import fs from "fs";
import path from "path";

export async function PUT(request, { params }) {
	try {
		await connectDB();
		const { id } = params;
		const formData = await request.formData();
		const title = formData.get("title");
		const date = formData.get("date");
		const category = formData.get("category");
		let fileUrl = formData.get("fileUrl");
		let imageUrl = formData.get("imageUrl");
		let fileSize = formData.get("fileSize");
		let imageSize = formData.get("imageSize");
		const file = formData.get("file");
		const image = formData.get("image");

		// If new file/image uploaded, save and update url/size
		if (file) {
			const savedFile = await saveUploadedFile(file, "downloads");
			fileUrl = savedFile.url;
			fileSize = savedFile.size;
		}
		if (image) {
			const savedImage = await saveUploadedFile(image, "downloads");
			imageUrl = savedImage.url;
			imageSize = savedImage.size;
		}

		const update = {
			...(title && { title }),
			...(date && { date }),
			...(category && { category }),
			...(fileUrl && { fileUrl }),
			...(imageUrl && { imageUrl }),
			...(fileSize && { fileSize }),
			...(imageSize && { imageSize }),
		};

		const updated = await Download.findByIdAndUpdate(id, update, { new: true });
		if (!updated) {
			return NextResponse.json({ success: false, error: "Download not found" }, { status: 404 });
		}
		return NextResponse.json({ success: true, download: updated }, { status: 200 });
	} catch (error) {
		console.error("Error updating download:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
export async function DELETE(request, { params }) {
	try {
		await connectDB();
		const { id } = params;
		const deleted = await Download.findByIdAndDelete(id);
		if (!deleted) {
			return NextResponse.json({ success: false, error: "Download not found" }, { status: 404 });
		}
		// Delete file from disk if it exists
		if (deleted.fileUrl) {
			const filePath = path.join(process.cwd(), "public", deleted.fileUrl);
			try {
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath);
				}
			} catch (err) {
				console.error("Error deleting file from disk:", err);
			}
		}
		// Optionally, delete image file as well
		if (deleted.imageUrl) {
			const imagePath = path.join(process.cwd(), "public", deleted.imageUrl);
			try {
				if (fs.existsSync(imagePath)) {
					fs.unlinkSync(imagePath);
				}
			} catch (err) {
				console.error("Error deleting image from disk:", err);
			}
		}
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error deleting download:", error);
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}
