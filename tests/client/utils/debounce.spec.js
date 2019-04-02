import debounce from '../../../src/utils/debounce.js';

jest.useFakeTimers();

describe('debounce', () => {
    it('immediately calls the passed function if call now is true and no timeout is passed', () => {
	const testfn = jest.fn();
	const db = debounce(testfn, 0, true);
	db();
	expect(testfn).toHaveBeenCalled();
    });

    it('calls the method in the passed amount of time', () => {
	const testfn = jest.fn();
	const db = debounce(testfn, 10000, false);
	db();
	jest.advanceTimersByTime(5000);
	expect(testfn).not.toBeCalled();

	jest.advanceTimersByTime(5000);
	expect(testfn).toHaveBeenCalled();
    })
});
