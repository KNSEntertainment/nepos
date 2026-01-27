/**
 * Script to create an admin user in the database
 * Usage: node scripts/createAdmin.js
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as readline from "readline";

// User Schema
const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		userName: { type: String, required: true },
		password: { type: String },
		role: { type: String, enum: ["user", "admin"], required: true },
		phone: { type: String },
		resetToken: { type: String },
		resetTokenExpiry: { type: Date },
		setupToken: { type: String },
		setupTokenExpiry: { type: Date },
	},
	{
		timestamps: true,
	},
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Create readline interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Promisify readline question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdminUser() {
	try {
		// Get MongoDB URI from environment or use default
		const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://harijunkemails:1SSMbNFtQLPQuLWO@hariscluster.fydu0.mongodb.net/nepos";

		// Connect to MongoDB
		console.log("Connecting to MongoDB...");
		await mongoose.connect(MONGODB_URI);
		console.log("✅ Connected to MongoDB\n");

		// Get admin details from user input
		const fullName = await question("Enter admin full name: ");
		const email = await question("Enter admin email: ");
		const userName = await question("Enter admin username: ");
		const password = await question("Enter admin password: ");

		// Validate inputs
		if (!fullName || !email || !userName || !password) {
			console.error("❌ All fields are required!");
			process.exit(1);
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			console.error("❌ User with this email already exists!");
			process.exit(1);
		}

		// Hash the password
		console.log("\nHashing password...");
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new admin user
		const adminUser = new User({
			fullName,
			email,
			userName,
			password: hashedPassword,
			role: "admin",
		});

		await adminUser.save();

		console.log("\n✅ Admin user created successfully!");
		console.log("\nAdmin Details:");
		console.log("━".repeat(40));
		console.log(`Full Name: ${fullName}`);
		console.log(`Email: ${email}`);
		console.log(`Username: ${userName}`);
		console.log(`Role: admin`);
		console.log("━".repeat(40));
	} catch (error) {
		console.error("❌ Error creating admin user:", error.message);
	} finally {
		rl.close();
		await mongoose.disconnect();
		console.log("\n✅ Disconnected from MongoDB");
		process.exit(0);
	}
}

createAdminUser();
