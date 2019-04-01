import ErrorLogger from 'ember-error-tracker/error-logger'

export function initialize(application) {
  const ENV = application.resolveRegistration('config:environment');
  const logger = new ErrorLogger(ENV['ember-error-tracker'])
  logger.listen()
}
export default {
  initialize
};
