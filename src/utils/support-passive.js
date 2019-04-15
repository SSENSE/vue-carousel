export default function supportsPassive() {
  let supported = false;
  try {
    var opts = Object.defineProperty({}, "passive", {
      get: function() {
        supported = true;
      }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {}
  return supported;
}
