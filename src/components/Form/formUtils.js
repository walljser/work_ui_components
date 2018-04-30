import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';

const setValue = function(value, keyParts, fieldValue) {
  const key = keyParts.shift()
  if (keyParts.length === 0) {
    value[key] = fieldValue
  } else {
    if (!isNaN(keyParts[0])) {
      if (isNil(value[key])) {
        value[key] = []
      }
    } else {
      if (isNil(value[key])) {
        value[key] = {}
      }
    }
    setValue(value[key], keyParts, fieldValue)
  }
}

export function getNewValues(val, fieldName, fieldValue) {
  const value = cloneDeep(val)
  const keyParts = fieldName.split('.')

  setValue(value, keyParts, fieldValue)

  return value
}
