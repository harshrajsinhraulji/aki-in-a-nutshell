"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

interface Hero3DProps {
    isVisible: boolean;
    lowPower?: boolean;
}

// Cute procedural plushie made with basic geometries
function PlushieModel() {
    const groupRef = useRef<THREE.Group>(null);

    // Gentle floating animation
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <group ref={groupRef} scale={1.2}>
                {/* Body - main sphere */}
                <mesh position={[0, 0, 0]} castShadow>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color="#FFD6EC"
                        roughness={0.9}
                        metalness={0}
                    />
                </mesh>

                {/* Left ear */}
                <mesh position={[-0.6, 0.9, 0]} castShadow>
                    <sphereGeometry args={[0.35, 24, 24]} />
                    <meshStandardMaterial color="#FF6CA4" roughness={0.85} />
                </mesh>
                {/* Left ear inner */}
                <mesh position={[-0.6, 0.9, 0.2]}>
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshStandardMaterial color="#FFD6EC" roughness={0.9} />
                </mesh>

                {/* Right ear */}
                <mesh position={[0.6, 0.9, 0]} castShadow>
                    <sphereGeometry args={[0.35, 24, 24]} />
                    <meshStandardMaterial color="#FF6CA4" roughness={0.85} />
                </mesh>
                {/* Right ear inner */}
                <mesh position={[0.6, 0.9, 0.2]}>
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshStandardMaterial color="#FFD6EC" roughness={0.9} />
                </mesh>

                {/* Left eye */}
                <mesh position={[-0.32, 0.15, 0.88]}>
                    <sphereGeometry args={[0.14, 16, 16]} />
                    <meshStandardMaterial color="#121212" />
                </mesh>
                {/* Left eye shine */}
                <mesh position={[-0.28, 0.22, 0.98]}>
                    <sphereGeometry args={[0.04, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

                {/* Right eye */}
                <mesh position={[0.32, 0.15, 0.88]}>
                    <sphereGeometry args={[0.14, 16, 16]} />
                    <meshStandardMaterial color="#121212" />
                </mesh>
                {/* Right eye shine */}
                <mesh position={[0.36, 0.22, 0.98]}>
                    <sphereGeometry args={[0.04, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

                {/* Nose */}
                <mesh position={[0, -0.1, 0.98]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#FF6CA4" />
                </mesh>

                {/* Smile - curved line using torus */}
                <mesh position={[0, -0.28, 0.9]} rotation={[0.2, 0, 0]}>
                    <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
                    <meshStandardMaterial color="#121212" />
                </mesh>

                {/* Left blush */}
                <mesh position={[-0.55, -0.05, 0.78]} rotation={[0, 0.3, 0]}>
                    <circleGeometry args={[0.12, 16]} />
                    <meshBasicMaterial color="#FF6CA4" opacity={0.5} transparent />
                </mesh>

                {/* Right blush */}
                <mesh position={[0.55, -0.05, 0.78]} rotation={[0, -0.3, 0]}>
                    <circleGeometry args={[0.12, 16]} />
                    <meshBasicMaterial color="#FF6CA4" opacity={0.5} transparent />
                </mesh>

                {/* Little arms */}
                <mesh position={[-0.85, -0.3, 0.3]} rotation={[0, 0, 0.5]}>
                    <capsuleGeometry args={[0.15, 0.3, 8, 16]} />
                    <meshStandardMaterial color="#FFD6EC" roughness={0.9} />
                </mesh>
                <mesh position={[0.85, -0.3, 0.3]} rotation={[0, 0, -0.5]}>
                    <capsuleGeometry args={[0.15, 0.3, 8, 16]} />
                    <meshStandardMaterial color="#FFD6EC" roughness={0.9} />
                </mesh>

                {/* Sparkle decorations */}
                <mesh position={[0.8, 1.2, 0]}>
                    <octahedronGeometry args={[0.08]} />
                    <meshBasicMaterial color="#FFE27A" />
                </mesh>
                <mesh position={[-0.9, 0.5, 0.5]}>
                    <octahedronGeometry args={[0.06]} />
                    <meshBasicMaterial color="#00E6A8" />
                </mesh>
                <mesh position={[0.5, 0.3, -0.8]}>
                    <octahedronGeometry args={[0.07]} />
                    <meshBasicMaterial color="#FF6CA4" />
                </mesh>
            </group>
        </Float>
    );
}

function LoadingFallback() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-aki-light-pink border-t-aki-pink animate-spin" />
        </div>
    );
}

export default function Hero3D({ isVisible, lowPower = false }: Hero3DProps) {
    // Low power mode: show static emoji
    if (lowPower) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-[400px] flex items-center justify-center"
            >
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-aki-light-pink to-aki-soft-pink flex items-center justify-center shadow-2xl">
                    <span className="text-8xl" role="img" aria-label="Plushie">🧸</span>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[400px] md:h-[500px]"
        >
            <Suspense fallback={<LoadingFallback />}>
                <Canvas
                    camera={{ position: [0, 0, 4.5], fov: 45 }}
                    style={{ background: "transparent" }}
                    gl={{ alpha: true, antialias: true }}
                >
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
                    <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#FF6CA4" />
                    <pointLight position={[0, 2, 3]} intensity={0.3} color="#FFE27A" />

                    <PlushieModel />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.8}
                        minPolarAngle={Math.PI / 3}
                        autoRotate
                        autoRotateSpeed={0.8}
                    />

                    <Environment preset="sunset" />
                </Canvas>
            </Suspense>
        </motion.div>
    );
}
