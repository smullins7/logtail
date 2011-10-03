exports.settings = {
    logDirs: ["/tmp"],
    logFileName: "*log",
    lineRE: /^[^|]+\|([A-Z]+)\|.*$/m,
    fieldColors: {
        "DEBUG": ["grey"],
        "INFO": ["green"],
        "WARNING": ["yellow", "bold"],
        "ERROR": ["red"],
        "CRITICAL": ["red", "bold"],
    },
    defaultColor: ["white"]
};
