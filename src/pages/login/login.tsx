import styles from './login.module.scss';
import { observer } from 'mobx-react-lite';
import { Field, Form } from 'react-final-form';
import { useRootStore } from '../../stores/root-store/use-root-store';
import { FinalFormInput } from '../../shared/lib/form/input/input';
import { Button } from '../../shared/lib/button/button';
import { LoginForm } from '../../stores/user-auth-store';
import { Title } from '../../shared/title/title';

export const Login = observer(() => {
    const { userAuthStore } = useRootStore();

    return (
        <div className={styles.container}>
            <Form<LoginForm>
                onSubmit={userAuthStore.login}
                validate={userAuthStore.validate}
            >
                {({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Title title={"Login"}></Title>
                        <Field name={'email'} label={'Email'} type={'email'} component={FinalFormInput} />
                        <Field name={'password'} label={'Password'} type={'password'} component={FinalFormInput} />
                        <Button
                            disabled={userAuthStore.disabledFormLogin}
                            loading={submitting}
                        >
                            Login
                        </Button>
                    </form>
                )}
            </Form>
        </div>
    );
});
