import { confirmModal } from './modals.js';

/**
 * @namespace FormValidator
 * Class representing a form validator.
 */
export default class FormValidator {
  /**
   * Create a form validator
   * @param {HTMLElement} form - form node
   * @param {Array} fields - IDs of form inputs
   * @param {String} countryCode - area code to insert into formatPhoneNumber method's result
   */
  constructor(form, fields, countryCode) {
    this.form = form;
    this.fields = fields;
    this.countryCode = countryCode;
  }

  /**
   * @method initialize
   * @description initializes form alidation on entry and submit, clears inputs
   * @see {@link validateOnEntry}
   * @see {@link validateOnSubmit}
   * @see {@link clearField}
   * @param {undefined}
   * @returns {undefined}
   */
  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
    this.clearField();
  }

  /**
   * @method validateOnSubmit
   * @description validates form on submit by means of validateFields method
   * @see {@link validateFields}
   * @param {undefined}
   * @returns {(false|Function)} depending on validateFields method's result
   * either returns false or calls modal window and clears the input
   */
  validateOnSubmit() {
    this.form.addEventListener('submit', event => {
        event.preventDefault()
        this.fields.forEach(field => {
        const INPUT = document.querySelector(`#${field}`)
        this.validateFields(INPUT);
        if (INPUT.classList.contains('form__control--invalid')) {
          return false;
        } else {
          INPUT.value = '';

          /**
           * @method validateOnEntry
           * @description native method for closing modals wrapped in the polyfill
           * @param {undefined}
           * @returns {Void}
           */
          confirmModal.showModal();
        }
      })
    })
  }

  /**
   * @method validateOnEntry
   * @description validates form on entry by means of validateFields method
   * also recieves formatted phone number from the formatPhoneNumber method
   * @see {@link validateFields}
   * @see {@link formatPhoneNumber}
   * @param {undefined}
   * @returns {undefined}
   */
  validateOnEntry() {
    this.fields.forEach(field => {
      const INPUT = document.querySelector(`#${field}`);
      INPUT.addEventListener('input', event => {
        INPUT.value = this.formatPhoneNumber(event.target.value);
        this.validateFields(INPUT);
      })
    })
  }

  /**
   * @method formatPhoneNumber
   * @description formats phone number on entry
   * @param {String} input - user's entry
   * @returns {String} formatted phone number as '{countryCode}(###)-###-##-##'
   */
  formatPhoneNumber(input) {
    input = input.replace(/\D/g,'');
    let size = input.length;

    if (size > 0) input = '(' + input;
    if (size > 3) input = input.slice(0,4) + ')-' + input.slice(4,13);
    if (size > 6) input = input.slice(0,9) + '-' + input.slice(9,11) + '-' + input.slice(11,13);    
    if (size > 9) input = this.countryCode + input;

    return input;
  }

  /**
   * @method clearField
   * @description erases user's entries on focus and backspace keydown events
   * @param {undefined}
   * @returns {undefined}
   */
  clearField() {
    this.fields.forEach(field => {
      const INPUT = document.querySelector(`#${field}`);
      INPUT.addEventListener('focus', () => {
        INPUT.value = '';
      })
      INPUT.addEventListener('keydown', (event) => {
        if (event.keyCode === 8) INPUT.value = '';
      })
    })
  }

  /**
   * @method validateFields
   * @description checks input on being empty and sends
   * 'success' or 'error' status to setStatus method
   * @see {@link setStatus}
   * @param {HTMLElement} field - input node
   * @returns {undefined}
   */
  validateFields(field) {
    if (field.value.trim() === '') {
      this.setStatus(field, 'error');
    } else {
      this.setStatus(field, 'success');
    }
  }

  /**
   * @method setStatus
   * @description depending on the received status,
   * adds or removes '.form__control--invalid' class name to the input node
   * @param {HTMLElement} field - input node
   * @param {String} status - status received from the validateFields method
   * @returns {undefined}
   */
  setStatus(field, status) {
    if (status === 'success') {
      field.classList.remove('form__control--invalid');
    }

    if (status === 'error') {
      field.classList.add('form__control--invalid');
    }
  }
}