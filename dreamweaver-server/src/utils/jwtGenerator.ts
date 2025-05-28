import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiryInSeconds = process.env.JWT_EXPIRY_TIME;

if (!secret) throw new Error("Missing JWT_SECRET in environment variables");
if (!expiryInSeconds) throw new Error("Missing JWT_EXPIRY_TIME in environment variables");

export const generateJwt = (payload: { data?: { [key: string]: any }; sub?: string }): { token: string } => {
  const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    issuer: 'DreamWeaver',
    expiresIn: Number(expiryInSeconds),
  });

  return { token };
};

export const verifyJwt = (jwtToken: string): string | jwt.JwtPayload => {
  const decoded = jwt.verify(jwtToken, secret, {
    algorithms: ['HS256'],
    issuer: 'DreamWeaver',
  });

  return decoded;
};
