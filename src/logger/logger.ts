import winston, { format } from 'winston';
import config from '../config/config';
const { combine, timestamp, label, printf } = format;

const transports = [];
if(process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console()
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    // winston.format.timestamp({
    //   format: 'YYYY-MM-DD HH:mm:ss'
    // }),
    // winston.format.errors({ stack: true }),
    // winston.format.splat(),
    // winston.format.colorize(),
    // winston.format.simple(),
    format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => `${info.level} ${info.timestamp}:${info.message}`)
    
  ),
  transports: [new winston.transports.Console()]
});

export default LoggerInstance;