let staticTopEl = document.getElementById("staticTop");
let userIpEl = document.getElementById("userIp");
let addBtnEl = document.getElementById("addBtn");
let saveBtnEl = document.getElementById("saveBtn");
let dynamicContEl = document.getElementById("dynamicCont");
let quoteel = document.getElementById("quote");

let len = 0;

function getFromLocalStorage() {
    let strigifiedData = localStorage.getItem("todos");
    console.log(strigifiedData);
    let parsedData = JSON.parse(strigifiedData);
    if (parsedData === null) {
        return [];
    } else {
        return parsedData;
    }

}

let todoList = getFromLocalStorage();

saveBtnEl.onclick = function() {
    localStorage.setItem("todos", JSON.stringify(todoList));
};

function deleteTask(taskContId) {
    let deletedtask = document.getElementById(taskContId);
    dynamicContEl.removeChild(deletedtask);

    // Remove from array
    let index = todoList.findIndex(function(eachTodo) {
        return eachTodo.uniqueNo === taskContId;
    });

    todoList.splice(index, 1);

}

function createAndAppendTodo(todo) {

    let {
        text,
        uniqueNo,
        isChecked
    } = todo;
    let task = text;

    len = len + 1;
    userIpEl.value = "";

    let taskCont = document.createElement("div");
    taskCont.classList.add("p-2", "d-flex", "flex-row");
    taskCont.id = uniqueNo;
    let taskContId = taskCont.id;
    dynamicContEl.appendChild(taskCont);

    let taskCheckBoxEl = document.createElement("input");
    taskCheckBoxEl.classList.add("mr-2");
    taskCheckBoxEl.type = "checkbox";
    taskCheckBoxEl.checked = isChecked;
    taskCheckBoxEl.id = "check" + len;

    /*
    console.log(taskContId);
    console.log(taskCheckBoxEl.id);
    console.log(task);
    */
    taskCont.appendChild(taskCheckBoxEl);

    let checkBoxLabel = document.createElement("label");
    checkBoxLabel.textContent = text;

    //help of ai
    if (isChecked) {
        checkBoxLabel.classList.add("is-checked");
    }
    //


    checkBoxLabel.classList.add("label-container", "pl-2");
    checkBoxLabel.setAttribute("for", ("check" + len));

    taskCheckBoxEl.onclick = function() {
        // update object
        todo.isChecked = taskCheckBoxEl.checked;

        if (taskCheckBoxEl.checked) {
            checkBoxLabel.classList.toggle("is-checked", taskCheckBoxEl.checked);
        } else {
            checkBoxLabel.classList.toggle("is-checked", taskCheckBoxEl.checked);
        }

        // update localStorage
        localStorage.setItem("todos", JSON.stringify(todoList));
    };


    taskCont.appendChild(checkBoxLabel);

    let deleteIcon = document.createElement("div");
    deleteIcon.id = uniqueNo;
    deleteIcon.textContent = "❌";
    deleteIcon.onclick = function() {
        deleteTask(uniqueNo);
        localStorage.removeItem(uniqueNo);
    };
    taskCont.appendChild(deleteIcon);
}

addBtnEl.onclick = function() {

    let task = userIpEl.value;
    userIpEl.value = "";
    if (task === "") {
        return;
    }

    let newTodo = {
        text: task,
        uniqueNo: Date.now(),
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    localStorage.setItem("todos", JSON.stringify(todoList));
};

//add these 2 lines with help of gptBro..
for (let i = 0; i < todoList.length; i++) {
    createAndAppendTodo(todoList[i]);
}

let url = "https://apis.ccbp.in/jokes/random";
fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        quoteel.textContent = jsonData.value;
        //console.log(jsonData);
    });
