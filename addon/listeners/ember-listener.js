import EmberObject from '@ember/object';

/**
 * Listens to error events triggered by ember
 *
 * @class EmberListeners
 */
export default class EmberListener extends EmberObject {
  /**
   * initializes ember error listeners
   *
   * @method listen
   * @param consumer
   * @param options
   */
  listen(consumer, options, env) {
    // consume RSVP errors
    if (options.rsvp) {
      // eslint-disable-next-line
      Ember.RSVP.onerror = function(error) {
        const errorLog = {
          source: 'ember-rsvp',
          timestamp: Date.now(),
          error: {
            message: error.message,
            stack: error.stack
          }
        };
        consumer.consumeError(errorLog);

        // throw error while testing to not break test cases
        if (env === 'test') {
          throw error;
        }
      };
    }

    // consume ember errors
    if (options.ember) {
      // eslint-disable-next-line
      Ember.onerror = (error) => {
        const errorLog = {
          source: 'ember',
          timestamp: Date.now(),
          error: {
            message: error.message,
            stack: error.stack
          }
        };
        consumer.consumeError(errorLog);

        // throw error while testing to not break test cases
        if (env === 'test') {
          throw error;
        }
      };
    }

    // consume action errors
    if (options.actions) {
      // eslint-disable-next-line
      Ember.ActionHandler.reopen({
        send: function(actionName) {
          try {
            // eslint-disable-next-line
            this._super.apply(this, arguments);
          } catch (error) {
            const errorLog = {
              source: `ember-action:${actionName}`,
              timestamp: Date.now(),
              error: {
                message: error.message,
                stack: error.stack
              }
            };
            consumer.consumeError(errorLog);

            // throw error while testing to not break test cases
            if (env === 'test') {
              throw error;
            }
          }
        }
      });
    }
  }
}
