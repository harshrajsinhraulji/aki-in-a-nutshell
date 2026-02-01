"use client";

import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";

export default function AboutPage() {
    return (
        <PageShell>
            <div className="container mx-auto max-w-3xl">
                <PageHeader title="About Aki" subtitle="Just existing." />

                <div className="space-y-12">
                    {/* Minimal Text Block */}
                    <div className="prose prose-invert prose-lg mx-auto font-light text-luminous-200 leading-loose">
                        <p>
                            <span className="text-white font-normal">Hi, I&apos;m Aki.</span> I exist somewhere between 3am thoughts and the last train home.
                            I collect plushies because the world is too hard sometimes, and I code because
                            it&apos;s the only way to organize the chaos in my head.
                        </p>
                        <p>
                            This website is my digital bedroom. It&apos;s messy, it&apos;s personal, and it&apos;s 100% me.
                            Look around, leave a confession, or just listen to the rain.
                        </p>
                    </div>

                    {/* Minimal Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/5 pt-12">
                        {[
                            { label: "Status", value: "Online", color: "text-green-400" },
                            { label: "Mood", value: "Sleepy", color: "text-aki-pink" },
                            { label: "Location", value: "London", color: "text-white" },
                            { label: "Music", value: "Lofi", color: "text-aki-purple" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-xs text-luminous-500 uppercase tracking-widest mb-2">{stat.label}</div>
                                <div className={`text-lg font-heading ${stat.color}`}>{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center pt-12">
                        <Link href="/" className="text-luminous-500 hover:text-white transition-colors text-sm tracking-widest uppercase border-b border-transparent hover:border-white pb-1">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
