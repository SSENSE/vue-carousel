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
      paginationPosition: 'top',
      slideCount: 2,
      scrollPerPage: true,
      currentPerPage: 2,
      currentPage: 0,
      $children: [
        {
          title: 'title1'
        }
      ]
    };
  });

  it('should match the stored snapshot', () => {
    const wrapper = shallowMount(Pagination, { provide: { carousel } });

    expect(wrapper).toMatchSnapshot();
  });

  it('should not contain a button', () => {
    carousel.pageCount = 0;

    const wrapper = shallowMount(Pagination, { provide: { carousel } });

    expect(wrapper.find('button').exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a button', () => {
    const wrapper = shallowMount(Pagination, { provide: { carousel } });

    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should set the correct title', () => {
    const wrapper = shallowMount(Pagination, { provide: { carousel } });

    expect(wrapper.vm.getDotTitle(0)).toBe('title1');
  });

  it('should emit paginationclick button event with index 0 when button is clicked', () => {
    const wrapper = shallowMount(Pagination, { provide: { carousel } });

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted().paginationclick[0][0]).toBe(0);
  });

  describe('paginationCount', () => {
    it('should be set to pageCount if scrollPerPage is enabled', () => {
      carousel.scrollPerPage = true;
      carousel.pageCount = 1;

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationCount).toBe(1);
    });

    it('should be set to 0 if the slideCount is undefined and scrollPerPage is disabled', () => {
      carousel.scrollPerPage = false;
      carousel.slideCount = undefined;

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationCount).toBe(0);
    });

    it('should be set to 1 if the slideCount is 1 and scrollPerPage is disabled', () => {
      carousel.scrollPerPage = false;
      carousel.slideCount = 1;

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationCount).toBe(1);
    });
  });

  describe('isCurrentDot', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMount(Pagination, { provide: { carousel } });
    });

    it('should be false when not the current dot', () => {
      expect(wrapper.vm.isCurrentDot(1)).toBe(false);
    });

    it('should be true when it is the current dot', () => {
      expect(wrapper.vm.isCurrentDot(0)).toBe(true);
    })
  });

  // TODO: What is with this expected behaviour?
  describe('paginationPropertyBasedOnPosition', () => {
    // `bottom`, `bottom-overlay`, `top` and `top-overlay`
    it('should be set to bottom if paginationPosition is set to top', () => {
      carousel.paginationPosition = 'top';

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationPropertyBasedOnPosition).toBe('bottom');
    });

    it('should be set to bottom if paginationPosition is set to top-overlay', () => {
      carousel.paginationPosition = 'top-overlay';

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationPropertyBasedOnPosition).toBe('bottom');
    });

    it('should be set to top if paginationPosition is set to bottom', () => {
      carousel.paginationPosition = 'bottom';

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationPropertyBasedOnPosition).toBe('top');
    });

    it('should be set to top if paginationPosition is set to bottom-overlay', () => {
      carousel.paginationPosition = 'bottom-overlay';

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationPropertyBasedOnPosition).toBe('top');
    });
  });

  describe('paginationPositionModifierName', () => {
    it('should be the paginationPosition if set to top-overlay', () => {
      carousel.paginationPosition = 'top-overlay';

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationPositionModifierName).toBe('top-overlay');
    });

    it('should be the paginationPosition if set to bottom-overlay', () => {
      carousel.paginationPosition = 'bottom-overlay';

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationPositionModifierName).toBe('bottom-overlay');
    });

    it('should be undefined if set to top', () => {
      carousel.paginationPosition = 'top';

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationPositionModifierName).toBeUndefined();
    });

    it('should be undefined if set to bottom', () => {
      carousel.paginationPosition = 'bottom';

      const wrapper = shallowMount(Pagination, { provide: { carousel } });

      expect(wrapper.vm.paginationPositionModifierName).toBeUndefined();
    });
  });
});
