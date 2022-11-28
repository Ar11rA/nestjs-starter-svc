import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { IQuoteClient } from './interfaces/quote.client.interface';
import { QuoteDTO } from './quote.dto';
import { retry, Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class QuoteClient implements IQuoteClient {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async fetchQuote(): Promise<QuoteDTO> {
    const observable: Observable<any> = this.httpService
      .get('https://api.quotable.io/random')
      .pipe(
        retry({
          count: 3,
          delay: 10000
        })
      );
    const response = await lastValueFrom(observable);
    return {
      content: response.data.content,
      author: response.data.author
    };
  }
}
