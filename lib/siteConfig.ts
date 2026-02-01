export const siteConfig = {
    name: "Aki's World",
    description: "plushies, 03:14 confessions & travel scars",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    akiPassword: "akiupload", // In a real app, use env var or backend verify
    helplines: {
        uk: "116 123 (Samaritans)",
        us: "988",
    },
    microcopy: {
        hero: "plushies, 03:14 confessions & travel scars — posted honestly",
        confessionPlaceholder: "Tell me something wild. Max 500 characters. Keep it anonymous if you want.",
        adminLoginHint: "Authorized personnel only. Or Aki.",
    },
};
