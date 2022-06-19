import React, { useEffect, useState } from 'react';
import styles from './login.module.scss';
import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';
import { useRootStore } from '../stores/root-store/use-root-store';
import { FinalFormInput } from '../shared/lib/input';
import { Button } from '../shared/lib/button/button';
import { FormErrors } from '../shared/lib/form/form-errors';
import { LoginForm } from '../stores/user-auth-store';



export const Login = observer(() => {
    const { userAuthStore } = useRootStore();
    useEffect(()=>{
        console.log("vkkkkkkkkkkkkkkkkkkkk");
      },[])
    // const [signUpStore] = useState(createSignUpStore);
    // const [onLoad, setOnLoad] = useState<boolean>(true);

    return (

        <Form<LoginForm>
            onSubmit={userAuthStore.login}
            validate={userAuthStore.validate}
        >
            {({ handleSubmit, submitting, submitError,errors }) => (
                <form onSubmit={handleSubmit}>
                    <Field name={'email'} label={'Email'} type={'email'} component={FinalFormInput} />
                    <Field name={'password'} label={'Password'} type={'password'} component={FinalFormInput} />
                    <Button
                        disabled={userAuthStore.disabledFormLogin}
                        loading={submitting}
                        fullWidth
                        onClick={() => {
                            // https://stackoverflow.com/a/51872116
                        }}
                    >
                        Login
                    </Button>
                </form>
            )}
        </Form>
    );
});
