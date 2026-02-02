"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnnotationType = "arrow" | "circle" | "underline" | "highlight" | "star";

interface AnnotationProps {
    type?: AnnotationType;
    className?: string;
    color?: string;
    delay?: number;
    children?: React.ReactNode;
}

// Hand-drawn arrow SVG path
function ArrowAnnotation({ color, delay }: { color: string; delay: number }) {
    return (
        <motion.svg
            viewBox="0 0 100 50"
            className="w-16 h-8 absolute -right-20 top-1/2 -translate-y-1/2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
        >
            <motion.path
                d="M5 25 Q 30 5, 55 25 T 80 25 L 75 15 M 80 25 L 75 35"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay }}
                style={{ filter: "url(#hand-drawn)" }}
            />
            <defs>
                <filter id="hand-drawn">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                </filter>
            </defs>
        </motion.svg>
    );
}

// Hand-drawn circle SVG
function CircleAnnotation({ color, delay }: { color: string; delay: number }) {
    return (
        <motion.svg
            viewBox="0 0 120 60"
            className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay }}
        >
            <motion.ellipse
                cx="60"
                cy="30"
                rx="55"
                ry="25"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay }}
                style={{
                    strokeDasharray: "8 4",
                    filter: "url(#hand-drawn-2)"
                }}
            />
            <defs>
                <filter id="hand-drawn-2">
                    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
                </filter>
            </defs>
        </motion.svg>
    );
}

// Hand-drawn underline SVG
function UnderlineAnnotation({ color, delay }: { color: string; delay: number }) {
    return (
        <motion.svg
            viewBox="0 0 200 20"
            className="absolute -bottom-2 left-0 w-full h-3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
        >
            <motion.path
                d="M5 10 Q 50 5, 100 12 T 195 8"
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay }}
            />
        </motion.svg>
    );
}

// Highlight background
function HighlightAnnotation({ color, delay }: { color: string; delay: number }) {
    return (
        <motion.div
            className="absolute inset-0 -z-10 rounded-md"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            style={{
                backgroundColor: color,
                transformOrigin: "left",
                rotate: "-1deg",
            }}
        />
    );
}

// Star burst
function StarAnnotation({ color, delay }: { color: string; delay: number }) {
    return (
        <motion.div
            className="absolute -top-3 -right-3"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay }}
        >
            <span className="text-xl" style={{ color }}>✨</span>
        </motion.div>
    );
}

export function Annotation({
    type = "underline",
    className,
    color = "#FF6CA4",
    delay = 0,
    children
}: AnnotationProps) {
    const annotations: Record<AnnotationType, JSX.Element> = {
        arrow: <ArrowAnnotation color={color} delay={delay} />,
        circle: <CircleAnnotation color={color} delay={delay} />,
        underline: <UnderlineAnnotation color={color} delay={delay} />,
        highlight: <HighlightAnnotation color={color} delay={delay} />,
        star: <StarAnnotation color={color} delay={delay} />,
    };

    return (
        <span className={cn("relative inline-block", className)}>
            {children}
            {annotations[type]}
        </span>
    );
}

// Convenience components
export function AnnotatedText({
    children,
    underline = true,
    circle = false,
    highlight = false,
    arrow = false,
    star = false,
    color = "#FF6CA4",
    delay = 0,
}: {
    children: React.ReactNode;
    underline?: boolean;
    circle?: boolean;
    highlight?: boolean;
    arrow?: boolean;
    star?: boolean;
    color?: string;
    delay?: number;
}) {
    return (
        <span className="relative inline-block">
            {children}
            {underline && <UnderlineAnnotation color={color} delay={delay} />}
            {circle && <CircleAnnotation color={color} delay={delay + 0.2} />}
            {highlight && <HighlightAnnotation color={color} delay={delay} />}
            {arrow && <ArrowAnnotation color={color} delay={delay + 0.3} />}
            {star && <StarAnnotation color={color} delay={delay + 0.4} />}
        </span>
    );
}
