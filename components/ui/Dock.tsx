"use client";

import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import React from "react";

export function Dock({ children, className }: { children: React.ReactNode; className?: string }) {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={className}
        >
            {React.Children.map(children, (child) => {
                // Determine if child is valid React element to pass mouseX
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, { mouseX });
                }
                return child;
            })}
        </motion.div>
    );
}

export function DockItem({ mouseX, children, className }: { mouseX?: MotionValue; children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const dummy = useMotionValue(Infinity);
    const distance = useTransform(mouseX || dummy, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.5, 1]); // Scale from 1 to 1.5
    const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ scale }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
