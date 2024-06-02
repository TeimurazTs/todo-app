(function () {
  let state = undefined;
  let state2 = undefined;

  function useState(initialValue) {
    state = state || initialValue;
    state2 = state2 || null;

    function setValue(newValue) {
      state = newValue;
      renderApp();
    }

    return [state, setValue];
  }

  function useState2(initialValue) {
    state2 = state2 || initialValue;

    function setValue2(newValue) {
      state2 = newValue;
      renderApp();
    }

    return [state2, setValue2];
  }

  function createElement(elementData) {
    const element = document.createElement(`${elementData.tag}`);
    if (elementData.eventParameters) {
      element.addEventListener(
        `${elementData.eventParameters.name}`,
        elementData.eventParameters.callback
      );
    }
    if (elementData.classList) {
      element.classList.add(...elementData.classList);
    }
    if (elementData.text) {
      element.innerHTML = elementData.text;
    }
    if (elementData.attribute) {
      elementData.attribute.forEach((el) => {
        element.setAttribute(`${el.attributeName}`, `${el.attributeValue}`);
      });
    }
    if (elementData.parent) {
      elementData.parent.append(element);
    }
    if (elementData.child) {
      element.append(elementData.child);
    }
    return element;
  }

  let filteredArrayDone;

  let [itemsDone, setItemsDone] = useState2([]);

  let filteredArray;

  let [items, setItems] = useState([
    "Clean you room",
    "Do homework",
    "Workout",
    "try",
    "ceremony",
    "farewell",
    "dwell",
  ]);

  function App() {
    function filterTasks(event) {
      filteredArray = items.filter((el) => {
        let lowerCaseString = el.toLowerCase();
        return lowerCaseString.includes(event.target.value.toLowerCase());
      });
      let ul = document.querySelector(".remove-ul");
      ul.innerHTML = "";
      Lists(filteredArray);

      filteredArrayDone = itemsDone.filter((el) => {
        console.log(el, "el");
        let lowerCaseStringDone = el.toLowerCase();
        return lowerCaseStringDone.includes(event.target.value.toLowerCase());
      });
      let ulDone = document.querySelector(".remove-ul-done");
      ulDone.innerHTML = "";
      listDone(filteredArrayDone);
    }

    function addItem() {
      let task = document.querySelector(".input-add-task");
      console.log(task.value);
      items.push(task.value);
      task.value = "";
      let modal = document.querySelector(".modal");
      console.log(modal);
      modal.remove();
      renderApp();
    }

    function closedModalCallback() {
      document.querySelector(".modal").remove();
      document.body.removeEventListener("click", closedModalCallback);
    }

    function closeModal() {
      document.body.addEventListener("click", closedModalCallback);
    }

    function openModal(event) {
      console.log('openmodal runs')
      let modal = createElement({
        tag: "div",
        classList: ["modal"],
        eventParameters: { name: "mouseleave", callback: closeModal },
      });
      createElement({
        tag: "input",
        parent: modal,
        classList: ["input-add-task"],
      });
      createElement({
        tag: "button",
        eventParameters: { name: "click", callback: addItem },
        parent: modal,
        text: "add Task",
        classList: ["button-add-modal-input"],
      });
      modal.addEventListener("mouseenter", () => {
        document.body.removeEventListener("click", closedModalCallback);
      });
      document.body.append(modal);
    }

    const div = document.createElement("div");
    div.classList.add("main");

    createElement({
      tag: "h2",
      parent: div,
      text: "To Do Tasks",
      classList: ["todo-task-title"],
    });

    const andInputSearch = document.createElement("div");
    andInputSearch.classList.add("andInputSearch", "margin-bt-md");

    createElement({
      tag: "input",
      attribute: [{ attributeName: "type", attributeValue: "text" }],
      parent: andInputSearch,
      eventParameters: { name: "change", callback: filterTasks },
      classList: ["main-input"],
    });

    createElement({
      tag: "button",
      text: "+ New Task",
      parent: andInputSearch,
      eventParameters: { name: "click", callback: openModal },
      classList: ["button-open-modal"],
    });

    div.append(andInputSearch);

    createElement({
      tag: "p",
      text: "All Tasks",
      parent: div,
      classList: ["p-all-task", "margin-bt-md"],
    });

    function moveTodos(event) {
      const nodes = Array.prototype.slice.call(
        event.target.parentElement.parentElement.children
      );
      let thatIndex = nodes.indexOf(event.target.parentElement);
      if (event.target.checked) {
        let removed = state.splice(thatIndex, 1);
        state2.push(...removed);
        renderApp();
      } else {
        let removed = state2.splice(thatIndex, 1);
        state.push(...removed);
        renderApp();
      }
    }

    function deleteTodos(event) {
      const nodes = Array.prototype.slice.call(
        event.target.parentElement.parentElement.children
      );
      let thatIndex = nodes.indexOf(event.target.parentElement);
      if (event.target.parentElement.children[0].checked) {
        itemsDone.splice(thatIndex, 1);
        renderApp();
      } else {
        items.splice(thatIndex, 1);
        renderApp();
      }
    }

    const andInputUlButton = document.createElement("div");
    andInputUlButton.classList.add("margin-bt-md", "remove-ul");

    function Lists(arr = items) {
      for (let i = 0; i < arr.length; i++) {
        const ul = createElement({ tag: "div", parent: andInputUlButton });
        ul.classList.add("ul-flex", "margin-bt-sm");

        createElement({
          tag: "input",
          attribute: [{ attributeName: "type", attributeValue: "checkbox" }],
          parent: ul,
          eventParameters: { name: "click", callback: moveTodos },
        });

        createElement({
          tag: "li",
          text: arr[i],
          parent: ul,
        });

        createElement({
          tag: "button",
          text: "delete",
          eventParameters: {
            name: "click",
            callback: deleteTodos,
          },
          parent: ul,
          classList: ["button-delete"],
        });
      }
    }

    Lists();

    div.append(andInputUlButton);

    createElement({
      tag: "p",
      text: "Completed Tasks",
      parent: div,
      classList: ["p-all-task", "second-task", "margin-bt-md"],
    });

    const andInputUlButtonDeleted = document.createElement("div");
    andInputUlButtonDeleted.classList.add("margin-bt-md", "remove-ul-done");

    function listDone(arr = itemsDone) {
      for (let i = 0; i < arr.length; i++) {
        const ulDeleted = createElement({
          tag: "div",
          parent: andInputUlButtonDeleted,
        });
        ulDeleted.classList.add("ul-flex", "margin-bt-sm");

        createElement({
          tag: "input",
          attribute: [
            { attributeName: "type", attributeValue: "checkbox" },
            { attributeName: "checked", attributeValue: "true" },
          ],
          parent: ulDeleted,
          eventParameters: { name: "click", callback: moveTodos },
        });

        createElement({
          tag: "li",
          text: arr[i],
          parent: ulDeleted,
        });

        createElement({
          tag: "button",
          text: "delete",
          eventParameters: { name: "click", callback: deleteTodos },
          parent: ulDeleted,
          classList: ["button-delete"],
        });
      }
    }

    listDone();

    div.append(andInputUlButtonDeleted);

    return div;
  }

  function renderApp() {
    const appContainer = document.getElementById("functional-example");
    appContainer.innerHTML = "";
    appContainer.append(App());
  }

  renderApp();
})();
