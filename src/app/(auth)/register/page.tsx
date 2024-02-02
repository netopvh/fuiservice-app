"use client"

import GradientButton from '@/components/GradientButton';
import IconBuildings from '@/components/Icon/IconBuildings';
import IconLockDots from '@/components/Icon/IconLockDots';
import IconMail from '@/components/Icon/IconMail';
import IconUser from '@/components/Icon/IconUser';
import PasswordInput from '@/components/PasswordInput';
import { APP_ROUTES } from '@/constants/app-routes';
import { UserRegisterDTO } from '@/domain/dto';
import { usePostRegisterMutation } from '@/redux/services/userApi';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Nome é obrigatório'),
    company_name: yup
        .string()
        .required('Nome da empresa é obrigatório'),
    email: yup
        .string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    password: yup
        .string()
        .required('Senha é obrigatória'),
    password_confirmation: yup
        .string()
        .required('Confirmação de senha é obrigatória'),
})

export default function Page() {

    const [postRegister, { isLoading }] = usePostRegisterMutation();

    const { replace, push } = useRouter()

    async function submitForm(values: UserRegisterDTO, { setErrors }: FormikHelpers<any>) {
        await postRegister(values)
            .unwrap()
            .then(async (data) => {
                console.log(data);
                replace(APP_ROUTES.public.login);
            })
            .catch((error) => {
                setErrors({ email: error.data.message });
            });
    }

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-lg bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(126,2,67,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link href="/" className="ms-10 block w-48 lg:w-72">
                                <img src="/assets/images/logo.png" alt="Logo" className="w-full" />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <img src="/assets/images/login.svg" alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h2 className="text-2xl font-extrabold uppercase !leading-snug text-black md:text-2xl">Criar Conta</h2>
                                <p className="text-base font-bold leading-normal text-white-dark">Insira as informações abaixo para criar sua conta.</p>
                            </div>
                            <Formik
                                validateOnChange={true}
                                initialValues={{
                                    name: '',
                                    company_name: '',
                                    email: '',
                                    mobile: '',
                                    password: '',
                                    password_confirmation: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={submitForm}>
                                {({ isSubmitting }) => (
                                    <Form noValidate autoComplete='off' className="space-y-5 dark:text-white" method='post'>
                                        <div>
                                            <label htmlFor="name">Nome Completo</label>
                                            <div className="relative text-white-dark">
                                                <Field name="name" placeholder="Informe seu nome" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconUser fill={true} />
                                                </span>
                                            </div>
                                            <ErrorMessage name="name" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="company_name">Nome da Empresa</label>
                                            <div className="relative text-white-dark">
                                                <Field name="company_name" placeholder="Informe o nome da Empresa" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconBuildings fill={true} />
                                                </span>
                                            </div>
                                            <ErrorMessage name="company_name" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="email">E-mail</label>
                                            <div className="relative text-white-dark">
                                                <Field name="email" placeholder="Informe seu e-mail" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconMail fill={true} />
                                                </span>
                                            </div>
                                            <ErrorMessage name="email" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Senha</label>
                                            <div className="relative text-white-dark">
                                                <PasswordInput name="password" placeholder="Informe sua senha" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconLockDots fill={true} />
                                                </span>
                                            </div>
                                            <ErrorMessage name="password" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                        </div>
                                        <div>
                                            <label htmlFor="password_confirmation">Confirmar Senha</label>
                                            <div className="relative text-white-dark">
                                                <PasswordInput name="password_confirmation" placeholder="Informe a confirmação da senha" className="form-input ps-10 placeholder:text-white-dark" />
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconLockDots fill={true} />
                                                </span>
                                            </div>
                                            <ErrorMessage name="password_confirmation" component="div" className="text-red-500 font-bold text-sm mt-1 ml-2" />
                                        </div>
                                        {/* <div className="mb-3 flex flex-wrap content-center">
                                            <input id="remember" type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                            <label htmlFor="remember" className="mr-auto ml-1 text-md font-semibold text-black">Lembrar acesso</label>
                                        </div> */}
                                        <div className="mb-3">
                                            <GradientButton
                                                type="submit"
                                                loading={isLoading}
                                                className=""
                                                disabled={isLoading}
                                                text='Criar Conta' />

                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
