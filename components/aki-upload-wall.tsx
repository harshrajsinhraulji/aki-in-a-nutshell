"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client"; // Client-side helper
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";

export function AkiUploadWall() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [caption, setCaption] = useState("");

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!inputFileRef.current?.files) {
            alert("No file selected");
            return;
        }

        const file = inputFileRef.current.files[0];
        setUploading(true);

        try {
            // 1. Upload to Vercel
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload', // Secure server-side token gen
            });

            // 2. Save to Firestore
            await addDoc(collection(db, "akiUploads"), {
                imageUrl: newBlob.url,
                caption: caption,
                createdAt: serverTimestamp(),
                createdBy: "aki"
            });

            alert("Uploaded!");
            setCaption("");
            if (inputFileRef.current) inputFileRef.current.value = "";

        } catch (error) {
            console.error(error);
            alert("Upload failed. Check console.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12">
            <div className="container mx-auto max-w-lg">
                <h1 className="text-3xl font-bold mb-8 text-pink-500">Private Wall</h1>

                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
                    <form onSubmit={handleUpload} className="space-y-4">
                        <div className="border-2 border-dashed border-neutral-700 rounded-2xl p-8 text-center hover:border-pink-500 transition cursor-pointer" onClick={() => inputFileRef.current?.click()}>
                            <input name="file" ref={inputFileRef} type="file" required className="hidden" accept="image/*" />
                            <div className="flex flex-col items-center gap-2 text-neutral-400">
                                <ImageIcon />
                                <span>Select Image</span>
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full bg-black/50 border border-neutral-700 p-3 rounded-xl text-offwhite"
                        />

                        <button
                            disabled={uploading}
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {uploading ? <Loader2 className="animate-spin" /> : <Upload size={20} />}
                            {uploading ? "Uploading..." : "Post to Wall"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
