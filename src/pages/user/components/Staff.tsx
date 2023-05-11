import React, { useEffect } from 'react';
import ContactsDetails from './ContactsDetails';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// store
import { AppDispatch, RootState } from '../../../redux/store';

// actions
import { getStaff } from '../../../redux/actions';
import { Col } from 'react-bootstrap';
import Spinner from '../../../components/Spinner';

const Staff = () => {
  const { staff, loading } = useSelector(
    (state: RootState) => state.Staff,
    shallowEqual
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!staff) {
      dispatch(getStaff());
    }
  }, [dispatch, staff]);

  return (
    <>
      {loading ? (
        <Col>
          <Spinner type="grow" size="sm" />
        </Col>
      ) : (
        <ContactsDetails contactDetails={staff} />
      )}
    </>
  );
};

export default Staff;
