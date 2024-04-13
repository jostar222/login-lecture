const { createLogger, transports, format } = require("winston");
const { combine, label, timestamp, printf, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`
});

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드 맛보기",
        }),
        timestamp({
            format: "YYYY-DD-MM HH:mm:dd",
        }),
        printFormat,
    ),
    console: combine(
        colorize(),
        simple(),
    )
};

const opts = {
    file:  new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level: "info",
        format: printLogFormat.file,
    }),
    console: new transports.Console({
        level: "info",
        format: printLogFormat.console,
    }),
};

const logger = createLogger({
    transports: [
       opts.file,
    ],
});

if(process.env.NODE_ENV !== "production") {
    logger.add(
        opts.console,
    )
}

//morgan 같이 사용
logger.stream = {
    write: (message) => logger.info(message),
}

module.exports = logger;