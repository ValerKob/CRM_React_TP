import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// store
import { RootState, AppDispatch } from '../../redux/store';

// actions
import {
  getProfile,
  updateProfile,
  resetProfileMessages,
  resetProfile,
  resetAuth,
  logoutUser,
  updateAuth,
  updateProfilePassword,
} from '../../redux/actions';

//components
import { Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { FormInput } from '../../components/';
import { Avatar } from '../../components/Avatar';
import HyperDatepicker from '../../components/Datepicker';
import FeatherIcon from 'feather-icons-react';
import PageTitle from '../../components/PageTitle';
import Spinner from '../../components/Spinner';
import LaddaButton, { EXPAND_RIGHT } from 'react-ladda-button';

//styles
import 'react-ladda-button/dist/ladda-themeless.min.css';

const UserInfo = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => ({
    user: state.Auth.user,
  }));
  const {
    profile,
    loading,
    error,
    success,
    updating,
    errorPassword,
    updatingPass,
    successPassword,
  } = useSelector((state: RootState) => state.Profile, shallowEqual);

  const [name, setName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [post, setPost] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState<null | Date>(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    !profile && dispatch(getProfile());
    profile?.firstName && setName(profile.firstName);
    profile?.lastName && setSecondName(profile.lastName);
    profile?.post && setPost(profile.post);
    profile?.email && setEmail(profile.email);
    profile?.birthday && setBirthday(new Date(Date.parse(profile.birthday)));
  }, [dispatch, profile, user.id]);

  const closeSuccessAlert = useCallback(() => {
    setShowSuccess(false);
    dispatch(resetProfileMessages());
  }, [dispatch]);

  const closeErrorAlert = () => {
    setShowError(false);
    dispatch(resetProfileMessages());
  };

  useEffect(() => {
    let tId: NodeJS.Timeout | null = null;
    if (success) {
      dispatch(
        updateAuth({
          firstName: name,
          lastName: secondName,
        })
      );
      setShowSuccess(true);
      tId = setTimeout(() => {
        closeSuccessAlert();
      }, 2000);
    }
    if (successPassword) {
      dispatch(resetAuth());
      dispatch(logoutUser());
      dispatch(resetProfile());
    }
    return () => {
      tId && clearTimeout(tId);
    };
  }, [dispatch, name, secondName, success, successPassword, closeSuccessAlert]);

  useEffect(() => {
    error && setShowError(true);
  }, [error]);

  useEffect(() => {
    errorPassword && setShowError(true);
  }, [errorPassword]);

  const normalizeLanguage = useCallback(() => {
    const language = i18n.language.split('-');
    return language[0];
  }, [i18n.language]);

  const onDateChange = (date: Date) => {
    if (date) {
      setBirthday(date);
    }
  };

  const normalizeDate = (date: Date): string => {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y;
  };

  const getFullname = () => {
    return name + ' ' + secondName;
  };

  const updateAccountInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dt: Date = birthday
      ? birthday
      : new Date(Date.parse(profile.birthday));
    dispatch(
      updateProfile({
        firstName: name,
        lastName: secondName,
        post: post,
        email: email,
        birthday: dt,
      })
    );
  };

  const updateAccountPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateProfilePassword({
        password: password,
        oldPassword: oldPassword,
        confirm: confirmPassword,
      })
    );
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: t('My Account'), path: '/my-account', active: true },
        ]}
        title={t('My Account')}
      />
      <Alert
        variant="success"
        show={showSuccess}
        onClose={closeSuccessAlert}
        dismissible
      >
        {success && t('Profile was updated succesfuly!')}
        {successPassword && successPassword}
      </Alert>

      <Alert
        variant="danger"
        show={showError}
        onClose={closeErrorAlert}
        dismissible
      >
        {error && error}
        {errorPassword && errorPassword}
      </Alert>
      <Row>
        {loading ? (
          <Col>
            <Spinner type="grow" size="md" className="mt-3" />
          </Col>
        ) : (
          <>
            <Col md={9}>
              <Form onSubmit={updateAccountInfo}>
                <Row>
                  <Col md={3}>
                    <Card>
                      <Card.Body>
                        <Avatar
                          name={name}
                          secondName={secondName}
                          size="xxl"
                          className="mb-3 mx-auto"
                        />
                        <div className="text-center">
                          <Card.Title className="fs-4">
                            {getFullname()}
                          </Card.Title>
                          <Card.Text className="text-black-50 fw-semibold">
                            {post}
                          </Card.Text>
                        </div>
                        <hr></hr>
                        {email && (
                          <Card.Text className="mb-2 text-center">
                            <FeatherIcon icon="mail" size={14} /> {email}
                          </Card.Text>
                        )}
                        {birthday && (
                          <Card.Text className="mb-2 text-center">
                            <FeatherIcon icon="gift" size={16} />{' '}
                            {normalizeDate(birthday)}
                          </Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={9}>
                    <Card>
                      <Card.Body>
                        <h5 className="font-16 mb-3">{t('Account Details')}</h5>
                        <Row>
                          <Col md={6}>
                            <FormInput
                              disabled={updating}
                              label={t('First Name')}
                              type="text"
                              name="name"
                              placeholder={t('Enter First Name')}
                              containerClass={'mb-3'}
                              defaultValue={name}
                              onChange={(e) => setName(e.target.value)}
                            ></FormInput>
                          </Col>
                          <Col md={6}>
                            <FormInput
                              disabled={updating}
                              label={t('Last Name')}
                              type="text"
                              name="last-name"
                              placeholder={t('Enter Last Name')}
                              containerClass={'mb-3'}
                              defaultValue={secondName}
                              onChange={(e) => setSecondName(e.target.value)}
                            ></FormInput>
                          </Col>
                          <Col md={6}>
                            <FormInput
                              disabled={updating}
                              label={t('Post')}
                              type="text"
                              name="post"
                              placeholder={t('Enter your Post')}
                              containerClass={'mb-3'}
                              defaultValue={post}
                              onChange={(e) => setPost(e.target.value)}
                            ></FormInput>
                          </Col>
                          <Col md={6}>
                            <FormInput
                              disabled={updating}
                              label={t('Email')}
                              type="email"
                              name="email"
                              placeholder={t('Enter your Email')}
                              containerClass={'mb-3'}
                              defaultValue={email}
                              readOnly
                              onChange={(e) => setEmail(e.target.value)}
                            ></FormInput>
                          </Col>
                          <Col>
                            <div className="mb-3">
                              <label className="form-label">
                                {t('Birthday')}
                              </label>{' '}
                              <br />
                              <HyperDatepicker
                                hideAddon={true}
                                dateFormat="dd.MM.yyyy"
                                value={birthday}
                                showMonthDropdown
                                showYearDropdown
                                placeholder={t('Click to select date')}
                                locale={
                                  normalizeLanguage() !== 'en'
                                    ? normalizeLanguage()
                                    : undefined
                                }
                                dropdownMode="select"
                                onChange={(date) => {
                                  onDateChange(date);
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="text-end">
                            <LaddaButton
                              loading={updating}
                              type="submit"
                              data-style={EXPAND_RIGHT}
                              className="btn btn-primary"
                            >
                              {t('Update Account')}
                            </LaddaButton>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col md={3}>
              <Form onSubmit={updateAccountPassword}>
                <Card>
                  <Card.Body>
                    <h5 className="font-16 mb-3">{t('Reset Password')}</h5>
                    <FormInput
                      label={t('Old Password')}
                      type="password"
                      name="password-old"
                      placeholder={t('Enter old Password')}
                      containerClass={'mb-3'}
                      defaultValue={oldPassword}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                    ></FormInput>
                    <FormInput
                      label={t('Password')}
                      type="password"
                      name="password"
                      placeholder={t('Enter new Password')}
                      containerClass={'mb-3'}
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></FormInput>
                    <FormInput
                      label={t('Password Confirm')}
                      type="password"
                      name="password-confirm"
                      placeholder={t('Repeat new Password')}
                      containerClass={'mb-3'}
                      defaultValue={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormInput>
                    <Col className="text-end">
                      <LaddaButton
                        loading={updatingPass}
                        type="submit"
                        data-style={EXPAND_RIGHT}
                        className="btn btn-primary"
                      >
                        {t('Update Password')}
                      </LaddaButton>
                    </Col>
                  </Card.Body>
                </Card>
              </Form>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default UserInfo;
