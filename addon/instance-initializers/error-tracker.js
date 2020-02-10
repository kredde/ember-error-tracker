import ErrorLogger from 'ember-error-tracker/error-logger';

export function initialize(application) {
  const ENV = application.resolveRegistration('config:environment');
  const logger = ErrorLogger.create({customOptions: ENV['ember-error-tracker'], environment: ENV.environment});
  logger.listen();
}

export default { initialize };
