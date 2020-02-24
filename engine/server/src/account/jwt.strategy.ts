import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from '../env/jwt.env';

/**
 * This JWT Strategy handles the authentication validation via a Passport Strategy (JWT).
 * @version 1.0.0
 * @extends {PassportStrategy}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  /**
   * The constructor for the JWT Strategy controller.
   * @version 1.0.0
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Validation function for the JWT strategy.
   * @version 1.0.0
   * @param {Object} payload - Object containing payload sub and username.
   */ 
  async validate(payload: any) {
    return { _id: payload.sub, email: payload.email };
  }
}
