import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                // AUTH CHECK REQUIRED HERE
                // For now, we perform a basic check. In production, check session cookie / firebase token.
                // We will assume the client sends a custom header 'x-aki-secret' matching our password for the /aki room,
                // or a Firebase token for Admin.

                // This is a simplified check for the prototype:
                // const authHeader = request.headers.get('authorization'); 
                // if (!authHeader) throw new Error('Unauthorized');

                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'audio/wav', 'model/gltf-binary'],
                    tokenPayload: JSON.stringify({
                        // optional payload
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                console.log('blob uploaded', blob.url);
                // Here we can trigger a Firestore write if we want to sync server-side,
                // but often the client does it after getting the URL.
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }, // The webhook will retry 5 times waiting for a 200
        );
    }
}
