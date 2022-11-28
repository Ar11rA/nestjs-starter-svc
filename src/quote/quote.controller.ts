import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { IQuoteService } from './interfaces/quote.service.interface';

@Controller('quote')
export class QuoteController {
  quoteService: IQuoteService;

  constructor(@Inject('IQuoteService') quoteService: IQuoteService) {
    this.quoteService = quoteService;
  }

  @UseGuards(AuthGuard)
  @Get('/random')
  getUsers(@Query('count') count: number) {
    return this.quoteService.fetchQuotes(count);
  }
}
