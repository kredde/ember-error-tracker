export default class WindowListener {

  listen(consumer) {
    window.onerror = (message, file, line, column, error) => {
      if (!error) {
        error = {
          message: message,
          name: error,
          stack: message + ' at ' + "\n" + file + ':' + line + ':' + column
        };
      }

      const errorLog = {
        source: 'window',
        timestamp: Date.now(),
        error
      }

      consumer.consumeError(errorLog)
    }
  }
}
