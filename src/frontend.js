import backend from './backend';
import {
  createCheckbox, createDateInputNewToDo, createDiv,
  createHtmlElement, createPrioritySlider, createRow,
} from './toolshed';

const content = (() => {
  // content functions
  // let activeList = {};
  const clearContent = () => {
    const contentDiv = document.getElementById('content');
    const oldContentContainer = document.getElementById('content-container');
    oldContentContainer.remove();
    const newContentContainer = createDiv('content-container', 'content-container', 'mg-2');
    contentDiv.appendChild(newContentContainer);
    return newContentContainer;
  };
  const createNewToDoForm = (loadedList) => {
    const checkbox = createCheckbox(false);
    checkbox.classList.add('newToDo-checkbox');
    const toDoName = createHtmlElement('input', 'newToDo-Name', '', 'newToDo-input');
    toDoName.setAttribute('placeholder', 'New To Do');
    const dueDate = createDateInputNewToDo();
    const descr = createHtmlElement('input', 'newToDo-description', '', 'newToDo-description');
    descr.setAttribute('type', 'text');
    descr.setAttribute('placeholder', 'Description');
    const prio = createPrioritySlider();
    const btnSubmitToDo = document.createElement('button');
    btnSubmitToDo.classList.add('btn');
    btnSubmitToDo.innerHTML = 'submit';
    btnSubmitToDo.setAttribute('type', 'submit');
    btnSubmitToDo.addEventListener('click', () => {
      const newStatus = document.getElementsByClassName('newToDo-checkbox').checked;
      const newName = document.getElementById('newToDo-Name').value;
      const newDueDate = document.getElementById('date-input-new').value;
      const newDescr = document.getElementById('newToDo-description').value;
      const newPrio = document.getElementById('prio-slider').value;
      const newTodo = backend.item(
        newName,
        loadedList.getID(),
        newStatus,
        newDueDate,
        newDescr,
        newPrio,
      );
      backend.storeToDo(newTodo, loadedList);
    });
    const row = createRow(checkbox, toDoName, dueDate, descr, prio, btnSubmitToDo);
    row.classList.add('top-border');
    return row;
  };
  const createTableHeader = () => {
    const checkbox = createHtmlElement('span', '', '', 'nothing');
    const name = createHtmlElement('span', '', 'Name', 'header', 'bold');
    const dueDate = createHtmlElement('span', '', 'Due Date', 'header', 'bold');
    const descr = createHtmlElement('span', '', 'Description', 'header', 'bold');
    const prio = createHtmlElement('span', '', 'Priority', 'header', 'bold');
    const btn = createHtmlElement('span', '', '', 'nothing');
    const row = createRow(checkbox, name, dueDate, descr, prio, btn);
    return row;
  };
  const createDOMToDo = (toDo, list) => {
    let checkboxValue = false;
    if (toDo.getStatus() === '1') { checkboxValue = true; }
    const checkbox = createCheckbox(checkboxValue);
    checkbox.addEventListener('change', () => {
      if (this.checked) {
        backend.changeStatus(true, toDo, list);
        toDo.setStatus('1');
      } else {
        backend.changeStatus(false, toDo, list);
        toDo.setStatus('0');
      }
    });
    const toDoName = createHtmlElement('span', '', toDo.getName(), 'to-do-name');
    const dueDate = createHtmlElement('span', '', toDo.getDueDate(), 'to-do-date');
    const descr = createHtmlElement('span', '', toDo.getDescription(), 'to-do-descr');
    const prio = createHtmlElement('span', '', toDo.getPriority(), 'to-do-prio');
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn');
    btnEdit.innerHTML = 'edit';
    btnEdit.setAttribute('type', 'button');
    const row = createRow(checkbox, toDoName, dueDate, descr, prio, btnEdit);
    row.classList.add('top-border');
    btnEdit.addEventListener('click', () => {
      while (row.firstChild) {
        row.removeChild(row.lastChild);
      }
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn');
      deleteButton.innerHTML = 'x';
      deleteButton.setAttribute('type', 'submit');
      deleteButton.addEventListener('click', () => { backend.deleteTodo(toDo, list); });
      const inputToDoName = createHtmlElement('input', 'editToDo-Name', '', 'ToDo-input');
      inputToDoName.value = toDo.getName();
      const inputDueDate = createDateInputNewToDo();
      const inputDescr = createHtmlElement('input', 'editToDo-descr', '', 'ToDo-description');
      inputDescr.value = toDo.getDescription();
      const inputPrio = createPrioritySlider();
      const btnSubmitToDoAgain = document.createElement('button');
      btnSubmitToDoAgain.classList.add('btn');
      btnSubmitToDoAgain.innerHTML = 'submit';
      btnSubmitToDoAgain.setAttribute('type', 'button');
      btnSubmitToDoAgain.addEventListener('click', () => {
        toDo.setName(document.getElementById('editToDo-Name').value);
        toDo.setDueDate(document.getElementById('date-input-new').value);
        toDo.setDescription(document.getElementById('editToDo-descr').value);
        toDo.setPriority(document.getElementById('prio-slider').value);
        backend.editToDo(toDo, list);
      });
      const newRow = createRow(
        deleteButton,
        inputToDoName,
        inputDueDate,
        inputDescr,
        inputPrio,
        btnSubmitToDoAgain,
      );
      newRow.classList.add('top-border');
      row.replaceWith(newRow);
    });
    return row;
  };
  const loadListIntoContent = (listObject) => {
    const objLists = backend.getListOfLists();
    let arrLists = [];
    if (objLists !== null) { arrLists = Object.values(objLists); }
    const loadedList = arrLists[listObject.getID()];
    const contentContainer = clearContent();
    const form = createHtmlElement('form', 'new-ToDo-form', '', 'new-ToDo-form');
    const listContainer = createHtmlElement('div', '', '', 'to-do-list', 'container', 'radius-6');
    listContainer.setAttribute('role', 'grid');
    listContainer.appendChild(createTableHeader());
    const toDos = backend.getToDos(loadedList);
    let arrToDos = [];
    if (toDos !== null) { arrToDos = Object.values(toDos); }
    if (arrToDos !== {}) {
      // eslint-disable-next-line no-restricted-syntax
      for (const toDo of arrToDos) {
        listContainer.appendChild(createDOMToDo(toDo, loadedList));
      }
    }
    listContainer.appendChild(createNewToDoForm(loadedList));
    form.appendChild(listContainer);
    contentContainer.appendChild(form);
  };
  return { loadListIntoContent };
})();

const sidebarLeft = (() => {
  // sidebar functions
  const clearSidebarContent = () => {
    const panelDiv = document.getElementById('sideboard-left');
    const oldSBLContainer = document.getElementById('sbl-container');
    oldSBLContainer.remove();
    const newSBLContainer = createDiv('sbl-container', 'sbl-container', 'mg-2', 'right-border');
    panelDiv.appendChild(newSBLContainer);
    return newSBLContainer;
  };
  /*
  const createDOMMainList = () => {
    const mainList = createHtmlElement('li', '', '', 'sbl-li');
    return mainList;
  };
  */
  const createDOMList = (listItem) => {
    const itemContainer = createHtmlElement('li', '', '', 'sbl-li');
    const itemName = createHtmlElement('p', `list-${listItem.getID()}`, listItem.getName(), 'sbl-item-name', 'center');
    const form = createHtmlElement('form', '', '', 'removeBtnForm', 'center');
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'x';
    removeBtn.classList.add('btn');
    removeBtn.setAttribute('type', 'submit');
    removeBtn.addEventListener('click', () => { backend.deleteList(listItem); });
    itemContainer.addEventListener('click', () => { content.loadListIntoContent(listItem); });
    itemContainer.appendChild(itemName);
    form.appendChild(removeBtn);
    itemContainer.appendChild(form);
    return itemContainer;
  };
  const createNewListForm = () => {
    const itemContainer = createHtmlElement('li', '', '', 'sbl-li');
    const newListForm = createHtmlElement('form', 'newList-form', '', 'new-list-form', 'fit-space', 'pad-4px');
    const newListInput = createHtmlElement('input', 'newList-input', '', 'new-list-name', 'mr-16px', 'fit-space');
    const btnSubmitList = document.createElement('button');
    btnSubmitList.classList.add('btn');
    btnSubmitList.innerHTML = 'submit';
    btnSubmitList.setAttribute('type', 'submit');
    btnSubmitList.addEventListener('click', () => { backend.storeList(document.getElementById('newList-input').value); });
    newListForm.appendChild(newListInput);
    newListForm.appendChild(btnSubmitList);
    itemContainer.appendChild(newListForm);
    return itemContainer;
  };
  // main build function
  const build = () => {
    const sblContainer = clearSidebarContent();
    const listOfLists = createHtmlElement('ul', 'sbl-ul', '', 'sbl-ul', 'mr-16px');
    const header = createHtmlElement('li', 'lists-header-div', '', 'sbl-item-name', 'center');
    const headerText = createHtmlElement('span', 'lists-header-text', 'Your lists:', 'sbl-li');
    header.appendChild(headerText);
    listOfLists.appendChild(header);
    // listOfLists.appendChild(createMainList());
    const objLists = backend.getListOfLists();
    let arrLists = [];
    if (objLists !== null) {
      arrLists = Object.values(objLists);
    }
    if (arrLists !== {}) {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const list of arrLists) {
        listOfLists.appendChild(createDOMList(list));
      }
    }
    listOfLists.appendChild(createNewListForm());
    sblContainer.appendChild(listOfLists);
  };
  return { build };
})();

export {
  sidebarLeft,
  content,
};
