export const NEXT_PUBLIC_TMDB_API_KEY =
  process.env.NEXT_PUBLIC_TMDB_API_KEY || "key";

export const NEXT_PUBLIC_TMDB_IMAGES_PREFIX =
  process.env.NEXT_PUBLIC_TMDB_IMAGES_PREFIX || "http://www.google.com/images";

export const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

const MONGODB_USER = process.env.MONGODB_USER || "";
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER || "";
const MONGODB_DB = process.env.MONGODB_DB || "";
const MONGODB_APP_NAME = process.env.MONGODB_APP_NAME || "";

export const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DB}?retryWrites=true&w=majority&appName=${MONGODB_APP_NAME}`;

export const NODE_ENV = process.env.NODE_ENV || "development";
