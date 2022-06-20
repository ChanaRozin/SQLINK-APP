import { SubmissionErrors } from 'final-form';
import { makeAutoObservable } from 'mobx';
import { ApiClient } from '../shared/api/api-client';
import { RouterStore } from '@superwf/mobx-react-router';
import { FormErrors } from '../shared/lib/form/form-errors';
import validator from 'validator';
import { PersonalDetails } from '../shared/model/user';

export type LoginForm = {
  email: string
  password: string;
};

export type ResponseLogin = {
  token: string,
  personalDetails: PersonalDetails
}

export class UserAuthStore {
  user: PersonalDetails | null = null;
  disabledFormLogin: boolean = true;

  constructor(
    public apiClient: ApiClient,
    public routerStore: RouterStore,
  ) {
    makeAutoObservable(this, {
      apiClient: false,
      routerStore: false,
    });
  }

  validateEmail = (str: string) => {
    return /^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
  }

  validateEnglishOnly = (str: string) => {
    const english = /^[a-zA-Z]+$/;
    return english.test(str.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/g, ''));
  }

  validate = (form: LoginForm) => {
    const errors: FormErrors<LoginForm> = {};
    if (form.email) {
      if (!this.validateEmail(form.email)) {
        errors.email = "Email is not valid";
      }
      if (!this.validateEnglishOnly(form.email)) {
        errors.email = "Email cannot contain letters not in English";
      }
    }
    if (form.password) {
      if (!validator.isStrongPassword(form.password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        errors.password = "It isn't strong password, The password must include least 8 characters uppercase and lowercase letter, number and symbol";
      }
      if (!this.validateEnglishOnly(form.password)) {
        errors.password = "Password can contain only English letters";
      }
    }
    if (!Object.keys(errors).length && form.email && form.password) {
      this.disabledFormLogin = false;
    }
    else {
      this.disabledFormLogin = true;
    }
    return errors;
  }

  login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<SubmissionErrors | null> => {
    const response = await this.apiClient.login({ email: email, password: password });
    localStorage.setItem("token", response[0].token);
    this.user = response[0].personalDetails;
    this.routerStore.push('/info');
    return;
  };

}








