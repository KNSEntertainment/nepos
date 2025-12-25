"use client";

import React, { useState } from "react";

export default function ContactPage() {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setSuccess("");
		setError("");
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (res.ok) {
				setSuccess("Your message has been sent! We&apos;ll get back to you soon.");
				setForm({ name: "", email: "", message: "" });
			} else {
				setError(data.error || "Failed to send message.");
			}
		} catch (err) {
			if (err instanceof Error) {
				setError("Failed to send message. " + err.message);
			} else {
				setError("Failed to send message.");
			}
		}
		setLoading(false);
	}

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center py-36">
				<div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
					<h1 className="text-3xl font-bold text-center mb-4 text-blue-400">Contact Us</h1>
					<p className="text-center text-gray-600 mb-8">We&apos;d love to hear from you! Fill out the form below and we&apos;ll respond as soon as possible.</p>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700">Name</label>
							<input type="text" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border border-gray-300 bg-white/80 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-gray-800 placeholder-gray-400" placeholder="Your Name" />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Email</label>
							<input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border border-gray-300 bg-white/80 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-gray-800 placeholder-gray-400" placeholder="you@email.com" />
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">Message</label>
							<textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="mt-1 block w-full rounded-md border border-gray-300 bg-white/80 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-gray-800 placeholder-gray-400" placeholder="Type your message here..." />
						</div>
						<button type="submit" disabled={loading} className="w-full py-3 px-6 bg-blue-400 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-colors">
							{loading ? "Sending..." : "Send Message"}
						</button>
						{success && <p className="text-green-600 text-center mt-2">{success}</p>}
						{error && <p className="text-red-600 text-center mt-2">{error}</p>}
					</form>
				</div>
			</div>
		</>
	);
}
