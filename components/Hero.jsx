"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function FullWidthHero() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const t = useTranslations("slider");
	const locale = useLocale();

	const slides = [
		{
			image: "/nepos1.jpg",
			title: t("title_1"),
			description: t("subtitle_1"),
			primaryLink: "/membership",
			secondaryLink: "/about-us",
		},
		{
			image: "/nepos2.jpg",
			title: t("title_2"),
			description: t("subtitle_2"),
			primaryLink: "/get-involved",
			secondaryLink: "/contact",
		},
	];

	const nextSlide = useCallback(() => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
		setTimeout(() => setIsAnimating(false), 1200);
	}, [isAnimating, slides.length]);

	const prevSlide = useCallback(() => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
		setTimeout(() => setIsAnimating(false), 1200);
	}, [isAnimating, slides.length]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!isAnimating) nextSlide();
		}, 7000);
		return () => clearInterval(interval);
	}, [currentSlide, nextSlide, isAnimating]);

	return (
		/* The trick for True Full Width:
           w-screen + relative left-1/2 -translate-x-1/2 
        */
		<div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden bg-slate-900">
			<section className="relative h-screen w-full flex items-center">
				{/* Background Layer */}
				<AnimatePresence mode="wait">
					<motion.div key={currentSlide} className="absolute inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
						<Image src={slides[currentSlide].image} alt="Background" fill className="object-cover transition-transform duration-[10s] scale-110 animate-ken-burns" priority />
						{/* Overlay: Darkens and adds a blue tint for political branding */}
						<div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/40 to-transparent z-10" />
					</motion.div>
				</AnimatePresence>

				{/* Content Layer */}
				<div className="container relative z-20 mx-auto px-6 md:px-12">
					<div className="max-w-3xl">
						<AnimatePresence mode="wait">
							<motion.div key={currentSlide} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.7, ease: "easeOut" }}>
								<h1 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tighter">{slides[currentSlide].title}</h1>
								<p className="text-xl md:text-2xl text-blue-100/80 mb-10 md:leading-relaxed font-light">{slides[currentSlide].description}</p>

								<div className="flex flex-wrap gap-2 md:gap-5">
									<Link href={slides[currentSlide].primaryLink} locale={locale}>
										<Button className="h-12 md:px-10 md:text-lg font-bold rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">{t("become_a_member")}</Button>
									</Link>
									<Link href={slides[currentSlide].secondaryLink} locale={locale}>
										<Button variant="outline" className="h-12 md:px-10 md:text-lg font-bold rounded-full border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-blue-900 transition-all flex items-center gap-2">
											{t("explore_NEPOS")}
											<ArrowRight className="w-5 h-5" />
										</Button>
									</Link>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Navigation Controls */}
				<div className="absolute bottom-12 right-12 md:right-24 z-30 flex items-center gap-4">
					<button onClick={prevSlide} className="p-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-lg text-white hover:bg-white hover:text-blue-900 transition-all">
						<ChevronLeft className="w-6 h-6" />
					</button>

					{/* Progress Indicator */}
					<div className="flex gap-2">
						{slides.map((_, i) => (
							<div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? "w-12 bg-blue-500" : "w-4 bg-white/30"}`} />
						))}
					</div>

					<button onClick={nextSlide} className="p-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-lg text-white hover:bg-white hover:text-blue-900 transition-all">
						<ChevronRight className="w-6 h-6" />
					</button>
				</div>
			</section>

			{/* Global CSS for Ken Burns Effect */}
			<style jsx global>{`
				@keyframes kenburns {
					from {
						transform: scale(1);
					}
					to {
						transform: scale(1.15);
					}
				}
				.animate-ken-burns {
					animation: kenburns 20s ease-out infinite alternate;
				}
			`}</style>
		</div>
	);
}
