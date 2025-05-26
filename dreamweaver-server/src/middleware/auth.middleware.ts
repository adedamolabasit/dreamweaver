// // src/middleware/auth.middleware.ts
// import { Request, Response, NextFunction } from 'express';
// import { verifyMessage } from '@tomowallet/sdk';

// export const authenticateWallet = (req: Request, res: Response, next: NextFunction) => {
//   const { signature, address } = req.headers;
//   if (!verifyMessage(address as string, signature as string)) {
//     throw new Error('Invalid wallet signature');
//   }
//   next();
// };