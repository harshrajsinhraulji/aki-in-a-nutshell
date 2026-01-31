import { put, del, list } from "@vercel/blob";

export const vercelBlob = {
    // Wrapper for common blob operations if needed, 
    // currently we use @vercel/blob directly in API routes but this provides a central point.
    put,
    del,
    list
};
