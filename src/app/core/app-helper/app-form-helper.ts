import {FormControl, FormGroup} from "@angular/forms";

export abstract class AppFormHelper {
  static getFormGroup(formControls: any, validations: any) {
    const group: any = {};

    Object.keys(formControls).forEach((controlName) => {
      group[controlName] = new FormControl(formControls[controlName], validations[controlName]);
    });
    return new FormGroup(group);
  }

  static getFormGroupWithErrors(formControls: any, validations: any, errors: any) {
    const group: any = {};

    Object.keys(formControls).forEach((controlName) => {
      group[controlName] = new FormControl(formControls[controlName], validations[controlName]);
    });
    return new FormGroup(group, errors);
  }

  static getFormControlError(formControl: any, error: any) {
    return formControl.hasError(error) && formControl.touched;
  }

  static validateFormControlName(form: FormGroup, controlName: string) {
    if (form.get(controlName)?.valid && (form.get(controlName)?.touched || form?.get(controlName)?.dirty)) {
      return 'is-valid';
    } else if (form.get(controlName)?.invalid && (form.get(controlName)?.touched || form.get(controlName)?.dirty)) {
      return 'is-invalid'
    } else {
      return ''
    }
  }

}
