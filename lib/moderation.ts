export const PROFANITY_LIST = [
    "damn", "hell", "fuck", "shit", "bitch", "crap", "ass", "bastard"
    // Add more as needed
];

export const SELF_HARM_KEYWORDS = [
    "kill myself",
    "suicide",
    "want to die",
    "end it all",
    "better off dead",
    "hurt myself",
    "cutting myself",
    "take my own life",
    "disappearing",
    "disappear"
];

export function checkModeration(text: string): { flagged: boolean; reason: string | null; isSelfHarm: boolean } {
    const lowerText = text.toLowerCase();

    // Check Self Harm (High Priority)
    for (const keyword of SELF_HARM_KEYWORDS) {
        if (lowerText.includes(keyword)) {
            return { flagged: true, reason: 'self_harm', isSelfHarm: true };
        }
    }

    // Check Profanity
    for (const word of PROFANITY_LIST) {
        if (lowerText.includes(word)) { // Simple inclusion check, regex would be better for whole words
            return { flagged: true, reason: 'profanity', isSelfHarm: false };
        }
    }

    return { flagged: false, reason: null, isSelfHarm: false };
}
