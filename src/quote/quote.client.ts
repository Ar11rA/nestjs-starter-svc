import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { IQuoteClient } from './interfaces/quote.client.interface';
import { QuoteDTO } from './quote.dto';
import { retry, Observable, lastValueFrom, tap } from 'rxjs';
import { randomQuotes } from './quote.constants';

@Injectable()
export class QuoteClient implements IQuoteClient {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async fetchQuote(): Promise<QuoteDTO> {
    const observable: Observable<any> = this.httpService
      .get(randomQuotes.API_URL)
      .pipe(
        retry({
          count: randomQuotes.RETRY_COUNT,
          delay: randomQuotes.BACKOFF
        })
      );
    const response = await lastValueFrom(observable);
    return {
      content: response.data.content,
      author: response.data.author
    };
  }
}
