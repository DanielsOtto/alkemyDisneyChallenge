import dotenv from 'dotenv';


dotenv.config();

export const PORT = process.env.PORT || 8000;

export const SALT_ROUNTS = process.env.SALT_ROUNTS;
export const LINE_SECRET = process.env.LINE_SECRET;
export const HASH_SECURITY = process.env.HASH_SECURITY;
export const HASH_SECRET = process.env.HASH_SECURITY + process.env.SALT_ROUNDS + process.env.LINE_SECRET;


export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const EXPIRES = 60 * 60 * 2;