import connectDB from "@/lib/mongodb";
import Download from "@/models/Download.Model";

export async function getDownloads() {
	await connectDB();
	return Download.find().sort({ date: -1 }).lean();
}
