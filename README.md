## Closet Post Creator Application (React + Appwrite)

github: https://github.com/AncienO/Closet.git

This is a full-stack web application that allows users to create, upload, and view posts with captions, images, tags, and locations. It uses React, TypeScript, Appwrite, and React Query.

## Features:

Create and update posts with captions, photos, location, and tags.

Real-time image uploading with Appwrite storage.

Infinite scroll using useInfiniteQuery.

Form validation using react-hook-form + zod.

State and data handling with React Query.

## Technologies Used:

React + TypeScript

Appwrite (Auth, Database, Storage)

React Query

Zod (schema validation)

React Hook Form

Tailwind CSS

## Required Dependencies:

Install these packages before running the app:
npm install react-router-dom @hookform/resolvers zod react-hook-form react-query tailwindcss classnames
npm install appwrite

If you’re using TypeScript, install types as well:
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

# Appwrite Setup

Create a new Appwrite project at Appwrite Cloud or your self-hosted Appwrite instance.

Add a Web platform with your local and deployed URLs (e.g., http://localhost:5173).

# Create a Database and add:

A collection for posts.

Attributes:

- creator (string)

- caption (string)

- imageUrl (string)

- imageId (string)

- location (string, optional)

- tags (string[], optional)

Create a Storage bucket for images.

Set read/write permissions (public or user-based as needed).

## Configuration:

Create an appwrite.config.ts file or similar to store credentials:

```js
export const appwriteConfig = {
  projectId: "YOUR_PROJECT_ID",
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: "YOUR_DATABASE_ID",
  postCollectionId: "YOUR_COLLECTION_ID",
  bucketId: "YOUR_BUCKET_ID",
};
```

Running the App:

- npm install
- npm run dev

Make sure your .env file includes:

```js
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT=your_project_id
```

If you run into any issues, check:

The Appwrite console logs

Console errors in the browser

That your Appwrite permissions are set correctly

Websites:
https://www.closet-fashion.com/
https://doron-pela.github.io/Closet-MPV/

Artificial Intelligence MVP:
https://github.com/doron-pela/Closet-MPV

Built by Jonathan Odonkor, Emmanuel Okine, Doron Pela.
