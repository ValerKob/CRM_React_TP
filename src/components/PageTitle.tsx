import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

interface BreadcrumbItems {
  label: string;
  path: string;
  active?: boolean;
}

interface PageTitleProps {
  breadCrumbItems: Array<BreadcrumbItems>;
  title: string;
}

/**
 * PageTitle
 */
const PageTitle = (props: PageTitleProps) => {
  const { t } = useTranslation();
  return (
    <Row>
      <Col>
        <div className="page-title-box">
          <div className="page-title-right">
            <Breadcrumb className="m-0">
              <Breadcrumb.Item
                linkAs={NavLink}
                linkProps={{ to: '/dashboard' }}
              >
                {t('Home')}
              </Breadcrumb.Item>

              {(props['breadCrumbItems'] || []).map((item, index) => {
                return item.active ? (
                  <Breadcrumb.Item active key={index}>
                    {item.label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item
                    key={index}
                    linkAs={NavLink}
                    linkProps={{ to: item?.path }}
                  >
                    {item.label}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
          <h4 className="page-title">{props['title']}</h4>
        </div>
      </Col>
    </Row>
  );
};

export default PageTitle;
