import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

// components
import { VerticalForm, FormInput } from '../../../components';

interface AddContactsProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (value: any) => void;
}

const AddContacts = ({ show, onHide, onSubmit }: AddContactsProps) => {
  /*
    form validation schema
    */
  const { t } = useTranslation();
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required(t('Please enter first name')),
      lastName: yup.string().required(t('Please enter last name')),
      email: yup
        .string()
        .required(t('Please enter email'))
        .email(t('Please enter valid email')),
    })
  );

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header onHide={onHide} closeButton>
          <Modal.Title className="m-0">{t('Add Staff')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VerticalForm
            formClass="px-2"
            onSubmit={onSubmit}
            resolver={schemaResolver}
            defaultValues={{}}
          >
            <FormInput
              label={t('First Name')}
              type="text"
              name="name"
              placeholder={t('Enter First Name')}
              containerClass={'mb-3'}
              className="form-control form-control-light"
            />
            <FormInput
              label={t('Last Name')}
              type="text"
              name="lastName"
              placeholder={t('Enter Last Name')}
              containerClass={'mb-3'}
              className="form-control form-control-light"
            />
            <FormInput
              label={t('Email')}
              type="email"
              name="email"
              placeholder={t('Enter Email')}
              containerClass={'mb-3'}
              className="form-control form-control-light"
            />

            <div className="text-end">
              <Button
                variant="light"
                type="submit"
                className="waves-effect waves-light me-1"
                onClick={onHide}
              >
                {t('Cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="waves-effect waves-light"
              >
                {t('Add')}
              </Button>
            </div>
          </VerticalForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddContacts;
