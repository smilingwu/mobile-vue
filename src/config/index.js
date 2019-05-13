import dev from './dev';
import test from './test';
import pro from './pro';

const env = process.env.VUE_APP_ENV || 'dev';

const config = {
    dev,
    test,
    pro,
};
export default config[env];
