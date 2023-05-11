import React, { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
//actions
import { resetAuth, resetForgotPassword } from '../../redux/actions';
import { RootState, AppDispatch } from '../../redux/store';

// components
import { VerticalForm, FormInput } from '../../components/';

//hooks
import useQuery from '../../hooks/useQuery';

import AuthLayout from './AuthLayout';

interface ChangePassData {
  password: string;
  confirm: string;
}

const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-white-50">
          {t('Back to')}
          <Link to={'/auth/login'} className="text-white ms-1">
            <b>{t('Log in')}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const ChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    if (!query.get('token') || !query.get('email')) {
      history.push('/');
    }
    dispatch(resetAuth());
  }, [dispatch, query, history]);

  const { loading, passwordReset, resetPasswordSuccess, error } = useSelector(
    (state: RootState) => ({
      loading: state.Auth.loading,
      user: state.Auth.user,
      error: state.Auth.error,
      passwordReset: state.Auth.passwordReset,
      resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    })
  );

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      password: yup
        .string()
        .min(8, t('Min length is 8'))
        .required(t('Please enter Password')),
      confirm: yup
        .string()
        .min(8, t('Min length is 8'))
        .required(t('Please confirm Password')),
    })
  );

  /*
   * handle form submission
   */
  const onSubmit = (formData: ChangePassData) => {
    dispatch(
      resetForgotPassword(
        formData['password'],
        formData['confirm'],
        query.get('token'),
        query.get('email')
      )
    );
  };

  return (
    <>
      <AuthLayout
        helpText={t('Enter your new account password and confirm it.')}
        bottomLinks={resetPasswordSuccess && <BottomLink />}
      >
        {resetPasswordSuccess && (
          <Alert variant="success">{resetPasswordSuccess.message}</Alert>
        )}

        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        {!passwordReset && (
          <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
            <FormInput
              label={t('Password')}
              type="password"
              name="password"
              placeholder={t('Enter new Password')}
              containerClass={'mb-3'}
            />
            <FormInput
              label={t('Password Confirm')}
              type="password"
              name="confirm"
              placeholder={t('Repeat new Password')}
              containerClass={'mb-3'}
            />

            <div className="d-grid text-center">
              <Button variant="primary" type="submit" disabled={loading}>
                {t('Change Password')}
              </Button>
            </div>
          </VerticalForm>
        )}
      </AuthLayout>
    </>
  );
};

export default ChangePassword;
