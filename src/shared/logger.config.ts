import winston, { format, transports } from 'winston';

export class LoggerConfig {
  private readonly options: winston.LoggerOptions;

  constructor() {
    this.options = {
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((msg) => {
          // implement generic or specific masking logic here
          return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
        })
      ),
      transports: [new transports.Console({ level: 'debug' })] // alert > error > warning > notice > info > debug
    };
  }

  public console(): object {
    return this.options;
  }
}
