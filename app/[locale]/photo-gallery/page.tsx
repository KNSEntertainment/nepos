"use client";
import React, { useState } from "react";
import { X, Heart, Share2, Download } from "lucide-react";
import { useTranslations } from "next-intl";

interface Photo {
	id: number;
	url: string;
	title: string;
	category: string;
	photographer: string;
}

const PhotoGallery = () => {
	const t = useTranslations("gallery");
	const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

	// Sample photos - replace with your database data
	const photos = [
		{ id: 1, url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba", title: "Golden Hour", category: "Nature", photographer: "Alex River" },
		{ id: 2, url: "https://images.unsplash.com/photo-1682687221038-404cb8830901", title: "Urban Dreams", category: "Architecture", photographer: "Maya Chen" },
		{ id: 3, url: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb", title: "Serenity", category: "Landscape", photographer: "Jordan Blake" },
		{ id: 4, url: "https://images.unsplash.com/photo-1682687982501-1e58ab814714", title: "City Lights", category: "Urban", photographer: "Sam Torres" },
		{ id: 5, url: "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d", title: "Minimalist", category: "Abstract", photographer: "Riley Park" },

		{ id: 8, url: "https://images.unsplash.com/photo-1682687218147-9806132dc697", title: "Mountain Peak", category: "Landscape", photographer: "Drew Knight" },
		{ id: 9, url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538", title: "Geometric", category: "Architecture", photographer: "Morgan Lee" },
	];

	return (
		<div
			style={{
				minHeight: "100vh",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Animated background elements */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: "radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.03) 0%, transparent 50%)",
					pointerEvents: "none",
				}}
			/>

			<div
				style={{
					maxWidth: "1600px",
					margin: "0 auto",
					padding: "80px 40px",
					position: "relative",
					zIndex: 1,
				}}
			>
				{/* Header */}
				<header
					style={{
						marginBottom: "80px",
						animation: "fadeInDown 0.8s ease-out",
					}}
				>
					<h1 className="text-2xl">{t("title")}</h1>
					<p
						style={{
							fontFamily: '"DM Sans", sans-serif',
							fontSize: "1.125rem",
							color: "#888",
							letterSpacing: "0.05em",
							textTransform: "uppercase",
							fontWeight: 500,
						}}
					>
						{t("description")}
					</p>
				</header>

				{/* Masonry Grid */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: "24px",
						gridAutoFlow: "dense",
					}}
				>
					{photos.map((photo, index) => {
						const isLarge = index % 5 === 0;
						const isTall = index % 7 === 0;

						return (
							<div
								key={photo.id}
								onClick={() => setSelectedPhoto(photo)}
								style={{
									gridColumn: isLarge ? "span 2" : "span 1",
									gridRow: isTall ? "span 2" : "span 1",
									position: "relative",
									borderRadius: "16px",
									overflow: "hidden",
									cursor: "pointer",
									aspectRatio: isLarge ? "16/9" : isTall ? "9/16" : "4/3",
									animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
									transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
									boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
									e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.5)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = "translateY(0) scale(1)";
									e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
								}}
							>
								{/* Image */}
								<img
									src={`${photo.url}?w=800&q=80`}
									alt={photo.title}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "scale(1.1)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "scale(1)";
									}}
								/>

								{/* Gradient Overlay */}
								<div
									style={{
										position: "absolute",
										inset: 0,
										background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
										opacity: 0,
										transition: "opacity 0.4s ease",
									}}
									className="overlay"
								/>

								{/* Info */}
								<div
									style={{
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										padding: "24px",
										transform: "translateY(20px)",
										opacity: 0,
										transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
									}}
									className="info"
								>
									<div
										style={{
											fontSize: "0.75rem",
											color: "#4ECDC4",
											fontFamily: '"DM Sans", sans-serif',
											fontWeight: 600,
											textTransform: "uppercase",
											letterSpacing: "0.1em",
											marginBottom: "8px",
										}}
									>
										{photo.category}
									</div>
									<h3
										style={{
											fontFamily: '"Playfair Display", serif',
											fontSize: "1.5rem",
											fontWeight: 700,
											color: "white",
											marginBottom: "8px",
											lineHeight: 1.2,
										}}
									>
										{photo.title}
									</h3>
									<p
										style={{
											fontFamily: '"DM Sans", sans-serif',
											fontSize: "0.875rem",
											color: "#aaa",
											fontStyle: "italic",
										}}
									>
										by {photo.photographer}
									</p>
								</div>

								{/* Like Button */}
								<button
									style={{
										position: "absolute",
										top: "16px",
										right: "16px",
										width: "44px",
										height: "44px",
										borderRadius: "50%",
										border: "none",
										background: "rgba(255, 107, 107, 0.95)",
										backdropFilter: "blur(10px)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										cursor: "pointer",
										opacity: 0,
										transform: "scale(0.8)",
										transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
										zIndex: 2,
									}}
									className="like-btn"
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "scale(1.1)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "scale(1)";
									}}
								>
									<Heart
										size={20}
										fill="none"
										color="white"
										style={{
											transition: "all 0.2s ease",
										}}
									/>
								</button>
							</div>
						);
					})}
				</div>
			</div>

			{/* Lightbox Modal */}
			{selectedPhoto && (
				<div
					style={{
						position: "fixed",
						inset: 0,
						background: "rgba(0, 0, 0, 0.96)",
						backdropFilter: "blur(20px)",
						zIndex: 1000,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "40px",
						animation: "fadeIn 0.3s ease-out",
					}}
					onClick={() => setSelectedPhoto(null)}
				>
					<button
						onClick={() => setSelectedPhoto(null)}
						style={{
							position: "absolute",
							top: "24px",
							right: "24px",
							width: "48px",
							height: "48px",
							borderRadius: "50%",
							border: "none",
							background: "rgba(255, 255, 255, 0.1)",
							backdropFilter: "blur(10px)",
							color: "white",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							transition: "all 0.3s ease",
							zIndex: 1001,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
							e.currentTarget.style.transform = "rotate(90deg)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
							e.currentTarget.style.transform = "rotate(0deg)";
						}}
					>
						<X size={24} />
					</button>

					<div
						onClick={(e) => e.stopPropagation()}
						style={{
							maxWidth: "1200px",
							maxHeight: "90vh",
							display: "flex",
							gap: "48px",
							alignItems: "center",
							animation: "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
						}}
					>
						<img
							src={`${selectedPhoto.url}?w=1200&q=90`}
							alt={selectedPhoto.title}
							style={{
								maxWidth: "70%",
								maxHeight: "90vh",
								objectFit: "contain",
								borderRadius: "12px",
								boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6)",
							}}
						/>

						<div
							style={{
								flex: 1,
								color: "white",
							}}
						>
							<div
								style={{
									fontSize: "0.875rem",
									color: "#4ECDC4",
									fontFamily: '"DM Sans", sans-serif',
									fontWeight: 600,
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									marginBottom: "16px",
								}}
							>
								{selectedPhoto.category}
							</div>

							<h2
								style={{
									fontFamily: '"Playfair Display", serif',
									fontSize: "3rem",
									fontWeight: 700,
									marginBottom: "16px",
									lineHeight: 1.1,
								}}
							>
								{selectedPhoto.title}
							</h2>

							<p
								style={{
									fontFamily: '"DM Sans", sans-serif',
									fontSize: "1.125rem",
									color: "#aaa",
									fontStyle: "italic",
									marginBottom: "40px",
								}}
							>
								Photography by {selectedPhoto.photographer}
							</p>

							<div
								style={{
									display: "flex",
									gap: "12px",
								}}
							>
								<button
									style={{
										padding: "14px 24px",
										borderRadius: "12px",
										border: "2px solid rgba(255, 255, 255, 0.2)",
										background: "rgba(255, 255, 255, 0.05)",
										color: "white",
										fontFamily: '"DM Sans", sans-serif',
										fontSize: "0.875rem",
										fontWeight: 600,
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										gap: "8px",
										transition: "all 0.3s ease",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
										e.currentTarget.style.transform = "translateY(-2px)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
										e.currentTarget.style.transform = "translateY(0)";
									}}
								>
									<Share2 size={18} /> Share
								</button>

								<button
									style={{
										padding: "14px 24px",
										borderRadius: "12px",
										border: "2px solid rgba(255, 255, 255, 0.2)",
										background: "rgba(255, 255, 255, 0.05)",
										color: "white",
										fontFamily: '"DM Sans", sans-serif',
										fontSize: "0.875rem",
										fontWeight: 600,
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										gap: "8px",
										transition: "all 0.3s ease",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
										e.currentTarget.style.transform = "translateY(-2px)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
										e.currentTarget.style.transform = "translateY(0)";
									}}
								>
									<Download size={18} /> Download
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        div:hover > .overlay {
          opacity: 1;
        }

        div:hover > .info {
          opacity: 1;
          transform: translateY(0);
        }

        div:hover > .like-btn {
          opacity: 1;
          transform: scale(1);
        }

        @media (max-width: 768px) {
          div[style*="gridColumn"] {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
		</div>
	);
};

export default PhotoGallery;
