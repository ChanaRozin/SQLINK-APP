import React, { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { showError } from '../form-errors';
import styles from './input.module.scss';

type Props = {
    label?: string | ReactNode | any;
} & React.HTMLProps<HTMLInputElement>;

export const Input = (props: Props) => {
    const {
        label,
        ...inputProps
    } = props;

    return (
        <div>
            <input className={styles.input}
                {...inputProps}
            />
        </div>
    );
};

export const FinalFormInput = <T extends string | number>(
    props: FieldRenderProps<T, HTMLInputElement>
) => {
    const {
        input,
        label,
        placeholder,
        ...inputProps
    } = props;
    return (
        <div>
            <label>{label}</label>
            <Input
                {...input}
                {...inputProps}
                label={label}
                placeholder={placeholder}
                style={{ fontFamily: 'Rubik' }}
            />
            <div className={styles.error}>{showError(props)}</div>

        </div>
    );
};
