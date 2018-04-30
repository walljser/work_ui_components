import {
  MockData
} from '@/utils/index';
import authors from './authors';
import work from './work';

const apis = {
  ...authors(),
  ...work()
}

const mock = new MockData(apis);

export default mock