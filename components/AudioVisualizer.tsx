"use client";

import { useRef, useEffect } from 'react';
import { useAudio } from '@/lib/audio-context';

export function AudioVisualizer({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { analyser, isPlaying } = useAudio();
    const animationRef = useRef<number>();

    useEffect(() => {
        if (!canvasRef.current || !analyser) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!isPlaying) {
                // Clear canvas if paused
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Optional: Draw a flat line
                // ...
                return;
            }

            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2; // Scale down

                // Dreamy Gradient Color
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#f9a8d4'); // Pink-300
                gradient.addColorStop(1, '#a855f7'); // Purple-500

                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        };

        if (isPlaying) {
            draw();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [analyser, isPlaying]);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={50}
            className={className}
        />
    );
}
