"use client";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

type Setting = {
	_id?: string;
	address?: string;
	phone?: string;
	mobile?: string;
	email?: string;
};

interface Translations {
	title: string;
	subtitle: string;
	description: string;
	form: {
		name: string;
		name_placeholder: string;
		email: string;
		email_placeholder: string;
		message: string;
		message_placeholder: string;
		send: string;
		sending: string;
	};
	success: string;
	error: string;
	info: {
		title: string;
		address: string;
		phone: string;
		email: string;
	};
}

interface Props {
	settings: Setting[];
	translations: Translations;
}
export default function ContactPageClient({ settings, translations: t }: Props) {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const setting = settings?.[0] || {};

	function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSuccess("");
		setError("");
		setSubmitting(true);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setSuccess(t.success);
				setForm({ name: "", email: "", message: "" });
			} else {
				setError(t.error);
			}
		} catch (err) {
			setError(t.error + " " + (err as Error).message);
		}
		setSubmitting(false);
	}

	return (
		<main className=" pb-16">
			<div className="container mx-auto px-4 max-w-7xl">
				<header className="text-center mb-12">
					<SectionHeader heading={t.title} />
					<p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">{t.description}</p>
				</header>

				<div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200">
					{/* Left: Contact Information (The "Official" Sidebar) */}
					<aside className="lg:w-1/3 bg-blue-900 p-8 md:p-12 text-white relative overflow-hidden">
						{/* Decorative Circle */}
						<div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-800 rounded-full opacity-50" />

						<div className="relative z-10">
							<h3 className="text-3xl font-bold mb-8">{t.info.title}</h3>

							<div className="space-y-8">
								<div className="flex gap-5 group">
									<div className="bg-blue-800 p-3 rounded-xl group-hover:bg-blue-700 transition-colors">
										<MapPin className="w-6 h-6 text-blue-200" />
									</div>
									<div>
										<p className="text-blue-300 text-sm font-bold uppercase tracking-wider">{t.info.address}</p>
										<address className="not-italic text-lg text-white mt-1">{setting.address}</address>
									</div>
								</div>

								<div className="flex gap-5 group">
									<div className="bg-blue-800 p-3 rounded-xl group-hover:bg-blue-700 transition-colors">
										<Phone className="w-6 h-6 text-blue-200" />
									</div>
									<div>
										<p className="text-blue-300 text-sm font-bold uppercase tracking-wider">{t.info.phone}</p>
										<a href={`tel:${setting.phone}`} className="text-lg text-white hover:text-blue-200 transition-colors">
											{setting?.phone || setting?.mobile}
										</a>
									</div>
								</div>

								<div className="flex gap-5 group">
									<div className="bg-blue-800 p-3 rounded-xl group-hover:bg-blue-700 transition-colors">
										<Mail className="w-6 h-6 text-blue-200" />
									</div>
									<div>
										<p className="text-blue-300 text-sm font-bold uppercase tracking-wider">{t.info.email}</p>
										<a href={`mailto:${setting.email}`} className="text-lg text-white hover:text-blue-200 transition-colors block break-words">
											{setting.email}
										</a>
									</div>
								</div>
							</div>
						</div>
					</aside>

					{/* Right: Contact Form */}
					<div className="lg:w-2/3 p-8 md:p-12 bg-white">
						<h2 className="text-2xl font-bold text-slate-800 mb-8">{t.subtitle}</h2>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label htmlFor="name" className="text-sm font-bold text-slate-700">
										{t.form.name}
									</label>
									<input id="name" name="name" type="text" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" placeholder={t.form.name_placeholder} />
								</div>
								<div className="space-y-2">
									<label htmlFor="email" className="text-sm font-bold text-slate-700">
										{t.form.email}
									</label>
									<input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" placeholder={t.form.email_placeholder} />
								</div>
							</div>

							<div className="space-y-2">
								<label htmlFor="message" className="text-sm font-bold text-slate-700">
									{t.form.message}
								</label>
								<textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all resize-none" placeholder={t.form.message_placeholder} />
							</div>

							<button type="submit" disabled={submitting} className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2">
								{submitting ? (
									t.form.sending
								) : (
									<>
										{t.form.send}
										<Send className="w-4 h-4" />
									</>
								)}
							</button>

							{/* Status Messages */}
							{success && (
								<div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl animate-in fade-in slide-in-from-top-2">
									<CheckCircle className="w-5 h-5" />
									<p className="text-sm font-medium">{success}</p>
								</div>
							)}
							{error && (
								<div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl animate-in fade-in slide-in-from-top-2">
									<AlertCircle className="w-5 h-5" />
									<p className="text-sm font-medium">{error}</p>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
