"use client";

import { UserLoginDTO } from '@/domain/dto';
import { Token } from '@/domain/entities/token';
import { usePostLoginMutation } from '@/redux/services/userApi';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Image from 'next/image';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { checkUserAuthenticated } from '@/functions/check-user-authenticated';
import { APP_ROUTES } from '@/constants/app-routes';
import { setCookie } from '@/utils/cookies';
import { useEffect } from 'react';
import Link from 'next/link';
import IconMail from '@/components/Icon/IconMail';
import IconLockDots from '@/components/Icon/IconLockDots';
import GradientButton from '@/components/GradientButton';
import PasswordInput from '@/components/PasswordInput';
import { IDefaultResponse, IDispatcherResponse, ITokenResponse } from '@/domain/interfaces';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    password: yup
        .string()
        .required('Senha é obrigatória'),
})

export default function Page() {

    const [postLogin, { isLoading }] = usePostLoginMutation();

    const { replace, push } = useRouter()

    const isAuth = checkUserAuthenticated();

    useEffect(() => {
        if (isAuth) {
            push(APP_ROUTES.private.dashboard);
        }
    }, [isAuth, push])


    async function submitForm(values: UserLoginDTO, { setErrors }: FormikHelpers<any>) {
        await postLogin(values)
            .unwrap()
            .then(async (data: IDefaultResponse<ITokenResponse<IDispatcherResponse>>) => {
                const token: Token = new Token(data.data.token);
                await setToken(token);
                replace(APP_ROUTES.private.dashboard);
            })
            .catch((error) => {
                setErrors({ email: error.data.message });
            });
    }

    async function setToken(token: Token): Promise<void> {
        try {
            if (token.token !== '') {
                setCookie('token', token.token, 3600000);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="absolute inset-0">
                <Image src={"/assets/images/bg-gradient.png"} alt="image" className="h-full w-full object-cover" fill={true} />
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
                                <h2 className="text-3xl font-extrabold uppercase !leading-snug text-black md:text-2xl">Acessar painel</h2>
                                <p className="text-base font-bold leading-normal text-white-dark">Informe seus dados de acesso para acessar a plataforma</p>
                            </div>
                            <Formik
                                validateOnChange={true}
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={submitForm}>
                                {({ isSubmitting }) => (
                                    <Form noValidate autoComplete='off' className="space-y-5 dark:text-white" method='post'>
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
                                        <div className="mb-3 flex flex-wrap content-center">
                                            <input id="remember" type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                            <label htmlFor="remember" className="mr-auto ml-1 text-md font-semibold text-black">Lembrar acesso</label>
                                            <a href="#" className="text-md font-semibold mt-1 text-black">Esqueceu a senha?</a>
                                        </div>
                                        <div className="mb-3">
                                            <GradientButton
                                                type="submit"
                                                loading={isLoading}
                                                className=""
                                                disabled={isLoading}
                                                text='Entrar' />

                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="mt-10 text-center dark:text-white">
                                Ainda não possui conta ?&nbsp;
                                <Link href="/register" className="uppercase text-[#4e1b73] font-bold underline transition hover:text-black dark:hover:text-white">
                                    Criar Conta
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
