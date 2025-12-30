"use client";
import dynamic from "next/dynamic";

const GalleryClient = dynamic(() => import("./GalleryClient"), { ssr: false });

export default function GalleryWrapper({ images }) {
	return <GalleryClient images={images} />;
}
