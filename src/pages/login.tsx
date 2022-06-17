import React, { useState } from 'react';
import styles from './login.module.scss';
import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';


type LoginForm = {
    email: string
    password: string;
};

export const Login = observer(() => {
    // const { authStore, createSignUpStore } = useBusinessStore();
    // const [signUpStore] = useState(createSignUpStore);
    // const [onLoad, setOnLoad] = useState<boolean>(true);

    return (
        
        <Form<LoginForm>
        onSubmit={({ }) => {
        
        }}
        // validate={({ }) => {
         
        // }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
             </form>
             )}
           </Form>
       );
     });
