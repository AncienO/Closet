# Closet Post Creator Application (React + Appwrite)

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

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
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
