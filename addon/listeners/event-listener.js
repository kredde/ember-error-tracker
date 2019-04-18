/**
 * adds event listeners
 *
 * @class EventListeners
 */
export default class EventListener {

  /**
   * adds an eventlisteners for a given event
   *
   * @method listen
   * @param {String} event
   * @param {Consumer} consumer
   */
  listen(event, consumer) {
    if (window) {
      window.addEventListener(event, consumer.consumeEvent, true);
    }
  }
}
