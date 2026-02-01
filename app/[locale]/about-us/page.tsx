import { MessageCirclePlusIcon, Target, Eye, Users, Calendar } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/SectionHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Us | NEPOS",
	description: "Learn more about NEPOS, our mission, vision, and the community we serve. Discover our story and values.",
	openGraph: {
		title: "About Us | NEPOS",
		description: "Learn more about NEPOS, our mission, vision, and the community we serve. Discover our story and values.",
		url: "/about-us",
		siteName: "NEPOS",
		type: "website",
	},
};

export default function AboutUs() {
	const t = useTranslations("about-us");

	return (
		<main className="px-4 pb-20">
			<header className="text-center mb-12">
				<SectionHeader heading={t("title")} />
				<p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">{t("about_description_3")}</p>
			</header>
			{/* Hero Section with Image */}
			<section className="relative mb-16 md:mb-24">
				<div className="max-w-7xl mx-auto">
					<div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
						{/* Image with Overlay */}
						<Image src="/rabi1.webp" alt="NEPOS Community" fill className="object-cover" />
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

						{/* Floating Stats Cards */}
						<div className="absolute bottom-8 left-0 right-0 px-4">
							<div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
								<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
									<Users className="w-6 h-6 text-brand mb-2" />
									<p className="text-3xl font-bold text-gray-900">200+</p>
									<p className="text-sm text-gray-600">Active Members</p>
								</div>
								<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
									<Calendar className="w-6 h-6 text-blue-600 mb-2" />
									<p className="text-3xl font-bold text-gray-900">6+</p>
									<p className="text-sm text-gray-600">Months Active</p>
								</div>
								<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
									<MessageCirclePlusIcon className="w-6 h-6 text-green-600 mb-2" />
									<p className="text-3xl font-bold text-gray-900">500+</p>
									<p className="text-sm text-gray-600">Connections Made</p>
								</div>
								<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
									<Target className="w-6 h-6 text-purple-600 mb-2" />
									<p className="text-3xl font-bold text-gray-900">100%</p>
									<p className="text-sm text-gray-600">Community Driven</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Story Section */}
			<section className="max-w-5xl mx-auto mb-20 md:mb-32">
				<div className="text-center mb-12">
					<div className="inline-block">
						<span className="text-brand text-sm font-semibold tracking-wider uppercase mb-2 block">Our Story</span>
						<h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Building Community Together</h2>
						<div className="h-1 w-24 bg-gradient-to-r from-brand to-blue-600 mx-auto rounded-full" />
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{/* Story Card 1 */}
					<div className="group relative">
						<div className="absolute -inset-1 bg-gradient-to-r from-brand to-blue-600 rounded-2xl opacity-25 group-hover:opacity-50 transition duration-300 blur" />
						<div className="relative bg-white rounded-2xl p-8 shadow-lg">
							<div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
								<div className="w-6 h-6 bg-brand rounded-full" />
							</div>
							<p className="text-gray-700 leading-relaxed">{t("about_description_1")}</p>
						</div>
					</div>

					{/* Story Card 2 */}
					<div className="group relative">
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-25 group-hover:opacity-50 transition duration-300 blur" />
						<div className="relative bg-white rounded-2xl p-8 shadow-lg">
							<div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4">
								<div className="w-6 h-6 bg-blue-600 rounded-full" />
							</div>
							<p className="text-gray-700 leading-relaxed">{t("about_description_2")}</p>
						</div>
					</div>

					{/* Story Card 3 */}
					<div className="group relative">
						<div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-25 group-hover:opacity-50 transition duration-300 blur" />
						<div className="relative bg-white rounded-2xl p-8 shadow-lg">
							<div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-4">
								<div className="w-6 h-6 bg-indigo-600 rounded-full" />
							</div>
							<p className="text-gray-700 leading-relaxed">{t("about_description_3")}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Vision Section */}
			<section className="relative">
				{/* Background Decoration */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-1/2 left-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl transform -translate-y-1/2" />
					<div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transform -translate-y-1/2" />
				</div>

				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
						{/* Mission Card */}
						<div className="group relative overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-br from-brand to-brand/80 rounded-3xl transform transition-transform group-hover:scale-105 duration-300" />
							<div className="relative p-8 md:p-12">
								<div className="mb-6">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
										<Target className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{t("mission_title")}</h3>
									<div className="h-1 w-16 bg-white/50 rounded-full" />
								</div>
								<p className="text-white/95 text-lg leading-relaxed">{t("mission_description")}</p>

								{/* Decorative Element */}
								<div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
									<svg viewBox="0 0 100 100" className="w-full h-full">
										<circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" />
										<circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2" />
										<circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2" />
									</svg>
								</div>
							</div>
						</div>

						{/* Vision Card */}
						<div className="group relative overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl transform transition-transform group-hover:scale-105 duration-300" />
							<div className="relative p-8 md:p-12">
								<div className="mb-6">
									<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
										<Eye className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{t("vision_title")}</h3>
									<div className="h-1 w-16 bg-white/50 rounded-full" />
								</div>
								<p className="text-white/95 text-lg leading-relaxed">{t("vision_description")}</p>

								{/* Decorative Element */}
								<div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
									<svg viewBox="0 0 100 100" className="w-full h-full">
										<path d="M20,50 L50,20 L80,50 L50,80 Z" fill="none" stroke="white" strokeWidth="2" />
										<path d="M30,50 L50,30 L70,50 L50,70 Z" fill="none" stroke="white" strokeWidth="2" />
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="max-w-4xl mx-auto mt-20 md:mt-32">
				<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 text-center">
					<div className="absolute inset-0 opacity-10">
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
							}}
						/>
					</div>
					<div className="relative z-10">
						<h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Growing Community</h3>
						<p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Be part of something special. Connect with like-minded individuals and make lasting friendships.</p>
						<button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">Get Started Today</button>
					</div>
				</div>
			</section>
		</main>
	);
}
