import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Aki 💌",
    description: "Reach out to Aki — for collabs, questions, or just to say hi.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-2xl mx-auto">
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        <span style={{ color: "#FF6CA4" }}>contact</span> 💌
                    </h1>
                    <p className="text-lg" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        say hi! (i promise i&apos;ll eventually reply)
                    </p>
                </header>

                {/* Contact Form */}
                <div className="glass rounded-2xl p-8 mb-8">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "#121212" }}>
                                your name (or alias)
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="anonymous plushie fan"
                                className="w-full p-3 rounded-xl border-2 border-transparent focus:border-pink-300 bg-white/50"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#121212" }}>
                                email (optional)
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="if you want a reply..."
                                className="w-full p-3 rounded-xl border-2 border-transparent focus:border-pink-300 bg-white/50"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "#121212" }}>
                                your message
                            </label>
                            <textarea
                                id="message"
                                placeholder="tell me something nice (or weird, i don't judge)"
                                className="w-full p-3 rounded-xl border-2 border-transparent focus:border-pink-300 bg-white/50 resize-none"
                                style={{ minHeight: "150px" }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary py-3"
                            disabled
                        >
                            send message ✨
                        </button>

                        <p className="text-center text-xs" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                            (form submissions coming soon)
                        </p>
                    </form>
                </div>

                {/* Alternative Contact */}
                <div className="text-center space-y-4">
                    <p className="text-sm" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        or find me elsewhere on the internet:
                    </p>
                    <div className="flex justify-center gap-4">
                        <span className="text-2xl cursor-not-allowed opacity-50" title="coming soon">📧</span>
                        <span className="text-2xl cursor-not-allowed opacity-50" title="coming soon">🐦</span>
                        <span className="text-2xl cursor-not-allowed opacity-50" title="coming soon">📸</span>
                    </div>
                    <p className="text-xs font-mono" style={{ color: "rgba(18, 18, 18, 0.4)" }}>
                        (social links coming eventually)
                    </p>
                </div>

                <div className="text-center mt-12">
                    <p className="text-sm font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        ✦ response time: somewhere between 5 minutes and 5 months ✦
                    </p>
                </div>
            </div>
        </div>
    );
}
