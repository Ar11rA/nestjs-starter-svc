import { Inject, Injectable } from '@nestjs/common';
import { IQuoteClient } from './interfaces/quote.client.interface';
import { IQuoteService } from './interfaces/quote.service.interface';
import { QuoteDTO } from './quote.dto';

@Injectable()
export class QuoteService implements IQuoteService {
  private quoteClient: IQuoteClient;

  constructor(@Inject('IQuoteClient') quoteClient: IQuoteClient) {
    this.quoteClient = quoteClient;
  }

  async fetchQuotes(count: number): Promise<QuoteDTO[]> {
    const promises = [...Array(count * 1).keys()].map(() => {
      return this.quoteClient.fetchQuote();
    });
    return await Promise.all(promises);
  }
}
