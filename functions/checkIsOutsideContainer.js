const checkIsOutsideContainer = (containerElement, clickedElement, limiter = 5) => {
  // clickedElement is the element that was clicked, containerElement is the possible
  // parent element. We are checking to see if the clicked element is outside
  // of the container element (return true), or a child of it (return false).
  if (!!containerElement && !!clickedElement) {
    let isSameDomElement = false;
    let index = 0;
    let domElement = clickedElement;

    // if isSameDomElement is still false and the index value is less than
    // the limiter number, then continue to traverse up the dom tree
    // note: the limiter is so we don't traverse up the entire dom tree
    // every time, but only up to a certain number of dom elements
    while (!isSameDomElement && index < limiter) {
      index++;
      if (domElement === containerElement) {
        isSameDomElement = true;
      } else if (domElement.parentElement !== null) {
        // if there's still no match, set the dom element to the
        // parent dom element to continue to traverse the dom tree
        domElement = domElement.parentElement;
      }
    }
    // if the eventual domElement matches the containerElement, it means
    // the clicked element is a child of the containerElement, so return true.
    if (isSameDomElement) return false;
  }
  return true;
};

export default checkIsOutsideContainer;
