import { shallowMount } from '@vue/test-utils';
import Pagination from '../../../src/Pagination';

describe('Pagination Component', () => {
  let carousel;

  beforeEach(() => {
    carousel = {
      pageCount: 1,
      paginationPadding: 1,
      paginationSize: 1,
      paginationActiveColor: 'red',
      paginationColor: 'blue',
      paginationPosition: ['top'],
      slideCount: 2,
      currentPerPage: 2,
      currentPage: 0,
      $children: [
        {
          title: 'title'
        }
      ]
    };
  });

  it('should match the stored snapshot', () => {
    const wrapper = shallowMount(Pagination, { provide: { carousel } });

    expect(wrapper).toMatchSnapshot();
  })
});
