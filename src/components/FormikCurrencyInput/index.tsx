'use client'
import { useField, useFormikContext } from 'formik';
import React from 'react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import Placeholder from 'react-select/dist/declarations/src/components/Placeholder';

type Props = {
    placeholder?: string;
    id?: string;
    name: string;
} & Omit<CurrencyInputProps, 'name'>;

export default function FormikCurrencyInput(props: Props) {

    const { name, prefix, ...restProps } = props;

    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const value = field.value;

    return (
        <CurrencyInput
            {...restProps}
            className={`form-input ltr:pl-2 rtl:pr-10 ${restProps.className}`}
            value={value}
            prefix={prefix}
            onValueChange={(val) => {
                //here I used explicit typing but there maybe a better way to type the value.
                const _val = val as string;
                setFieldValue(name, _val);
            }}
            step={1}
        />
    )
}
