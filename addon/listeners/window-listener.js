/**
 * window listener
 *
 * @class WindowListener
 */
export default class WindowListener {
  /**
   * adds the window on error listener
   *
   * @method listen
   * @param {Consumer} consumer
   */
  listen(consumer) {
    if (window) {
      window.onerror = (message, file, line, column, error) => {
        if (!error) {
          error = {
            message: message,
            name: error,
            stack: message + ' at ' + '\n' + file + ':' + line + ':' + column
          };
        }

        const errorLog = {
          source: 'window',
          timestamp: Date.now(),
          error
        };

        consumer.consumeError(errorLog);
      };
    }
  }
}
