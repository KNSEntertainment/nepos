"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

type Setting = {
	_id?: string;
	address?: string;
	phone?: string;
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

	const typedSettings = settings;

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
			const data = await res.json();
			if (res.ok) {
				setSuccess("Your message has been sent! We will get back to you soon.");
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
		setSubmitting(false);
	}

	return (
		<main>
			<section aria-labelledby="contact-heading">
				{/*
				NOTE: Check all color combinations (e.g., .bg-brand/5, .text-brand, .text-gray-600) for sufficient contrast using a tool like WebAIM Contrast Checker or Lighthouse.
				Adjust Tailwind config or color classes if needed for accessibility.
			*/}
				<h1 id="contact-heading" className="sr-only">
					{t.title}
				</h1>
				<SectionHeader heading={t.title} />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mt-6 md:-mt-0 gap-8">
					<div className="bg-white lg:col-span-2 shadow-xl rounded-lg p-8 w-full">
						<h2 className="text-lg md:text-2xl font-bold text-center mb-2 md:mb-4 text-brand">{t.subtitle}</h2>
						<p className="text-center text-gray-600 mb-8">{t.description}</p>
						<form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700">
									{t.form.name}
								</label>
								<input id="name" type="text" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border border-gray-300 bg-white/80 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-gray-800 placeholder-gray-400" placeholder={t.form.name_placeholder} autoComplete="name" aria-required="true" />
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">
									{t.form.email}
								</label>
								<input id="email" type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border border-gray-300 bg-white/80 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-gray-800 placeholder-gray-400" placeholder={t.form.email_placeholder} autoComplete="email" aria-required="true" />
							</div>
							<div>
								<label htmlFor="message" className="block text-sm font-medium text-gray-700">
									{t.form.message}
								</label>
								<textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} className="mt-1 block w-full rounded-md border border-gray-300 bg-white/80 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 text-gray-800 placeholder-gray-400" placeholder={t.form.message_placeholder} aria-required="true" />
							</div>
							<button type="submit" className="w-full py-3 px-6 bg-brand text-white font-semibold rounded-md shadow hover:bg-brand/90 transition-colors" disabled={submitting} aria-busy={submitting}>
								{submitting ? t.form.sending : t.form.send}
							</button>
							{success && (
								<p className="text-green-600 text-center mt-2" role="status" aria-live="polite">
									{t.success}
								</p>
							)}
							{error && (
								<p className="text-red-600 text-center mt-2" role="alert" aria-live="assertive">
									{t.error}
								</p>
							)}
						</form>
					</div>
					<aside className="bg-brand/5 rounded-lg p-8 w-full grid" aria-labelledby="contact-info-heading">
						<div className="row-span-1 mb-2 md:mb-0">
							<h3 id="contact-info-heading" className="text-2xl font-bold text-brand">
								{t.info.title}
							</h3>
						</div>
						<div className="row-span-1 mb-2 md:mb-0 flex items-start gap-4">
							<MapPin className="w-5 h-5 text-brand flex-shrink-0 mt-1" aria-hidden="true" />
							<div>
								<p className="font-semibold text-gray-900 mb-1">{t.info.address}</p>
								<address className="text-gray-700 not-italic">{typedSettings?.[0]?.address}</address>
							</div>
						</div>
						<div className="row-span-1 mb-2 md:mb-0 flex items-start gap-4">
							<Phone className="w-5 h-5 text-brand flex-shrink-0 mt-1" aria-hidden="true" />
							<div>
								<p className="font-semibold text-gray-900 mb-1">{t.info.phone}</p>
								<a className="text-gray-700 underline" href={`tel:${typedSettings?.[0]?.phone}`}>
									{typedSettings?.[0]?.phone}
								</a>
							</div>
						</div>
						<div className="row-span-1 flex items-start gap-4">
							<Mail className="w-5 h-5 text-brand flex-shrink-0 mt-1" aria-hidden="true" />
							<div>
								<p className="font-semibold text-gray-900 mb-1">{t.info.email}</p>
								<a className="text-gray-700 underline" href={`mailto:${typedSettings?.[0]?.email}`}>
									{typedSettings?.[0]?.email}
								</a>
							</div>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
