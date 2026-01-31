"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Loader2, Trash2, Upload, Plus } from "lucide-react";

export default function AdminSongsPage() {
    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [newTitle, setNewTitle] = useState("");
    const [newArtist, setNewArtist] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const fetchSongs = async () => {
        setLoading(true);
        const q = query(collection(db, "songs"), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        setSongs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !newTitle) return;

        try {
            setUploading(true);

            // 1. Upload File
            const storageRef = ref(storage, `songs/${Date.now()}-${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // 2. Create Firestore Doc
            await addDoc(collection(db, "songs"), {
                title: newTitle,
                artist: newArtist,
                fileUrl: downloadURL,
                storagePath: snapshot.ref.fullPath,
                isPublic: true,
                order: songs.length + 1,
                createdAt: new Date()
            });

            // Reset
            setNewTitle("");
            setNewArtist("");
            setFile(null);
            fetchSongs();
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Check console.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, storagePath?: string) => {
        if (!confirm("Are you sure?")) return;

        try {
            await deleteDoc(doc(db, "songs", id));
            if (storagePath) {
                const fileRef = ref(storage, storagePath);
                await deleteObject(fileRef).catch(e => console.warn("File delete fail", e));
            }
            // Update local state
            setSongs(prev => prev.filter(s => s.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-heading font-bold mb-8">Manage Songs</h1>

            {/* Upload Form */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-12">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Plus size={18} /> Add New Track
                </h3>
                <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="bg-black/20 border border-white/10 rounded-lg p-2"
                        placeholder="Song Title"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        required
                    />
                    <input
                        className="bg-black/20 border border-white/10 rounded-lg p-2"
                        placeholder="Artist"
                        value={newArtist}
                        onChange={e => setNewArtist(e.target.value)}
                    />
                    <div className="col-span-full border-2 border-dashed border-white/10 rounded-lg p-4 text-center cursor-pointer hover:bg-white/5 transition-colors">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                            className="w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={uploading || !file}
                        className="col-span-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {uploading ? <Loader2 className="animate-spin" /> : <Upload size={18} />}
                        Upload Track
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="space-y-2">
                {songs.map((song) => (
                    <div key={song.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-dark rounded flex items-center justify-center text-xs">🎵</div>
                            <div>
                                <div className="font-bold">{song.title}</div>
                                <div className="text-xs text-muted-foreground">{song.artist}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(song.id, song.storagePath)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
