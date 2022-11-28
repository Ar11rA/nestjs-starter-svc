import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './shared/database.module';
import { LoggerConfig } from './shared/logger.config';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { QuoteModule } from './quote/quote.module';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    WinstonModule.forRoot(logger.console()),
    UsersModule,
    AuthModule,
    DatabaseModule,
    QuoteModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
