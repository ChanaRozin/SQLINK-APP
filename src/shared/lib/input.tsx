import React, { ReactNode } from 'react';
import { FieldRenderProps, Form } from 'react-final-form';
import { showError } from './form/form-errors';

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
            <input
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
            <Input
                {...input}
                {...inputProps}
                label={label}
                placeholder={placeholder}
                style={{ fontFamily: 'Rubik' }}
            />
            <span>{showError(props)}</span>

        </div>
    );
};
