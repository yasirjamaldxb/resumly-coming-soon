# Resumly Landing Page

This is the official coming soon landing page for Resumly, a modern ATS friendly resume builder.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- [React Hook Form](https://react-hook-form.com/)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app).

Before deploying, you will need to set up Vercel KV and Vercel Blob stores and link them to your project. You will also need to set the following environment variables in your Vercel project:

- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`
- `BLOB_READ_WRITE_TOKEN`

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
