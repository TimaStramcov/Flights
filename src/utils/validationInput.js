export const validationInput = (value, callback) => {
    if (!!+value || value === '') {
      callback(value)
    } else {
      callback('')
    }
  }