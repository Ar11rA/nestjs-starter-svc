import { QuoteDTO } from '../quote.dto';

export interface IQuoteClient {
  fetchQuote(): Promise<QuoteDTO>;
}
