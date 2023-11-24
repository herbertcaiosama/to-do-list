document.addEventListener("DOMContentLoaded", () => {

    // Array para armazenar as tarefas
    let tasks = [];

    // Função para renderizar a lista de tarefas
    const renderTasks = () => {
        const listContainer = document.querySelector(".list-container");
        listContainer.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list");
            listItem.innerHTML = `
          <ion-icon name="document-text-outline" class="icon-text" size="large"></ion-icon>
          <span class="to-do" data-index="${index}">${task.description}</span>
          <ion-icon data-index="${index}" name="trash-outline" class="icon-trash" size="large"></ion-icon>
          <input type="checkbox" class="list-checkbox" data-index="${index}" ${task.completed ? "checked" : ""}>
        `;
            listContainer.appendChild(listItem);

            const spanElement = listItem.querySelector(".to-do");
            spanElement.style.textDecoration = task.completed ? "line-through" : "none";
        });
    };

    // Função para adicionar uma nova tarefa
    const addTask = (description) => {
        tasks.push({ description, completed: false });
        renderTasks();
    };

    // Função para remover uma tarefa
    const removeTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Função para editar uma tarefa
    const editTask = (index) => {
        const newTaskValue = prompt("Digite a nova descrição da tarefa:");
        if (newTaskValue !== null) {
            tasks[index].description = newTaskValue;
            renderTasks();
        }
    };

    // Função para marcar/desmarcar uma tarefa como concluída
    const toggleCompleted = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    // Adicionar evento ao botão de adicionar
    const addButton = document.querySelector(".input-button");
    addButton.addEventListener("click", () => {
        const inputTask = document.querySelector("#input-task");
        const taskValue = inputTask.value.trim();

        if (taskValue !== "") {
            addTask(taskValue);
            inputTask.value = "";
        }
    });

    // Adicionar evento ao botão de buscar ID
    const searchButton = document.querySelector(".search-id");
    searchButton.addEventListener("click", () => {
        const inputId = prompt("Digite o ID da tarefa, a busca deve começar do índice 0 em diante:");
        const taskId = parseInt(inputId);

        if (!isNaN(taskId) && taskId >= 0 && taskId < tasks.length) {
            alert(`Tarefa ${taskId}: ${tasks[taskId].description}`);
        } else {
            alert("ID inválido");
        }
    });

    // Adicionar evento aos ícones de lixeira para remover tarefas
    const listContainer = document.querySelector(".list-container");
    listContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("icon-trash")) {
            const index = event.target.dataset.index;
            removeTask(index);
        }
    });

    // Adicionar evento aos ícones de texto para editar tarefas
    listContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("icon-text")) {
            const index = event.target.nextElementSibling.nextElementSibling.dataset.index;
            editTask(index);
        }
    });

    // Adicionar evento aos checkboxes para marcar ou desmarcar tarefas
    listContainer.addEventListener("change", (event) => {
        if (event.target.classList.contains("list-checkbox")) {
            const index = event.target.dataset.index;
            toggleCompleted(index);
        }
    });

    renderTasks();
});
