import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';

import { db } from './env/database.env';
import { AppController } from './app/app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(db.uri, db.settings),
    AccountModule
  ],
  controllers: [AppController]
})
export class AppModule {}
