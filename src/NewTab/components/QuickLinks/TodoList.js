import React, { useState, useEffect, useRef } from 'react';
import { itemList } from './TodoItemList';
const CheckboxList = () => {
  const [items, setItems] = useState([]);
  const isInitialMount = useRef(true);
  const [showTodoListInfoContent, setShowTodoListInfoContent] = useState(false);

  // Function to check and update the reset date
  const checkAndUpdateDate = () => {
    const storedData = JSON.parse(localStorage.getItem('checkboxItems')) || {
      items: itemList,
      lastReset: null,
    };
    const today = new Date().toISOString().split('T')[0];

    // if (storedData.lastReset !== today) {
    //   // Reset checkboxes and update lastReset date
    //   const resetItems = storedData.items.map((item) => ({
    //     ...item,
    //     checked: false,
    //   }));
    //   const newData = { items: resetItems, lastReset: today };
    //   localStorage.setItem('checkboxItems', JSON.stringify(newData));
    //   return resetItems;
    // }
    return storedData.items;
  };

  // Load items from local storage or reset them on component mount
  useEffect(() => {
    const loadedItems = checkAndUpdateDate();
    setItems(loadedItems);
  }, []);

  // Save items to local storage when they change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const dataToStore = {
        items: items,
        lastReset: new Date().toISOString().split('T')[0],
      };
      localStorage.setItem('checkboxItems', JSON.stringify(dataToStore));
    }
  }, [items]);

  const handleCheck = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const handleTextChange = (text, index) => {
    const newItems = [...items];
    newItems[index].text = text;
    setItems(newItems);
  };

  const addItem = (currentIndex) => {
    if (items.length > 9) {
      return;
    }
    if (!currentIndex) {
      setItems([...items, { text: '', checked: false }]);
      setTimeout(() => {
        document.getElementById(`todolist-textarea-${items.length}`).focus();
        document.getElementById(`todolist-textarea-${items.length}`).select();
      }, 100);
      return;
    }
    const newItem = { text: '', checked: false };
    // Insert the new item after the current index
    const newItems = [
      ...items.slice(0, currentIndex + 1),
      newItem,
      ...items.slice(currentIndex + 1),
    ];
    setItems(newItems);

    setTimeout(() => {
      document.getElementById(`todolist-textarea-${currentIndex + 1}`).focus();
      document.getElementById(`todolist-textarea-${currentIndex + 1}`).select();
    }, 100);
  };

  const removeitem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  function autoResizeTextarea(event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  return (
    <div
      className="inline-block min-w-[400px] scrollPink max-w-[900px] bg-gray-200 p-2 rounded-lg shadow-md dark:bg-gray-700/80 opacity-50 hover:opacity-80 transition-all"
      style={{ maxHeight: '90vh', overflowY: 'auto' }} // Added maxHeight and overflowY for scroll
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
        Lista Zadań Ślubnych
      </h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-center mb-1">
            <div className="flex flex-col">
              <input
                type="checkbox"
                className="opacity-80 accent-green-500 h-5 w-5 rounded-full focus:none cursor-pointer focus:ring-0"
                checked={item.checked}
                onChange={() => handleCheck(index)}
              />
            </div>
            <textarea
              type="text"
              value={item.text}
              id={`todolist-textarea-${index}`}
              onChange={(e) => {
                handleTextChange(e.target.value, index);
                autoResizeTextarea(e);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevents the default action (inserting a line break)
                  addItem(index);
                }
              }}
              onLoad={(e) => autoResizeTextarea(e)}
              placeholder="Wprowadź swoje zadanie"
              className="opacity-80 flex-1 min-w-0 ml-2 p-1 text-sm text-gray-700 border-b rounded-lg border-gray-300 focus:outline-none focus:border-green-500 transition-colors overflow-hidden resize-none"
              style={{ height: 'auto', minHeight: '24px' }}
            />
            <button
              onClick={() => removeitem(index)}
              className="ml-1 p-0.5 rounded-full"
              title="Add Item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3 text-red-700 dark:text-red-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button
          onClick={() => addItem()}
          className="bg-white p-0.5 rounded-full shadow-md dark:bg-gray-500/80 opacity-90 hover:opacity-80 transition-colors"
          title="Add Item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-black dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <div className="relative flex items-center">
          {items.length <= 9 && (
            <button
              onMouseEnter={() => setShowTodoListInfoContent(true)}
              onMouseLeave={() => setShowTodoListInfoContent(false)}
              className="bg-white p-0.5 rounded-full shadow-md dark:bg-gray-500/80 opacity-90 hover:opacity-80 transition-colors"
              title="Add Item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4 text-black dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </button>
          )}
          {/* Popup Content */}
          {showTodoListInfoContent && (
            <div className="absolute right-6 w-64 mb-2 group-hover:block">
              <div className="bg-gray-900 text-white text-sm rounded py-2 px-4 shadow-lg">
                Ta lista zadań ślubnych została zaprojektowana, aby pomóc Ci
                zorganizować się podczas planowania wielkiego dnia.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckboxList;
