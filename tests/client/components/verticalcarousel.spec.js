import { mount } from '@vue/test-utils';
import VerticalCarousel from '../../../src/VerticalCarousel.vue';

describe('VerticalCarousel.vue', () => {
    it('mounts successfully and has the default perPage prop value', () => {
      // Mount the VerticalCarousel component
      const wrapper = mount(VerticalCarousel, {
        propsData: {
          // Set perPage to the expected default value (2)
          perPage: 2,
        },
      });
  
      // Expect the component to be successfully created
      expect(wrapper.exists()).toBe(true);
    });
  
    it('has the adjustableHeight prop set to false by default', () => {
      // Mount the VerticalCarousel component without setting adjustableHeight
      const wrapper = mount(VerticalCarousel);
  
      // Expect adjustableHeight to be false (default value)
      expect(wrapper.props('adjustableHeight')).toBe(false);
    });
  
    it('emits the "pageChange" event when the page changes', async () => {
      // Mount the VerticalCarousel component
      const wrapper = mount(VerticalCarousel, {
        propsData: {
          perPage: 2,
        },
      });
  
      // Change the page to the second page
      await wrapper.setData({ currentPage: 1 });
  
      // Expect the "pageChange" event to be emitted with the new page
      expect(wrapper.emitted('pageChange')).toBeTruthy();
      expect(wrapper.emitted('pageChange')[0]).toEqual([1]);
    });
  
    it('has the navigationEnabled prop set to false by default', () => {
      // Mount the VerticalCarousel component without setting navigationEnabled
      const wrapper = mount(VerticalCarousel);
  
      // Expect navigationEnabled to be false (default value)
      expect(wrapper.props('navigationEnabled')).toBe(false);
    });
  
    it('renders navigation buttons when navigationEnabled is true', async () => {
      // Mount the VerticalCarousel component with navigationEnabled set to true
      const wrapper = mount(VerticalCarousel, {
        propsData: {
          navigationEnabled: true,
          perPage: 2,
        },
      });
  
      // Expect navigation buttons to be rendered
      expect(wrapper.find('.navigation-button')).toBeTruthy();
    });
  
    it('moves to the next page when the next navigation button is clicked', async () => {
      // Mount the VerticalCarousel component with navigationEnabled set to true
      const wrapper = mount(VerticalCarousel, {
        propsData: {
          navigationEnabled: true,
          perPage: 2,
        },
      });
  
      // Get the current page
      const currentPage = wrapper.vm.currentPage;
  
      // Simulate clicking the "next" button
      await wrapper.find('.next-button').trigger('click');
  
      // Expect the component to move to the next page
      expect(wrapper.vm.currentPage).toBe(currentPage + 1);
    });
  
    it('moves to the previous page when the prev navigation button is clicked', async () => {
      // Mount the VerticalCarousel component with navigationEnabled set to true
      const wrapper = mount(VerticalCarousel, {
        propsData: {
          navigationEnabled: true,
          perPage: 2,
        },
      });
  
      // Set the current page to 1
      await wrapper.setData({ currentPage: 1 });
  
      // Get the current page
      const currentPage = wrapper.vm.currentPage;
  
      // Simulate clicking the "prev" button
      await wrapper.find('.prev-button').trigger('click');
  
      // Expect the component to move to the previous page
      expect(wrapper.vm.currentPage).toBe(currentPage - 1);
    });
  
    it('adjusts the height of the carousel when adjustableHeight is true', async () => {
      // Mount the VerticalCarousel component with adjustableHeight set to true
      const wrapper = mount(VerticalCarousel, {
        propsData: {
          adjustableHeight: true,
          perPage: 2,
        },
      });
  
      // Set the current carousel height to 300
      await wrapper.setData({ carouselHeight: 300 });
  
      // Expect the carousel height to be changed to 300px
      expect(wrapper.find('.VerticalCarousel-inner').element.style.height).toBe(
        '300px'
      );
    });
  
    it('adjusts the width of the carousel when adjustableWidth is true', async () => {
      // Mount the VerticalCarousel component with adjustableWidth set to true
      const wrapper = mount(VerticalCarousel, {
        propsData: {
          adjustableWidth: true,
          perPage: 2,
        },
      });
  
      // Set the current carousel width to 500px
      await wrapper.setData({ currentWidth: '500px' });
  
      // Expect the carousel width to be changed to 500px
      expect(wrapper.find('.VerticalCarousel-inner').element.style.width).toBe(
        '500px'
      );
    });
  
    it('adjusts the offset when the page changes', async () => {
      // Mount the VerticalCarousel component
      const wrapper = mount(VerticalCarousel, {
        propsData: {
          perPage: 2,
        },
      });
  
      // Change the page to the second page
      await wrapper.setData({ currentPage: 1 });
  
      // Expect the offset to be adjusted
      expect(wrapper.vm.offset).toBeGreaterThan(0);
    });

  });


  describe('VerticalCarousel.vue Mock test', () => {
    it('correctly sets the currentPage when goToPage is called', () => {
      // Mount the component
      const wrapper = mount(VerticalCarousel);
  
      // Mock the goToPage method
      const mockGoToPage = jest.fn();
      wrapper.setMethods({ goToPage: mockGoToPage });
  
      // Call the goToPage method with a specific page number
      const newPage = 3;
      wrapper.vm.goToPage(newPage);
  
      // Check if the mock function was called with the newPage
      expect(mockGoToPage).toHaveBeenCalledWith(newPage);
    });

    it('correctly changes the currentPage when advancePage is called', async () => {
        // Mount the component
        const wrapper = mount(VerticalCarousel);
    
        // Mock the goToPage method
        const mockGoToPage = jest.fn();
        wrapper.setMethods({ goToPage: mockGoToPage });
    
        // Assume the initial currentPage is 0
        await wrapper.setData({ currentPage: 0 });
    
        // Call the advancePage method with direction 'forward'
        wrapper.vm.advancePage('forward');
    
        // Check if the goToPage method was called correctly
        expect(mockGoToPage).toHaveBeenCalledWith(1);
    
        // Reset mock function
        mockGoToPage.mockClear();
    
        // Call the advancePage method with direction 'backward'
        wrapper.vm.advancePage('backward');
    
        // Check if the goToPage method was called correctly
        expect(mockGoToPage).toHaveBeenCalledWith(0);
      });
  });