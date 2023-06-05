import { AbstractControl, ValidatorFn } from "@angular/forms";

export function EmailValidator(control: AbstractControl): {[key: string]: any} | null {
    
    // Check if email value is empty
    if (control.value == '') {
        return { 'emptyEmail': {value: 'Please enter a valid email address'}};
    }

    // Check if there are upper-case characters
    if ( (/[A-Z]/g.test(control.value)) ) {
        return { 'uppercaseEmail': {value: 'Please use only lower-case characters'}};
    }

    // Check email validity using RFC2822 regular expression
    if ( !(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(control.value)) ) {
        return { 'forbiddenEmail': {value: 'Please enter a valid email address'}};
    }

    return null;  // Success
}
