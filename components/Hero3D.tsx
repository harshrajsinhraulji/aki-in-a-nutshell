"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion-3d";

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="text-aki-muted font-mono text-xs">{progress.toFixed(0)}%</div>
        </Html>
    );
}

function PlushieModel(props: any) {
    // Using a placeholder box until actual GLB is ready
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} {...props}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#FF6CA4" roughness={0.3} metalness={0.1} />
            </mesh>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <div className="w-full h-[50vh] md:h-[60vh] relative -mt-20 z-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={<Loader />}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} />
                    <PlushieModel position={[0, 0, 0]} />
                </Suspense>
            </Canvas>

            {/* Fallback/Overlay for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-aki-light to-transparent pointer-events-none" />
        </div>
    );
}
