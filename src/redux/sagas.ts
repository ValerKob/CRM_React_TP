import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import profileSaga from './profile/saga';
import integrationsSaga from './integrations/saga';
import staffSaga from './staff/saga';

export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), profileSaga(), integrationsSaga(), staffSaga()]);
}
