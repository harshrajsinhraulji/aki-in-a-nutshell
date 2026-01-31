export const siteConfig = {
    name: "Aki",
    age: 18,
    birthday: "2008-01-09",
    location: "Sri Lanka → England",
    discord: "aki.in.a.nutshell",
    hero: {
        title: "Hello. I'm Aki.",
        subline: "plushies, 03:14 confessions & travel scars — posted honestly",
    },
    microcopy: {
        confessionPlaceholder: "Tell me something wild. Max 500 characters. Keep it anonymous if you want.",
        plushieAdd: "Add a plushie — name it and tell its trauma",
        adminLoginHint: "Owner access only — ask Aki for the secret email",
    },
    helplines: {
        uk: "Samaritans: 116 123 | Papyrus: 0800 068 4141",
    },
    // Default password, can be overridden by user in localStorage logic if we built a setting for it,
    // but requirements say "password stored in siteConfig and changeable in code".
    akiPasswordDefault: "akiupload",
};
