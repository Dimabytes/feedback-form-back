import winston, {format} from 'winston';

const timezoned = () => {
  return new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow'
  });
};

const logFormat = winston.format.printf(info => {
  return `${JSON.stringify(
    {
      log: info.message,
      datetime: info.timestamp
    },
    null,
    2
  )}\n`;
});

const logger = winston.createLogger({
  format: format.combine(format.timestamp({format: timezoned}), format.json()),
  transports: [
    new winston.transports.File({filename: './log/error.log', format: logFormat, level: 'error'}),
    new winston.transports.File({filename: './log/info.log', format: logFormat, level: 'info'}),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat)
    })
  ]
});

export default logger;
