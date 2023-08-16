import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class DecodedTokenMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) throw new Error('No token provided');

    try {
      const decoded = await this.getUserByToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  async getUserByToken(token: string) {
    const secret = this.config.get('JWT_SECRET');
    const decoded = this.jwt.verifyAsync(token, { secret });
    const user = decoded;

    return user;
  }
}
