import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

// Helper: Generate a unique, irregular grid pattern
const irregularGrid = [
	"row-span-2 col-span-2", // big
	"row-span-1 col-span-1", // small
	"row-span-2 col-span-1", // tall
	"row-span-1 col-span-2", // wide
	"row-span-1 col-span-1", // small
	"row-span-2 col-span-1", // tall
	"row-span-1 col-span-2", // wide
	"row-span-1 col-span-1", // small
];

export default async function Gallery() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/gallery`, {
		cache: "no-store",
	});
	const data = await res.json();
	const gallery = data.gallery || [];
	// Flatten all media arrays into a single array of {src, alt}
	const images = gallery.flatMap((item: { media?: string[]; alt?: string }) => (item.media || []).map((src: string) => ({ src, alt: item.alt || "Gallery image" })));

	return (
		<section className="container mx-auto px-4 py-12 md:py-16 mb-8">
			<h2 className="text-3xl text-center font-bold mb-6">
				Photo <span className="mx-auto text-[#0094da]">Gallery</span>
			</h2>
			<div className="w-24 h-1 mx-auto bg-[#0094da] mb-6 md:mb-12 rounded-full"></div>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 auto-rows-[120px] sm:auto-rows-[180px]" style={{ gridAutoFlow: "dense" }}>
				{images.map((img: { src: string; alt: string }, i: number) => (
					<div key={i} className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group transition-all duration-300 hover:scale-105 ${irregularGrid[i % irregularGrid.length]}`}>
						<Image src={img.src} alt={img.alt} fill className="w-full h-full object-cover object-center group-hover:brightness-75 transition-all duration-300" loading="lazy" />
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
							<span className="text-white text-lg font-semibold">Zoom</span>
						</div>
					</div>
				))}
			</div>
			{/* Lightbox is not supported in server components, so you may need to move it to a client component if you want zoom functionality. */}
		</section>
	);
}
