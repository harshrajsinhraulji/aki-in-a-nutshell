"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client"; // Client-side helper
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";

export function AkiUploadWall() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [mood, setMood] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!inputFileRef.current?.files?.[0]) {
            setStatus("Please select a file.");
            return;
        }

        const file = inputFileRef.current.files[0];
        setUploading(true);
        setStatus("Uploading to Vercel Blob...");

        try {
            // 1. Upload to Blob
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });

            setStatus("Saving metadata...");

            // 2. Save to Firestore
            await addDoc(collection(db, "akiUploads"), {
                imageUrl: newBlob.url,
                caption: mood,
                createdAt: serverTimestamp(),
                createdBy: "aki",
                type: file.type.startsWith("image") ? "image" : "other"
            });

            setStatus("Success! Uploaded.");
            setMood("");
            if (inputFileRef.current) inputFileRef.current.value = "";
        } catch (e: any) {
            console.error(e);
            setStatus(`Error: ${e.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-dark/30 rounded-3xl border border-neutral-800">
            <h3 className="text-xl font-heading text-pink-500 mb-6">Upload New Memory</h3>

            <form onSubmit={handleUpload} className="space-y-6">
                {/* File Input */}
                <div
                    className="border-2 border-dashed border-neutral-700 hover:border-pink-500/50 rounded-2xl p-8 text-center cursor-pointer transition-colors"
                    onClick={() => inputFileRef.current?.click()}
                >
                    <input
                        name="file"
                        ref={inputFileRef}
                        type="file"
                        accept="image/*,audio/*,.glb"
                        className="hidden"
                        required
                    />
                    <Upload className="mx-auto w-10 h-10 text-neutral-500 mb-2" />
                    <p className="text-neutral-400">Click to select file</p>
                </div>

                {/* Mood / Caption */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-2">Mood / Caption</label>
                    <textarea
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="w-full bg-dark border border-neutral-700 rounded-xl p-3 text-offwhite focus:border-pink-500 focus:outline-none h-24"
                        placeholder="What's this about?"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-mint-500 hover:bg-mint-400 text-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                    {uploading && <Loader2 className="animate-spin" />}
                    {uploading ? "Uploading..." : "Post to Wall"}
                </button>

                {status && (
                    <p className={`text-center text-sm ${status.includes("Error") ? "text-red-400" : "text-green-400"}`}>
                        {status}
                    </p>
                )}
            </form>
        </div>
    );
}
