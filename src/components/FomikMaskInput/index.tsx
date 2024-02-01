'use client'
import { useField, useFormikContext } from 'formik';
import React from 'react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

type Props = {
    placeholder?: string;
    id?: string;
    name: string;
} & Omit<MaskedInputProps, 'name'>;

export default function FormikMaskInput(props: Props) {

    const { name, prefix, ...restProps } = props;

    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const value = field.value;

    return (
        <MaskedInput
            {...restProps}
            className={`form-input ltr:pl-2 rtl:pr-10 ${restProps.className}`}
            value={value}
            onChange={(val) => {
                setFieldValue(name, val);
            }}
        />
    )
}
