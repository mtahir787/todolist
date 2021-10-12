import React, { useState, useEffect } from "react";

const getLocalStorage = () => {
  const list = localStorage.getItem("todolist");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const TodoApp = () => {
  const [inputText, setInputText] = useState("");
  const [listItems, setlistItems] = useState(getLocalStorage());
  const [isEditableItem, setisEditableItem] = useState("");
  const [editCondition, seteditCondition] = useState(false);

  const addItem = () => {
    if (!inputText) {
      alert("please input data to insert in list");
    } else if (inputText && editCondition) {
      setlistItems(
        listItems.map((curElem) => {
          if (curElem.id === isEditableItem) {
            return { ...curElem, name: inputText };
          }
          return curElem;
        })
      );
      setInputText("");
      setisEditableItem(null);
      seteditCondition(false);
    } else {
      const condition = listItems.find((item) => {
        if (item.name == inputText) {
          alert(`item "${inputText}" already exists.`);
          return true;
        }
      });
      if (!condition) {
        const newInputData = {
          id: new Date().getTime().toString(),
          name: inputText,
        };
        setlistItems([...listItems, newInputData]);
        setInputText("");
      }
    }
  };

  const deleteItem = (id) => {
    const updatedList = listItems.filter((item) => {
      return !(item.id === id);
    });
    setlistItems(updatedList);
  };

  const editItem = (id) => {
    const itemToEdit = listItems.find((curElem) => {
      return curElem.id === id;
    });
    setInputText(itemToEdit.name);
    setisEditableItem(itemToEdit.id);
    seteditCondition(true);
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(listItems));
  }, [listItems]);

  return (
    <>
      <div className="container">
        <figure>
          <div className="note_img">📝</div>
          <figcaption>Add Your List Here ✌</figcaption>
        </figure>
        <div className="additem">
          <input
            type="text"
            className="form-control"
            placeholder="✍ to add item"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {!editCondition ? (
            <i className="fas fa-plus add_btn" onClick={addItem}></i>
          ) : (
            <i className="far fa-edit" onClick={addItem}></i>
          )}
        </div>
        <div className="list">
          {listItems.map((item) => {
            return (
              <div className="list_item" key={item.id}>
                <h3>{item.name}</h3>
                <div className="todo_btns">
                  <i
                    className="far fa-edit"
                    onClick={() => editItem(item.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deleteItem(item.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <button className="romove_all_items" onClick={() => setlistItems([])}>
          Remove All
        </button>
      </div>
    </>
  );
};

export default TodoApp;
