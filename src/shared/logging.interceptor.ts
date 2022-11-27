import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject
} from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    this.logger.info(
      `Starting ${request.method} - ${request.originalUrl} - ${JSON.stringify(
        request.body
      )}`
    );
    this.logger.info(`Request Query Params ${JSON.stringify(request.query)}`);

    const now = Date.now();
    return next.handle().pipe(
      tap((response) => {
        if (response) {
          this.logger.info(`Response ${JSON.stringify(response)}`);
        }
        this.logger.info(
          `Ending ${request.method} - ${request.originalUrl}: ${
            Date.now() - now
          }ms`
        );
      })
    );
  }
}
