"use client";
import Image from "next/image";
import { Calendar } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Blog() {
	const { data: blogs, loading } = useFetchData("/api/blogs", "blogs");
	const pathname = usePathname();

	if (loading) {
		return (
			<section id="blog" className="bg-white">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
					<h2 className="text-3xl font-bold text-center mb-6">
						Circulars & <span className="text-[#0094da]">Notices</span>
					</h2>
					<div className="w-24 h-1 bg-[#0094da] mx-auto mb-6 md:mb-12 rounded-full"></div>
					<div className="mx-auto px-4 py-12">
						<div className="space-y-8">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{[...Array(3)].map((_, idx) => (
									<div key={idx} className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 animate-pulse">
										<div className="relative w-full h-64 overflow-hidden bg-gray-200" />
										<div className="p-6 space-y-2">
											<div className="flex items-center text-gray-300">
												<div className="w-4 h-4 mr-2 bg-gray-300 rounded-full" />
												<div className="h-4 w-20 bg-gray-200 rounded" />
											</div>
											<div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
										</div>
									</div>
								))}
							</div>
							<div className="flex justify-center">
								<div className="inline-flex items-center px-5 py-2.5 font-medium text-sm rounded-lg bg-gray-200 text-gray-400 animate-pulse w-32 h-10" />
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section id="blog" className="">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
				<h2 className="text-3xl font-bold text-center mb-6">
					Circulars & <span className="text-[#0094da]">Notices</span>
				</h2>
				<div className="w-24 h-1 bg-[#0094da] mx-auto mb-6 md:mb-12 rounded-full"></div>

				<div className="mx-auto px-4 py-12">
					<div className="space-y-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{blogs &&
								blogs.map((blog) => (
									<div key={blog._id} className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
										<div className="relative w-full h-64 overflow-hidden">
											<Image src={blog?.blogMainPicture || "/placeholder.jpg"} alt={blog?.blogTitle || "Blog image"} width={300} height={300} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
										</div>
										<div className="p-6 space-y-2">
											<div className="flex items-center text-gray-500">
												<Calendar className="w-4 h-4 mr-2" />
												<span className="text-sm font-medium">{blog?.blogDate}</span>
											</div>
											<h1 className="text-xl md:text-2xl font-bold mb-2 cursor-pointer group-hover:text-[#0094da]">
												<Link href={`/notices/${blog?._id}`}>{blog?.blogTitle}</Link>
											</h1>{" "}
										</div>
									</div>
								))}
						</div>
						{pathname !== "/blogs" && (
							<div className="flex justify-center">
								<Link href="/blogs" className="inline-flex items-center px-5 py-2.5 font-medium text-sm rounded-lg bg-[#0094da] text-white hover:bg-[#0094da] transition-colors duration-200">
									View All
									<svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
									</svg>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
