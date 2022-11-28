import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { QuoteClient } from './quote.client';

@Module({
  imports: [HttpModule],
  providers: [
    {
      useClass: QuoteService,
      provide: 'IQuoteService'
    },
    {
      useClass: QuoteClient,
      provide: 'IQuoteClient'
    }
  ],
  controllers: [QuoteController]
})
export class QuoteModule {}
