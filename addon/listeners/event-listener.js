export default class EmberListener {

  listen(event, consumer) {

    if (window) {
      window.addEventListener(event, consumer.consumeEvent, true);
    }
  }
}
