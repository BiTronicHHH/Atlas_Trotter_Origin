import FormSection from '@/components/ui/FormSection';
import FormSectionsWrapper from '@/components/ui/FormSectionsWrapper';
import FormWrapper from '@/components/ui/FormWrapper';
import LoadingScreen from '@/components/ui/LoadingScreen';
import {
  auth,
  authWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
} from '@/lib/firebase';
import { IconGoogle } from '@/res/icons';
import { ROUTE_HOME, ROUTE_PRIVACY, ROUTE_TERMS } from '@/res/routes';
import { IFormSection } from '@/types/Form';
import errorMessageFromCode from '@/utils/firebaseErrors';
import isPasswordValidFormat from '@/utils/passwordValideFormat';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import Container from '../components/ui/Container';
import useTranslation from 'next-translate/useTranslation';
import { LoadingOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';

const Divider = dynamic(() => import('antd').then((module) => module.Divider));
const Input = dynamic(() => import('antd').then((module) => module.Input));
const Modal = dynamic(() => import('antd').then((module) => module.Modal));
const Space = dynamic(() => import('antd').then((module) => module.Space));

type FormItems = Omit<IFormSection, 'register'>;

const LoginPage = () => {
  const { t } = useTranslation('login');
  const [user, loading] = useAuthState(auth);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [logging, setLogging] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [showResetPasswordConfirmModal, setShowResetPasswordConfirmModal] =
    useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [emailForPasswordReset, setEmailForPasswordReset] = useState('');
  const { from } = router.query;
  if (user && !logging) {
    router.push(from ? (from as string) : ROUTE_HOME);
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setLogging(false);
        nookies.set(undefined, 'token', token, {
          path: ROUTE_HOME,
          maxAge: 60 * 60,
        });
      }
    });
  }, []);

  const registerFormItems: FormItems = {
    title: '',
    items: [
      {
        placeholder: t('Email'),
        name: 'emailRegister',
        type: 'email',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        placeholder: t('First name'),
        name: 'firstName',
        type: 'text',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        placeholder: t('Last name'),
        name: 'lastName',
        type: 'text',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        placeholder: t('Password'),
        name: 'passwordRegister',
        type: 'password',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        placeholder: t('Confirm password'),
        name: 'confirmPassword',
        type: 'password',
        required: true,
        maxLength: 100,
        component: 'input',
      },
    ],
  };

  const loginFormItems: FormItems = {
    title: '',
    items: [
      {
        placeholder: t('Email'),
        name: 'emailLogin',
        type: 'email',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        placeholder: t('Password'),
        name: 'passwordLogin',
        type: 'password',
        required: true,
        maxLength: 100,
        component: 'input',
      },
    ],
  };

  const rememberMeItems: FormItems = {
    title: '',
    items: [
      {
        label: t('Remember me'),
        name: 'rememberMe',
        component: 'checkBox',
        defaultChecked: true,
      },
    ],
  };

  const onResetPasswordConfirm = () => {
    sendPasswordReset(emailForPasswordReset).then(() => {
      setShowResetPasswordModal(false);
      setShowResetPasswordConfirmModal(true);
    });
  };

  return (
    <>
      <NextSeo
        title={`${t('Login to')} Atlas Trotter`}
        description={`${t('Log in to fully enjoy')} Atlas Trotter.`}
      />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container>
          <Modal
            open={showResetPasswordModal}
            onOk={() => onResetPasswordConfirm()}
            okText={t('common:Confirm')}
            cancelText={t('common:Cancel')}
            onCancel={() => setShowResetPasswordModal(false)}
            destroyOnClose={true}
            title={t('Reset your password')}>
            <Input
              type="email"
              placeholder={t('Your email')}
              onChange={(e) => {
                setEmailForPasswordReset(e.target.value);
              }}></Input>
          </Modal>
          <Modal
            open={showResetPasswordConfirmModal}
            onOk={() => setShowResetPasswordConfirmModal(false)}
            onCancel={() => setShowResetPasswordConfirmModal(false)}
            cancelButtonProps={{ style: { display: 'none' } }}
            title={t('Email sent')}>
            {t('Email_sent_desc')}
          </Modal>
          <div className="flex tablet:gap-x-12 gap-x-8 items-center flex-wrap mt-12 mb-12 w-full justify-center">
            <div className="flex flex-col">
              <button
                onClick={async () => {
                  setLogging(true);
                  await authWithGoogle();
                }}
                className="flex justify-center items-center hover:bg-gray-100 py-[8px] w-[280px] rounded-full font-medium bg-white border border-solid border-gray-300">
                <IconGoogle className="mr-3" />
                {t('Sign in with')} Google
              </button>
              <Divider
                style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.2)' }}>
                {t('Or')}
              </Divider>
              {isCreatingAccount ? (
                <form
                  onSubmit={handleSubmit(async (values) => {
                    if (!isPasswordValidFormat(values.passwordRegister)) {
                      setErrorText(t('pw_error_text'));
                    } else if (
                      values.passwordRegister == values.confirmPassword
                    ) {
                      setIsSignUpLoading(true);
                      setLogging(true);
                      const res = await registerWithEmailAndPassword(
                        values.emailRegister,
                        values.firstName,
                        values.lastName,
                        values.passwordRegister,
                      );
                      setIsSignUpLoading(false);
                      if (res) {
                        setErrorText(t(errorMessageFromCode(res)) + '.');
                      }
                    } else {
                      setErrorText(t("Passwords don't match"));
                    }
                  })}>
                  <FormWrapper className="gap-x-14">
                    <FormSectionsWrapper>
                      <FormSection {...registerFormItems} register={register} />
                      <label className="mt-2 text-xs text-red w-[280px]">
                        {errorText}
                      </label>
                      <button
                        disabled={isSignUpLoading}
                        className="flex justify-center items-center hover:bg-[#92638C] py-[10px] w-[280px] rounded-full font-medium bg-[#865B81] mt-4 text-white">
                        <Space>
                          <div>{t('Sign up')}</div>
                          {isSignUpLoading && <LoadingOutlined />}
                        </Space>
                      </button>
                      <label className="mt-2 text-xs text-gray-400 w-[280px] text-center">
                        {t("By signing up, I agree to Atlas Trotter's")}
                        <br />
                        <Link href={ROUTE_TERMS}>
                          <label className="cursor-pointer text-[#007aff]">
                            {t('Terms and Conditions')}
                          </label>
                        </Link>
                        &nbsp;&amp;&nbsp;
                        <Link href={ROUTE_PRIVACY}>
                          <label className="cursor-pointer text-[#007aff]">
                            {t('Privacy Policy')}
                          </label>
                        </Link>
                      </label>
                      <label
                        className="cursor-pointer mt-5 text-xs text-[#007aff]"
                        onClick={() => {
                          setErrorText('');
                          setIsCreatingAccount(false);
                        }}>
                        {t('Already have an account? Sign in')}
                      </label>
                    </FormSectionsWrapper>
                  </FormWrapper>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit(async (values) => {
                    setIsSignInLoading(true);
                    setLogging(true);
                    const res = await logInWithEmailAndPassword(
                      values.emailLogin,
                      values.passwordLogin,
                      values.rememberMe,
                    );
                    setIsSignInLoading(false);
                    if (res) {
                      setErrorText(t(errorMessageFromCode(res)) + '.');
                    }
                  })}>
                  <FormWrapper className="gap-x-14">
                    <FormSectionsWrapper>
                      <FormSection {...loginFormItems} register={register} />
                      <label
                        className="cursor-pointer my-2 text-xs text-[#007aff]"
                        onClick={() => setShowResetPasswordModal(true)}>
                        {t('Forgot your password?')}
                      </label>
                      <FormSection {...rememberMeItems} register={register} />
                      <label className="mt-2 text-xs text-red w-[280px]">
                        {errorText}
                      </label>
                      <button
                        disabled={isSignInLoading}
                        className="flex justify-center items-center hover:bg-[#92638C] py-[10px] w-[280px] rounded-full font-medium bg-[#865B81] mt-4 text-white">
                        <Space>
                          <div>{t('Sign in')}</div>
                          {isSignInLoading && <LoadingOutlined />}
                        </Space>
                      </button>
                      <label
                        className="cursor-pointer mt-5 text-xs text-[#007aff]"
                        onClick={() => {
                          setErrorText('');
                          setIsCreatingAccount(true);
                        }}>
                        {t('New here? Create your account')}
                      </label>
                    </FormSectionsWrapper>
                  </FormWrapper>
                </form>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default LoginPage;
