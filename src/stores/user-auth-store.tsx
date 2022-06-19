import React from 'react';
import { SubmissionErrors } from 'final-form';
import { action, makeAutoObservable, runInAction } from 'mobx';
import { assert } from 'ts-essentials';
import { ApiClient } from '../shared/api/api-client';
import { RouterStore } from '@superwf/mobx-react-router';

// import { RouterStore } from 'mobx-react-router';
import { FormErrors } from '../shared/lib/form/form-errors';
import validator from 'validator';
import { History } from "history";

export type LoginForm = {
  email: string
  password: string;
};

export type ResponseLogin={
  token:string,
  personalDetails:PersonalDetails
}

export type PersonalDetails = {
  name: string,
  Team: string,
  joinedAt: string,
  avatar: string
}

export class UserAuthStore {
  user: PersonalDetails|null=null;
  disabledFormLogin:boolean= true;


  constructor(
    public apiClient: ApiClient,
    public routerStore: RouterStore,
  ) {
    makeAutoObservable(this, {
      apiClient: false,
      routerStore: false,
    });
  }

//   get isAuthenticated() {
//     return !!this.user?.id;
//   }


//   get businessAccountUser() {
//     assert(this.user && this.user['@type'] === 'BusinessAccountUser');
//     return this.user;
//   }





//   fetchPublicPartnerData = async (id: string) => {
//     return this.authApiClient.partnerPublicInfo(id).then((partner) => {
//       this.partnerUser = partner;
//       return partner;
//     });
//   };

validate=(form:LoginForm)=>{
  const errors: FormErrors<LoginForm> = {};
  if(form.email){
      let lastAtPos = form.email.lastIndexOf('@');
      let lastDotPos = form.email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && form.email.indexOf('@@') == -1 && lastDotPos > 2 && (form.email.length - lastDotPos) > 2)) {
        errors.email = "Email is not valid";
       }
      }
      if(form.password){
       if (!validator.isStrongPassword(form.password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
       errors.password='Is not strong password, The Password must include...'
      } 
    }
      if(!Object.keys(errors).length&&form.email&&form.password){
      this.disabledFormLogin=false;
      }
      else{
        this.disabledFormLogin=true;
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
    const response = await this.apiClient.login({email:email, password:password});
    localStorage.setItem("token",response[0].token);
    this.user=response[0].personalDetails;
  //  this.routerStore.push('/info');
   this.routerStore.push('/info');

    return;
  };

}
  // logout() {
  //   this.tokenStorage.removeToken();
  //   this.user = undefined;
  //   this.isUserLoaded = true;
  //   this.hotLinesStore.deleteHotlinesList();
  //   this.routerStore.replace('/sign-up');
  // }

  // parseAndFillJwt = async (token?: string) => {
  //   const jwt = token || this.tokenStorage.getToken();
  //   if (!jwt) {
  //     this.urlBeforeLogout = this.routerStore.location.pathname;
  //     this.isUserLoaded = true;
  //     return;
  //   }
  //   let jwtUser: JwtUser | undefined;
  //   try {
  //     jwtUser = parseJwt<JwtUser>(jwt);
  //   } catch (e) {
  //     this.urlBeforeLogout = this.routerStore.location.pathname;
  //     this.isUserLoaded = true;
  //     return;
  //   }
  //   assert(jwtUser);
  //   if (jwtUser.roles.includes('ROLE_BUSINESS_ACCOUNT_ADMIN')) {
  //     if (this.partnerUser?.id === jwtUser.partnerId) {
  //       const businessAccountUser = await this.profileApiClient.businessAccountUserFetch(
  //         jwtUser.id
  //       );
  //       await this.updateUser(businessAccountUser);
  //     } else {
  //       this.urlBeforeLogout = this.routerStore.location.pathname;
  //       this.isUserLoaded = true;
  //       return { 'FINAL_FORM/form-error': 'Invalid JWT partner' };
  //     }
  //   } else {
  //     throw new Error(`Invalid JWT role: ${jwtUser.roles.toString()}`);
  //   }

  // //   runInAction(() => {
  // //     this.isUserLoaded = true;
  // //   //   this.loadBusinessBalances();
 
  // //   });
  // // };


  // }







