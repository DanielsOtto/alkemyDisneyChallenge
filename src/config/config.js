import dotenv from 'dotenv';

dotenv.config();

// puerto
export const PORT = process.env.PORT || 8000;

// encriptado
export const SALT_ROUNTS = process.env.SALT_ROUNTS;
export const LINE_SECRET = process.env.LINE_SECRET;
export const HASH_SECURITY = process.env.HASH_SECURITY;
export const HASH_SECRET = process.env.HASH_SECURITY + process.env.SALT_ROUNDS + process.env.LINE_SECRET;

// token
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const EXPIRES = 60 * 60 * 2;

// database
export const DB = process.env.DATABASE;
export const USER_DB = process.env.USER_DB;
export const USER_PASS = process.env.USER_PASS;
export const DB_HOST = process.env.DB_HOST;
export const DB_DIALECT = process.env.DB_DIALECT;