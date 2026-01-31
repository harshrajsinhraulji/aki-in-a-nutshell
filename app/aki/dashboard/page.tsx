"use client";

import { BentoGrid, BentoGridItem } from "@/components/BentoGrid";
import { PenTool, Upload, Settings, BarChart, LogOut } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto px-6 pt-12">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-heading font-bold text-stardust-50">
                    Command <span className="text-neon-cyan">Center</span>
                </h1>
                <Link href="/" className="text-stardust-400 hover:text-white transition-colors">
                    <LogOut size={20} />
                </Link>
            </div>

            <BentoGrid>
                {/* Create Post */}
                <BentoGridItem
                    className="col-span-1 md:col-span-2 min-h-[200px] border-neon-purple/20 hover:border-neon-purple/50 bg-neon-purple/5 cursor-pointer"
                    title="New Confession"
                    description="Write something into the void."
                    icon={<PenTool className="text-neon-purple" />}
                    header={<div className="h-full w-full bg-gradient-to-br from-neon-purple/10 to-transparent rounded-xl" />}
                />

                {/* Upload */}
                <BentoGridItem
                    title="Upload Asset"
                    description="Drag & Drop support."
                    icon={<Upload className="text-neon-cyan" />}
                    header={<div className="h-full w-full bg-gradient-to-br from-neon-cyan/10 to-transparent rounded-xl border border-dashed border-neon-cyan/30" />}
                />

                {/* Analytics */}
                <BentoGridItem
                    title="Traffic"
                    description="12 Nocturnal Visitors tonight."
                    icon={<BarChart className="text-emerald-400" />}
                    header={<div className="h-full w-full bg-midnight-950 rounded-xl relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-emerald-500/10" />
                        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-emerald-500/20 clip-path-wave" />
                    </div>}
                />

                {/* Config */}
                <BentoGridItem
                    className="md:col-span-2"
                    title="System Config"
                    description="Adjust global variables."
                    icon={<Settings className="text-stardust-400" />}
                />
            </BentoGrid>
        </div>
    );
}
