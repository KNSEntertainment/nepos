import { getTranslations, getLocale } from "next-intl/server";
import { getBlogs } from "@/lib/data/blogs";
import BlogsClient from "./BlogsClient";
import { normalizeDocs } from "@/lib/utils";

export default async function Blogs() {
	const [blogsRaw, t, locale] = await Promise.all([getBlogs(), getTranslations("blogs"), getLocale()]);

	const blogs = (blogsRaw || []).map((blog) => ({
		_id: blog._id,
		blogTitle: blog.blogTitle,
		blogDate: blog.blogDate,
		blogMainPicture: blog.blogMainPicture,
		blogDesc: blog.blogDesc,
		blogAuthor: blog.blogAuthor,
		blogSecondPicture: blog.blogSecondPicture,
		blogContent: blog.blogContent,
	}));

	const blogsNorm = normalizeDocs(blogs);
	const translations = {
		blogs_title: t("blogs_title"),
		loading: t("loading"),
		view_all: t("view_all"),
	};

	return <BlogsClient blogs={blogsNorm} translations={translations} locale={locale} />;
}
