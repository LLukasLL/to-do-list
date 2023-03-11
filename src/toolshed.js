function createButton(myName, eventFunction) {
  const htmlButton = document.createElement('button');
  htmlButton.classList.add('btn');
  htmlButton.innerHTML = myName;
  htmlButton.addEventListener('click', eventFunction);
  htmlButton.setAttribute('type', 'submit');
  return htmlButton;
}
function createHtmlElement(myType, myID, myName, ...myClasses) {
  const element = document.createElement(myType);
  // eslint-disable-next-line no-restricted-syntax
  for (const myClass of myClasses) {
    element.classList.add(myClass);
  }
  element.innerHTML = myName;
  element.id = myID;
  return element;
}
function createDiv(myID, ...myClasses) {
  const element = document.createElement('div');
  // eslint-disable-next-line no-restricted-syntax
  for (const myClass of myClasses) {
    element.classList.add(myClass);
  }
  element.id = myID;
  return element;
}
function resetPage() {
  const body = document.querySelector('body');
  const content = document.getElementById('content');
  content.remove();
  const newcontent = createHtmlElement('', 'div', '', 'container');
  newcontent.id = 'content';
  body.appendChild(newcontent);
  // return content;
}
function buildLayout() {
  const content = document.getElementById('content');
  const contentRow = createHtmlElement('', 'div', '', 'row');
  const col1 = createHtmlElement('', 'div', '', 'col');
  const mainCol = createHtmlElement('', 'div', '', 'col-8');
  // mainCol.classList.add('row');
  // mainCol.classList.add('justify-content-center');
  const col3 = createHtmlElement('', 'div', '', 'col');
  contentRow.appendChild(col1);
  contentRow.appendChild(mainCol);
  contentRow.appendChild(col3);
  content.appendChild(contentRow);
  return mainCol;
}
/*
function createCard(mainCol, myCard) {
  const row = createHtmlElement('', 'div', '', 'row', 'justify-content-center', 'p-3');
  const card = createHtmlElement('', 'div', myCard.title, 'card', 'w-50');
  const cardBody = createHtmlElement('', 'div', '', 'card-body');
  const cardTitle = createHtmlElement(myCard.title, 'h3', '', 'card-title');
  cardBody.appendChild(cardTitle);
  // eslint-disable-next-line no-restricted-syntax
  for (const text of myCard.text) {
    const textItem = createHtmlElement(text, 'p', '', 'card-text');
    cardBody.appendChild(textItem);
  }
  card.appendChild(cardBody);
  row.appendChild(card);
  mainCol.appendChild(row);
}
*/
function createDateInputNewToDo() {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
  // get today in MM-DD-YYYY:
  const today = new Date().toJSON().slice(0, 10);
  const inputfield = createHtmlElement('input', 'date-input-new', '', 'input');
  inputfield.classList.add('col');
  inputfield.setAttribute('type', 'date');
  inputfield.setAttribute('value', today);
  inputfield.setAttribute('min', today);
  return inputfield;
}

function createCheckbox(booly) {
  const checkbox = document.createElement('input');
  checkbox.classList.add('checkbox');
  checkbox.setAttribute('type', 'checkbox');
  if (booly === true) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
  return checkbox;
}

function createPrioritySlider() {
  const sliderContainer = createDiv('slider-container', 'slider-container');
  const slider = document.createElement('input');
  slider.setAttribute('type', 'range');
  slider.id = 'prio-slider';
  slider.setAttribute('min', '0');
  slider.setAttribute('max', '1');
  slider.value = 0;
  sliderContainer.appendChild(slider);
  return sliderContainer;
}
function createRow(checkbox, nameElement, dateElement, descrElement, prioElement, buttonElement) {
  const rowContainer = createHtmlElement('div', '', '', 'row', 'pad-16px');
  const checkboxDiv = createHtmlElement('div', '', '', 'icon', 'mg-r-16px');
  const nameDiv = createHtmlElement('div', '', '', 'col-name', 'mg-r-16px');
  const dateDiv = createHtmlElement('div', '', '', 'col-dueDate', 'mg-r-16px');
  const descrDiv = createHtmlElement('div', '', '', 'col-descr', 'mg-r-16px');
  const prioDiv = createHtmlElement('div', '', '', 'col-prio', 'mg-r-16px');
  const buttondiv = createHtmlElement('div', '', '', 'col-btn', 'mg-r-16px');
  rowContainer.setAttribute('role', 'row');
  checkboxDiv.setAttribute('role', 'gridcell');
  nameDiv.setAttribute('role', 'gridcell');
  dateDiv.setAttribute('role', 'gridcell');
  descrDiv.setAttribute('role', 'gridcell');
  prioDiv.setAttribute('role', 'gridcell');
  buttondiv.setAttribute('role', 'gridcell');
  checkboxDiv.appendChild(checkbox);
  nameDiv.appendChild(nameElement);
  dateDiv.appendChild(dateElement);
  descrDiv.appendChild(descrElement);
  prioDiv.appendChild(prioElement);
  buttondiv.appendChild(buttonElement);
  rowContainer.appendChild(checkboxDiv);
  rowContainer.appendChild(nameDiv);
  rowContainer.appendChild(dateDiv);
  rowContainer.appendChild(descrDiv);
  rowContainer.appendChild(prioDiv);
  rowContainer.appendChild(buttondiv);
  return rowContainer;
}

export {
  createButton,
  createHtmlElement,
  createDiv,
  resetPage,
  buildLayout,
  createDateInputNewToDo,
  createPrioritySlider,
  createRow,
  createCheckbox,
};
