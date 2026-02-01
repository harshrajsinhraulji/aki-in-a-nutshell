"use client";

import { Mail } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 px-4 pb-20 flex flex-col items-center justify-center text-center">
            <div className="max-w-md">
                <h1 className="text-4xl font-heading font-bold mb-6 text-pink-500">Say Hello</h1>
                <p className="text-neutral-400 mb-8">
                    Got a question? Found a bug? Just want to say hi?
                </p>

                <a href="mailto:aki@example.com" className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-offwhite px-6 py-4 rounded-2xl transition-all">
                    <Mail size={20} />
                    <span>aki@example.com</span>
                </a>
            </div>
        </div>
    );
}
