// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    NEXT_PUBLIC_TMDB_API_KEY: string;
    NEXT_PUBLIC_TMDB_IMAGES_PREFIX: string;
    JWT_SECRET: string;
    MONGODB_USER: string;
    MONGODB_PASSWORD: string;
    MONGODB_CLUSTER: string;
    MONGODB_DB: string;
    MONGODB_APP_NAME: string;
  }
}
