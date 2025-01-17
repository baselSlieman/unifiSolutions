const winston = require('winston');
const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });
const logger = winston.createLogger({
                                level: 'info',
                                format: winston.format.combine( winston.format.timestamp({
                                    format: "MMM-DD-YYYY HH:mm:ss",
                                  }),myFormat),
                                defaultMeta: { service: 'user-service' },
                                transports: [
                                //
                                // - Write all logs with importance level of `error` or less to `error.log`
                                // - Write all logs with importance level of `info` or less to `combined.log`
                                //
                                new winston.transports.File({ filename: './logging/errors-'+new Date(Date.now()).toDateString()+'.log', level: 'error' }),
                                new winston.transports.File({ filename: './logging/logger-'+new Date(Date.now()).toDateString()+'.log' }),
                                ],
                            });
                          
                    



//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }


module.exports=logger;