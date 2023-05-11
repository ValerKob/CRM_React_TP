import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
//components
import {
  Row,
  Col,
  Tab,
  Nav,
  ListGroup,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { FormInput } from '../../../components/';
import Spinner from '../../../components/Spinner';
import LaddaButton, { EXPAND_RIGHT } from 'react-ladda-button';

// store
import { RootState, AppDispatch } from '../../../redux/store';

// actions
import {
  getIntegrations,
  disconnectIntegration,
  connectIntegration,
} from '../../../redux/actions';

interface IntegrationInt {
  link?: string;
  id: number;
  name: string;
  img: string;
  status: number;
}

interface IAppListProps {
  clients: IntegrationInt[];
  category: string;
}

const AppList: FC<IAppListProps> = ({ clients, category }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState<IntegrationInt | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [apik, setApik] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (client: IntegrationInt) => {
    toggleModal();
    setModalName(client);
  };

  const disconnectApp = (client: IntegrationInt) => {
    dispatch(disconnectIntegration(client, { category }));
  };

  const openLink = (link: string) => {
    window.location.href = link;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    client: IntegrationInt | null
  ) => {
    e.preventDefault();
    client && dispatch(connectIntegration(client, { category, key: apik }));
    toggleModal();
    setApik('');
  };

  return (
    <>
      <ListGroup>
        {clients.map((client) => {
          return (
            <ListGroup.Item key={client.name}>
              <Row>
                <Col xs={9}>
                  <img src={client.img} alt={client.name} /> {client.name}
                </Col>
                <Col
                  xs={3}
                  className="d-flex justify-content-end align-items-center"
                >
                  {client.status ? (
                    <>
                      <span className="text-success me-3">
                        {t('Connected')}
                      </span>
                      <Button
                        variant="danger"
                        className="btn-xs waves-effect waves-light"
                        onClick={() => disconnectApp(client)}
                      >
                        {t('Disconnect')}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      className="btn-xs waves-effect waves-light"
                      onClick={
                        client.link
                          ? () => client.link && openLink(client.link)
                          : () => openModal(client)
                      }
                    >
                      {t('Connect')}
                    </Button>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header onHide={toggleModal} closeButton>
          <Modal.Title className="m-0">
            {t('Connect') + ' ' + modalName?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-2" onSubmit={(e) => handleSubmit(e, modalName)}>
            <FormInput
              type="hidden"
              name="post"
              value={modalName?.name}
            ></FormInput>
            <FormInput
              label={t('Token') + ' ' + modalName?.name}
              type="text"
              name="api"
              placeholder={t('Enter your Token')}
              containerClass={'mb-3'}
              value={apik}
              onChange={(e) => setApik(e.target.value)}
              className="form-control form-control-light"
            ></FormInput>
            <div className="text-end">
              <Button
                variant="light"
                type="button"
                className="waves-effect waves-light me-1"
                onClick={toggleModal}
              >
                {t('Cancel')}
              </Button>
              <LaddaButton
                loading={false}
                type="submit"
                data-style={EXPAND_RIGHT}
                className="btn btn-primary"
              >
                {t('Connect')}
              </LaddaButton>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const Integrations = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => ({
    user: state.Auth.user,
  }));
  const { mails, messengers, loading } = useSelector(
    (state: RootState) => state.Integrations,
    shallowEqual
  );
  const tabContents = [
    {
      id: 1,
      title: t('Mail'),
      text: t('On this tab, you can integrate your email into the CRM system.'),
      component: mails && <AppList clients={mails} category={'mails'} />,
    },
    {
      id: 2,
      title: t('Messengers'),
      text: t(
        'On this tab, you can integrate your messengers into the CRM system.'
      ),
      component: messengers && (
        <AppList clients={messengers} category={'messengers'} />
      ),
    },
    {
      id: 3,
      title: t('VoIP'),
      text: t('Here we can integrate VoIP services into a CRM system.'),
    },
    {
      id: 4,
      title: t('Other'),
      text: t('Connect services that are not included in other tabs.'),
    },
  ];

  useEffect(() => {
    if (!mails || !messengers) {
      dispatch(getIntegrations(user.id));
    }
  }, [dispatch, mails, messengers, user.id]);

  return (
    <>
      {loading ? (
        <Col>
          <Spinner type="grow" size="sm" />
        </Col>
      ) : (
        <Tab.Container defaultActiveKey="1">
          <Nav variant="tabs" className="nav-bordered" as="ul">
            {(tabContents || []).map((tab, index) => {
              return (
                <Nav.Item key={index} as="li">
                  <Nav.Link
                    className={tab.component ? 'cursor-pointer' : 'disabled'}
                    href="#"
                    eventKey={tab.id}
                  >
                    {tab.title}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>

          <Tab.Content>
            {(tabContents || []).map((tab, index) => {
              return (
                <Tab.Pane eventKey={tab.id} id={String(tab.id)} key={index}>
                  <Row>
                    <Col sm="12">
                      <p className="mt-1">{tab.text}</p>
                      {tab.component && tab.component}
                    </Col>
                  </Row>
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Tab.Container>
      )}
    </>
  );
};

export default Integrations;
