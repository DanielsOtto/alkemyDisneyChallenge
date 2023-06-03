import jwt from 'jsonwebtoken';
import { EXPIRES, TOKEN_SECRET } from '../config/config.js';

export function generateToken({ id, email }) {
  return jwt.sign({
    id,
    email
  }, TOKEN_SECRET, {
    expiresIn: EXPIRES
  });
}

export function verifyToken(token) {
  return jwt.verify(token, TOKEN_SECRET);
}