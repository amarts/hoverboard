/* @polymerMixin */
export const UtilsFunctions = (subclass) =>
  class extends subclass {
    transformToArray(source, attribute) {
      return (
        source &&
        Object.keys(source).map((key) =>
          Object.assign(attribute ? { [attribute]: key } : {}, source[key])
        )
      );
    }

    getDate(date) {
      return new Date(date).toLocaleString('{$ dateFormat.locale $}', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }

    isEmpty(array) {
      return !array || !array.length;
    }

    randomOrder(array) {
      return array.sort(() => 0.5 - Math.random());
    }

    generateClassName(value) {
      return value
        ? value
            .replace(/\W+/g, '-')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2')
            .toLowerCase()
        : '';
    }

    slice(text, number) {
      return text && text.slice(0, number);
    }

    isEqual(string1, string2) {
      return string1 === string2;
    }

    getVariableColor(value, fallback) {
      const calculated = ShadyCSS
        ? ShadyCSS.getComputedStyleValue(this, `--${this.generateClassName(value)}`)
        : getComputedStyle(this, `--${this.generateClassName(value)}`);
      return calculated || (fallback && this.getVariableColor(fallback));
    }

    parseQueryParamsFilters(queryParams) {
      return queryParams
        .split('&')
        .map((query) => query.split('='))
        .filter((filter) => filter[0] && filter[1])
        .reduce(
          (aggr, filter) =>
            Object.assign({}, aggr, {
              [filter[0]]: aggr[filter[0]] ? aggr[filter[0]].concat(filter[1]) : [filter[1]],
            }),
          {}
        );
    }

    toggleQueryParam(currentQueryParams, key, value) {
      const keyValue = `${key}=${value}`;
      const currentKeyValuePairs = currentQueryParams ? currentQueryParams.split('&') : [];
      const resultArray = currentKeyValuePairs.includes(keyValue)
        ? currentKeyValuePairs.filter((pair) => pair !== keyValue)
        : currentKeyValuePairs.concat(keyValue);
      return resultArray.join('&');
    }
  };
