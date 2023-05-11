import React from 'react';
import PageTitle from '../../components/PageTitle';
import { useTranslation } from 'react-i18next';
import { useSelector, shallowEqual } from 'react-redux';

// store
import { RootState } from '../../redux/store';

//components
import { Row, Col, Card, Alert, Tab, Nav } from 'react-bootstrap';

import Integrations from './components/Integrations';
import Staff from './components/Staff';

const UserInfo = () => {
  const { t } = useTranslation();
  const { error, success } = useSelector(
    (state: RootState) => state.Integrations,
    shallowEqual
  );
  const tabContents = [
    {
      id: 1,
      title: t('Integrations'),
      icon: 'fe-grid',
      component: <Integrations />,
    },
    {
      id: 2,
      title: t('Staff'),
      icon: 'fe-users',
      component: <Staff />,
    },
  ];
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: t('Settings'), path: '/settings', active: true },
        ]}
        title={t('Settings')}
      />
      {success && (
        <Alert variant="success" show={true} dismissible>
          {success}
        </Alert>
      )}
      {error && (
        <Alert show={true} variant="danger" dismissible>
          {error}
        </Alert>
      )}
      <Row>
        <Tab.Container defaultActiveKey="1">
          <Col sm={3}>
            <Card>
              <Card.Body>
                <Nav as="ul" variant="pills" className="flex-column">
                  {(tabContents || []).map((tab, index) => {
                    return (
                      <Nav.Item as="li" key={index}>
                        <Nav.Link
                          className="cursor-pointer"
                          href="#"
                          eventKey={tab.id}
                        >
                          <i className={`${tab.icon} me-1`}></i>
                          {t(tab.title)}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={9}>
            <Card>
              <Card.Body>
                <Tab.Content className="pt-0">
                  {(tabContents || []).map((tab, index) => {
                    return (
                      <Tab.Pane
                        eventKey={tab.id}
                        id={String(tab.id)}
                        key={index}
                        mountOnEnter={true}
                      >
                        {tab.component}
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Tab.Container>
      </Row>
    </>
  );
};

export default UserInfo;
