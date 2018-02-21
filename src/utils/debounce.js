/* eslint-disable fp/no-let */
/*
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
*/
const debounce = (func, wait, immediate) => {
  let timeout;
  return () => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context);
    }
  };
};

export default debounce;
