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

  get isAuthenticated() {
    return !!this.user?.name;
  }

  validate = (form: LoginForm) => {
    const errors: FormErrors<LoginForm> = {};
    if (form.email) {
      let lastAtPos = form.email.lastIndexOf('@');
      let lastDotPos = form.email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && form.email.indexOf('@@') === -1 && lastDotPos > 2 && (form.email.length - lastDotPos) > 2)) {
        errors.email = "Email is not valid";
      }
    }
    if (form.password) {
      if (!validator.isStrongPassword(form.password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        errors.password = 'Is not strong password, The Password must include...'
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








