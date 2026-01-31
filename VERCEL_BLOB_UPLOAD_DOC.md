# Vercel Blob Uploads

We use **Vercel Blob** for storing images, audio, and 3D models.

## How it works

1.  **Client-Side**: The `<UploadForm>` or `<AkiUploadWall>` component selects a file.
2.  **Server Auth**: It calls `/api/upload/route.ts` to get a temporary upload token.
3.  **Direct Upload**: The browser uploads the file directly to Vercel's global CDN.
4.  **Database Sync**: Once uploaded, we get a URL (e.g., `https://public.blob.vercel-storage.com/...`). We save this URL to Firestore.

## Manual Uploads (Admin)

If you need to upload assets manually (like the Hero 3D model):

1.  Go to your Vercel Dashboard.
2.  Open the Project > **Storage** > **aki-blob**.
3.  Click **"Browse"** then **"Upload"**.
4.  Upload your file (e.g., `aki_plush.glb`).
5.  Copy the URL.
6.  Update your `seed.json` or Firestore document with this new URL.

## Configuration

Ensure `BLOB_READ_WRITE_TOKEN` is set in your `.env.local`.
