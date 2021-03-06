import {camelCase, mapKeys, mapValues, snakeCase, has, isPlainObject, transform, isString} from 'lodash';

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
  static getError(error) {
    const defaultMessage = 'Unknown error';

    let message = has(error, 'response.data') && isString(error.response.data)
      ? error.response.data
      : defaultMessage;

    if (message === defaultMessage) {
      message = has(error, 'response.data.message')
        ? error.response.data.message
        : defaultMessage;
    }

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
  static getLaravelError(error, rule= '') {
    const defaultMessage = 'Unknown error';

    let message = (rule !== '' && has(error, 'response.data.errors.' + rule))
      ? error.response.data['errors'][rule][0]
      : defaultMessage;

    if (message === defaultMessage) {
      message = has(error, 'response.data.message')
        ? error.response.data.message
        : defaultMessage;
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

  /**
   * Convert to CamelCase.
   * @param {Object} data - Snake Case data format.
   * @returns {Object}
   */
  static toCamelCase(data) {
    return transform(data, (result, value, key) => {
      // Check if theres is a JSON child
      if (isPlainObject(value)) {
        const nKey = camelCase(key);
        // Recursive function
        result[nKey] = MainHelper.toCamelCase(value);
      } else {
        const nKey = camelCase(key);
        result[nKey] = value;
      }
    }, {});
  }

  static sendError(error) {
    throw error;
  }
}

export default MainHelper;
