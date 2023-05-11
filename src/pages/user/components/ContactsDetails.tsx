import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// store
import { AppDispatch } from '../../../redux/store';

// actions
import { removeStaff, addStaff } from '../../../redux/actions';

// components

import { Avatar } from '../../../components/Avatar';
import Table from '../../../components/Table';

import AddContacts from './AddContacts';

interface StaffActionRow {
  original: {
    id: number;
    name: string;
    secondName: string;
    email: string;
    created_date: string;
  };
}

// basic info column render
const BasicInfoColumn = ({ row }: { row: any }) => {
  return (
    <>
      <Avatar
        name={row.original.name}
        secondName={row.original.secondName}
        size="sm"
        className="me-2 rounded-circle"
      />
      {`${row.original.name} ${row.original.secondName}`}
    </>
  );
};

// action column render
const ActionColumn = ({ row }: { row: StaffActionRow }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const action = () => {
    dispatch(removeStaff(row.original));
    toggleModal();
  };

  return (
    <>
      <Button className="action-icon" variant="link" onClick={toggleModal}>
        <i className="mdi mdi-delete"></i>
      </Button>

      <Modal show={modal} onHide={toggleModal} size="sm">
        <div className="modal-filled bg-warning">
          <Modal.Body className="p-4">
            <div className="text-center">
              <i className="dripicons-warning h1 text-white"></i>
              <h4 className="mt-2 text-white">{t('WARNING!')}</h4>
              <p className="mt-2 mb-3 text-white">{t('Are you shure?')}</p>
              <Button
                variant="light"
                className="waves-effect waves-light me-2"
                onClick={action}
              >
                {t('Yes, remove it!')}
              </Button>
              <Button
                variant="white"
                className="waves-effect waves-light"
                onClick={toggleModal}
              >
                {t('No')}
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

interface StaffData {
  name: string;
  lastName: string;
  email: string;
}

interface ContactsDetailsProps {
  contactDetails: {
    id: number;
    name: string;
    secondName: string;
    email: string;
    created_date: string;
  }[];
}

const ContactsDetails = ({ contactDetails }: ContactsDetailsProps) => {
  /*
   *   modal handeling
   */
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const onCloseModal = () => setShow(false);
  const onOpenModal = () => setShow(true);

  const columns = [
    {
      Header: t('Basic Info'),
      accessor: 'name',
      Cell: BasicInfoColumn,
      className: 'table-user',
      sort: false,
    },
    {
      Header: t('Email'),
      accessor: 'email',
      sort: false,
    },
    {
      Header: t('Created Date'),
      accessor: 'created_date',
      sort: true,
    },
    {
      Header: t('Action'),
      accessor: 'action',
      sort: false,
      Cell: ActionColumn,
    },
  ];

  /*
    handle form submission
    */
  const onSubmit = (formData: StaffData) => {
    dispatch(
      addStaff({
        id: contactDetails.length + 1,
        name: formData.name,
        secondName: formData.lastName,
        email: formData.email,
        created_date: new Date().toLocaleDateString(),
      })
    );
    onCloseModal();
  };

  return (
    <>
      <Row className="justify-content-between">
        <Col>
          <Button
            variant="danger"
            className="waves-effect waves-light mb-2"
            onClick={onOpenModal}
          >
            {t('Add Staff')}
          </Button>
        </Col>
        <Col></Col>
      </Row>
      {contactDetails && (
        <Table
          columns={columns}
          data={contactDetails}
          pageSize={6}
          isSortable={true}
          pagination={true}
          tableClass="table-nowrap table-hover"
          searchBoxClass="my-2"
        />
      )}
      {/* add contact modal */}
      <AddContacts show={show} onHide={onCloseModal} onSubmit={onSubmit} />
    </>
  );
};

export default ContactsDetails;
