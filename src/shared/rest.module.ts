import { HttpModule, HttpService } from '@nestjs/axios';
import {
  Module,
  OnModuleInit,
  HttpException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
})
export class RestModule implements OnModuleInit {
  constructor(
    private httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) {
    this.logger = logger;
  }
  public onModuleInit() {
    const axios = this.httpService.axiosRef;
    axios.interceptors.request.use(function (config) {
      config['metadata'] = { ...config['metadata'], startDate: new Date() };
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration =
          config['metadata'].endDate.getTime() -
          config['metadata'].startDate.getTime();
        this.logger.info(
          `HTTP Request ${config.method.toUpperCase()} ${config.url} ${duration}ms`,
        );
        return response;
      },
      (err) => {
        this.logger.error(`Error in http post processing: ${err.message}`);
        throw new InternalServerErrorException('Failure in processing HTTP calls!');
      },
    );
  }
}
