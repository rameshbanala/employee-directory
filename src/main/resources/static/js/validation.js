/**
 * Validation utilities for employee form
 */
const Validation = {
    /**
     * Email validation regex
     */
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    /**
     * Validate a single field
     * @param {string} fieldName - Name of the field to validate
     * @param {string} value - Value to validate
     * @returns {Object} - Validation result with isValid and message
     */
    validateField(fieldName, value) {
        const result = { isValid: true, message: '' };

        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (!value || value.trim().length === 0) {
                    result.isValid = false;
                    result.message = `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`;
                } else if (value.trim().length < 2) {
                    result.isValid = false;
                    result.message = `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
                }
                break;

            case 'email':
                if (!value || value.trim().length === 0) {
                    result.isValid = false;
                    result.message = 'Email is required';
                } else if (!this.emailRegex.test(value.trim())) {
                    result.isValid = false;
                    result.message = 'Please enter a valid email address';
                }
                break;

            case 'department':
                if (!value || value.trim().length === 0) {
                    result.isValid = false;
                    result.message = 'Department is required';
                }
                break;

            case 'role':
                if (!value || value.trim().length === 0) {
                    result.isValid = false;
                    result.message = 'Role is required';
                }
                break;

            default:
                break;
        }

        return result;
    },

    /**
     * Validate entire form
     * @param {Object} formData - Form data to validate
     * @returns {Object} - Validation result with isValid and errors object
     */
    validateForm(formData) {
        const errors = {};
        let isValid = true;

        // Validate each field
        Object.keys(formData).forEach(fieldName => {
            const validation = this.validateField(fieldName, formData[fieldName]);
            if (!validation.isValid) {
                errors[fieldName] = validation.message;
                isValid = false;
            }
        });

        return { isValid, errors };
    },

    /**
     * Display validation errors in the UI
     * @param {Object} errors - Errors object from validation
     */
    displayErrors(errors) {
        // Clear previous errors
        this.clearErrors();

        // Display new errors
        Object.keys(errors).forEach(fieldName => {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const inputElement = document.getElementById(fieldName);
            
            if (errorElement) {
                errorElement.textContent = errors[fieldName];
                errorElement.style.display = 'block';
            }
            
            if (inputElement) {
                inputElement.classList.add('input--error');
            }
        });
    },

    /**
     * Clear all validation errors from the UI
     */
    clearErrors() {
        const errorElements = document.querySelectorAll('.form__error');
        const inputElements = document.querySelectorAll('.input, .select');

        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });

        inputElements.forEach(element => {
            element.classList.remove('input--error');
        });
    }
};
