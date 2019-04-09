function crtEl(options) {
  const {
    element,
    classNames,
    parent,
    id,
    textContent } = options;

  const newElm = document.createElement(element);

  if(classNames) newElm.className = classNames;
  if(id) newElm.id = id;
  if(textContent) newElm.textContent = textContent;
  if(parent) parent.appendChild(newElm);

  return newElm;
}

export default crtEl;