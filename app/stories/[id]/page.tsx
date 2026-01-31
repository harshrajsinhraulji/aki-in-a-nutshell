import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Story | Aki's Stories",
};

interface PageProps {
    params: Promise<{ id: string }>;
}

// Placeholder - will be dynamic in Wave 3
export default async function StoryDetailPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <article className="glass rounded-2xl p-8">
                    <header className="mb-8">
                        <p className="text-sm font-mono mb-4" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                            story #{id}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4" style={{ color: "#121212" }}>
                            story title goes here 📖
                        </h1>
                        <div className="flex items-center gap-4 text-sm" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                            <span>january 15, 2026</span>
                            <span
                                className="px-2 py-1 rounded-full text-xs"
                                style={{ backgroundColor: "rgba(255, 108, 164, 0.2)", color: "#FF6CA4" }}
                            >
                                contemplative
                            </span>
                        </div>
                    </header>

                    <div className="prose prose-lg" style={{ color: "rgba(18, 18, 18, 0.8)" }}>
                        <p>
                            this is where the story content will go. it&apos;ll be loaded from firestore
                            in wave 3. for now, imagine something profound written at 3am.
                        </p>
                        <p>
                            probably about feelings, music, or why my plushies understand me better
                            than most humans.
                        </p>
                    </div>
                </article>

                <div className="text-center mt-8">
                    <Link
                        href="/stories"
                        className="text-sm font-mono hover:underline"
                        style={{ color: "#FF6CA4" }}
                    >
                        ← back to all stories
                    </Link>
                </div>
            </div>
        </div>
    );
}
