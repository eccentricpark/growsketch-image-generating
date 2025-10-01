import { createLogger, transports, format } from "winston";

// 일반 로그
export const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.colorize(), // 색상 추가
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console({level: 'info'}),
      new transports.File({ filename: './logs/combined.log', level: 'info' })
    ]
});

// 에러 로그
export const errorLogger = createLogger({
    level: 'error',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console({ level: 'error' }),
      new transports.File({ filename: './logs/error.log', level: 'error' }),
    ]
});
