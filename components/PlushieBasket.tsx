"use client";

import { useBasket } from "@/components/BasketProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Ghost } from "lucide-react";

export function PlushieBasket() {
    const { basket, removeFromBasket, isOpen, setIsOpen } = useBasket();

    return (
        <>
            {/* Basket Toggle Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-20 z-50 w-12 h-12 bg-dream-900 border border-white/10 rounded-full flex items-center justify-center shadow-xl hover:border-aki-pink/50 transition-colors"
            >
                <ShoppingBag size={20} className="text-luminous-300" />
                {basket.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-aki-pink text-black text-xs font-bold rounded-full flex items-center justify-center">
                        {basket.length}
                    </span>
                )}
            </motion.button>

            {/* Basket Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="fixed inset-y-0 right-0 z-[100] w-80 bg-dream-950/95 backdrop-blur-xl border-l border-white/5 p-6 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-heading text-xl text-white flex items-center gap-2">
                                <Ghost className="text-aki-pink" />
                                Your Loots
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-luminous-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {basket.length === 0 ? (
                            <div className="text-center py-10 text-luminous-500 font-light">
                                <p>Your basket is empty.</p>
                                <p className="text-sm mt-2">Go steal some plushies!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {basket.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={item.id}
                                        className="bg-white/5 p-4 rounded-xl flex items-center justify-between group"
                                    >
                                        <span className="font-medium text-luminous-200">{item.name}</span>
                                        <button
                                            onClick={() => removeFromBasket(item.id)}
                                            className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-wider"
                                        >
                                            Return
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-center text-xs text-luminous-600 font-mono">
                                These are digital collectibles. <br /> Do not eat them.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
