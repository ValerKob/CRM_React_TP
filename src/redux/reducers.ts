import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Profile from './profile/reducers';
import Integrations from './integrations/reducers';
import Staff from './staff/reducers';

export default combineReducers({
    Auth,
    Layout,
    Profile,
    Integrations,
    Staff
});
