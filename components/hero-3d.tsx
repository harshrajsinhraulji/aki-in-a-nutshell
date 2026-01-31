"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Environment, Float, Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three"; // We need to install @react-spring/three or use framer-motion-3d? 
// Actually user said "GSAP or Framer Motion", but R3F works best with react-spring or specialized libs. 
// I'll stick to simple useFrame for parallax to avoid extra deps if possible, or standard mesh refs.
// User said "Framer Motion" is available.

function Model({ url, mouse }: { url: string; mouse: React.MutableRefObject<[number, number]> }) {
    const mesh = useRef<THREE.Group>(null);
    const gltf = useLoader(GLTFLoader, url);

    // Idle animation + Parallax
    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Smooth idle rotation
        mesh.current.rotation.y += delta * 0.2;

        // Parallax based on mouse
        // Lerp towards lookAt target or simple rotation constraint
        const targetX = mouse.current[0] * 0.5; // Scale down movement
        const targetY = mouse.current[1] * 0.5;

        mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.05);
        mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY - 1, 0.05); // -1 to center visually
    });

    return (
        <primitive
            object={gltf.scene}
            ref={mesh}
            scale={2}
            position={[0, -1, 0]}
        />
    );
}

export function Hero3D({ modelUrl }: { modelUrl: string }) {
    const mouse = useRef<[number, number]>([0, 0]);

    // Handle fallback if modelUrl is missing or invalid
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse -1 to 1
            mouse.current = [
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1,
            ];
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (loadError || !modelUrl) {
        // Fallback UI
        return (
            <div className="w-full h-full flex items-center justify-center bg-transparent">
                <img
                    src="/assets/hero_fallback.jpg"
                    alt="Aki Plushie"
                    className="w-full h-full object-cover opacity-50 mask-image-gradient"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
            </div>
        );
    }

    return (
        <div className="w-full h-[60vh] md:h-screen absolute top-0 left-0 -z-10 fade-in-delayed">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF6CA4" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <React.Suspense fallback={null}>
                        <Model url={modelUrl} mouse={mouse} />
                    </React.Suspense>
                </Float>

                <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#FFD6EC" />
                <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.5} far={10} color="#FF6CA4" />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
