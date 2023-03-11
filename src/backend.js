const backend = (() => {
  //
  const item = (name, list, status, dueDate, description, priority, ID) => {
    let myName = name;
    let myList = list;
    let myStatus = status;
    let myDueDate = dueDate;
    let myDescription = description;
    let myPriority = priority;
    let myID = ID;
    const getName = () => myName;
    const setName = (newName) => { myName = newName; };
    const getList = () => myList;
    const setList = (newList) => { myList = newList; };
    const getStatus = () => myStatus;
    const setStatus = (newStatus) => { myStatus = newStatus; };
    const getDueDate = () => myDueDate;
    const setDueDate = (newDueDate) => { myDueDate = newDueDate; };
    const getDescription = () => myDescription;
    const setDescription = (newDescription) => { myDescription = newDescription; };
    const getPriority = () => myPriority;
    const setPriority = (newPriority) => { myPriority = newPriority; };
    const getID = () => myID;
    const setID = (newID) => { myID = newID; };
    return {
      getName,
      setName,
      getList,
      setList,
      getStatus,
      setStatus,
      getDueDate,
      setDueDate,
      getDescription,
      setDescription,
      getPriority,
      setPriority,
      getID,
      setID,
    };
  };
  const list = (name, id) => {
    let myName = name;
    const myID = id;
    const getName = () => myName;
    const getID = () => myID;
    const setName = (newName) => { myName = newName; };
    return {
      getName,
      setName,
      getID,
    };
  };
  const getListOfLists = () => {
    let stringListsIndex = localStorage.getItem('list-index');
    let listOfLists = {};
    if (stringListsIndex == null) {
      stringListsIndex = '';
    }
    const arrayListsIndex = stringListsIndex.split('-');
    if (stringListsIndex !== '') {
      // eslint-disable-next-line no-restricted-syntax
      for (const id of arrayListsIndex) {
        const listName = localStorage.getItem(`list-${id}`);
        listOfLists[`${id}`] = list(listName, id);
      }
    } else {
      listOfLists = null;
    }
    return listOfLists;
  };
  const storeList = (myListName) => {
    let newListIndex = 0;
    let stringListsIndex = localStorage.getItem('list-index');
    if (stringListsIndex == null) {
      stringListsIndex = newListIndex;
    } else {
      newListIndex = Number(localStorage.getItem('list-index-highest')) + 1;
      stringListsIndex = `${stringListsIndex}-${newListIndex}`;
    }
    const newListObject = list(myListName, newListIndex);
    localStorage.setItem(`list-${newListIndex}`, newListObject.getName());
    localStorage.setItem('list-index', stringListsIndex);
    localStorage.setItem('list-index-highest', newListIndex);
  };
  const getToDos = (listObject) => {
    // read toDos-index
    let stringToDosIndex = localStorage.getItem(`todo§index§${listObject.getID()}`);
    let toDos = {};
    if (stringToDosIndex == null) {
      stringToDosIndex = '';
    }
    const arrayToDosIndex = stringToDosIndex.split('§');
    if (stringToDosIndex !== '') {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const id of arrayToDosIndex) {
        const stringTodo = localStorage.getItem(`todo§${listObject.getID()}§${id}`);
        const arrayToDo = stringTodo.split('§');
        // eslint-disable-next-line max-len
        toDos[`${id}`] = item(arrayToDo[0], arrayToDo[1], arrayToDo[2], arrayToDo[3], arrayToDo[4], arrayToDo[5], id);
      }
    } else {
      toDos = null;
    }
    return toDos;
  };
  const storeToDo = (toDo, listObject) => {
    let newToDoIndex = 0;
    let stringToDoIndex = localStorage.getItem(`todo§index§${listObject.getID()}`);
    if (stringToDoIndex === null) {
      stringToDoIndex = newToDoIndex;
    } else {
      newToDoIndex = Number(localStorage.getItem(`toDo§index§${listObject.getID()}§highest`)) + 1;
      stringToDoIndex = `${stringToDoIndex}§${newToDoIndex}`;
    }
    const storeProps = `${toDo.getName()}§${toDo.getList()}§${toDo.getStatus()}§${toDo.getDueDate()}§${toDo.getDescription()}§${toDo.getPriority()}`;
    localStorage.setItem(`todo§index§${listObject.getID()}`, stringToDoIndex);
    localStorage.setItem(`todo§index§${listObject.getID()}§highest`, newToDoIndex);
    localStorage.setItem(`todo§${listObject.getID()}§${newToDoIndex}`, storeProps);
  };
  const changeStatus = (boolsy, toDo, listy) => {
    //
    let value = 0;
    if (boolsy) {
      value = 1;
    }
    const storeProps = `${toDo.getName()}§${toDo.getList()}§${value}§${toDo.getDueDate()}§${toDo.getDescription()}§${toDo.getPriority()}`;
    localStorage.setItem(`todo§${listy.getID()}§${toDo.getID()}`, storeProps);
  };
  const deleteList = (listObject) => {
    const arrayListsIndex = localStorage.getItem('list-index').split('-');
    let newStringListsIndex = '';
    for (let i = 0; i < arrayListsIndex.length; i += 1) {
      if (arrayListsIndex[i] !== listObject.getID()) {
        if (i === 0) {
          newStringListsIndex = arrayListsIndex[i];
        } else {
          newStringListsIndex = `${newStringListsIndex}-${arrayListsIndex[i]}`;
        }
      }
      if (listObject.getID() === arrayListsIndex[0] && i === 1) {
        newStringListsIndex = arrayListsIndex[i];
      }
    }
    if (newStringListsIndex === '') {
      localStorage.removeItem('list-index');
      localStorage.removeItem('list-index-highest');
    } else {
      localStorage.setItem('list-index', newStringListsIndex);
    }
    localStorage.removeItem(`list-${listObject.getID()}`);
    // delete all todos from this list
    let stringToDosIndex = localStorage.getItem(`todo§index§${listObject.getID()}`);
    if (stringToDosIndex == null) {
      stringToDosIndex = '';
    }
    const arrayToDosIndex = stringToDosIndex.split('§');
    if (stringToDosIndex !== '') {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const id of arrayToDosIndex) {
        localStorage.removeItem(`todo§${listObject.getID()}§${id}`);
      }
    }
  };
  const deleteTodo = (toDo, listObject) => {
    const arrayToDosIndex = localStorage.getItem(`todo§index§${listObject.getID()}`).split('-');
    let newStringtoDosIndex = '';
    for (let i = 0; i < arrayToDosIndex.length; i += 1) {
      if (arrayToDosIndex[i] !== toDo.getID()) {
        if (i === 0) {
          newStringtoDosIndex = arrayToDosIndex[i];
        } else {
          newStringtoDosIndex = `${newStringtoDosIndex}-${arrayToDosIndex[i]}`;
        }
      }
      if (listObject.getID() === arrayToDosIndex[0] && i === 1) {
        newStringtoDosIndex = arrayToDosIndex[i];
      }
    }
    if (newStringtoDosIndex === '') {
      localStorage.removeItem(`todo§index§${listObject.getID()}`);
      localStorage.removeItem(`todo§index§${listObject.getID()}§highest`);
    } else {
      localStorage.setItem(`todo§index§${listObject.getID()}`, newStringtoDosIndex);
    }
    localStorage.removeItem(`todo§${listObject.getID()}§${toDo.getID()}`);
  };
  const editToDo = (toDo, listObj) => {
    const storeProps = `${toDo.getName()}§${toDo.getList()}§${toDo.getStatus()}§${toDo.getDueDate()}§${toDo.getDescription()}§${toDo.getPriority()}`;
    localStorage.setItem(`todo§${listObj.getID()}§${toDo.getID()}`, storeProps);
  };
  return {
    item,
    list,
    storeList,
    getListOfLists,
    storeToDo,
    getToDos,
    changeStatus,
    deleteList,
    deleteTodo,
    editToDo,
  };
})();

export default backend;
