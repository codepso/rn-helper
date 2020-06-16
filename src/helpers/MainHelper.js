import has from 'lodash/has';
import {camelCase, mapKeys, mapValues, snakeCase} from 'lodash';

class MainHelper {

  static pct(percentage, value) {
    let temp = (percentage * value) / 100;
    return Math.round(temp);
  }

  /**
   * Get Errors.
   * @param {Object} error - Error.
   * @returns {string}
   */
  static getErrorMessage(error) {
    const defaultMessage = 'Unknown error';

    let message = has(error, 'response.data.message')
      ? error.response.data.message
      : defaultMessage;

    if (message === defaultMessage) {
      message = has(error, 'response.data.msg')
        ? error.response.data['msg']
        : defaultMessage;
    }

    if (message === defaultMessage) {
      message = has(error, 'message') ? error.message : defaultMessage;
    }

    return message;
  }

  /**
   * Get Laravel Errors.
   * @param {Object} error - Error.
   * @param {string} rule - Get error from Laravel.
   * @returns {string}
   */
  static getLaravelErrorMessage(error, rule= '') {
    const defaultMessage = 'Unknown error';

    let message = (rule !== '' && has(error, 'response.data.errors.' + rule))
      ? error.response.data['errors'][rule][0]
      : defaultMessage;

    if (message === defaultMessage) {
      message = has(error, 'message') ? error.message : defaultMessage;
    }

    if (message === 'Wrong number of segments') {
        message = 'Invalid Token';
    }
    return message;
  }

  static mergeModels(modelA, modelB) {
    return mapValues(modelA, function(value, key) {
      if (has(modelB, key)) {
        return modelB[key];
      }
      return value;
    });
  }

  static toSnakeCase(model) {
    return mapKeys(model, function(value, key) {
      return snakeCase(key);
    });
  }

  static toCamelCase(data) {
    return mapKeys(data, function(value, key) {
      return camelCase(key);
    });
  }

  static sendError(error) {
    throw error;
  }
}

export default MainHelper;
