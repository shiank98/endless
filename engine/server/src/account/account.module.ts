import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountSchema } from './schemas/account.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtSecret } from '../env/jwt.env';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '24h' }
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
