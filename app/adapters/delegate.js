import ApplicationAdapter from './application';
import config from 'client/config/environment';

export default ApplicationAdapter.extend({
  type: 'delegate',

  url: config.APP.API_HOST + 'delegates',
});
