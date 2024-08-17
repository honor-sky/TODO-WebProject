

    // content 셋팅// 버튼 텍스트도 수정 으로 변경
    function openAddModal() {
        document.getElementById("myAddModal").style.display = "block";
    }

    function openEditModal(id, content) {
        document.getElementById("myEditModal").style.display = "block";
        document.getElementById('edit-todo').value = content;

        document.getElementById('edit-done-btn').addEventListener('click', function() {
            const newContent = document.getElementById('edit-todo').value;
            editTodo(id, newContent);
        });

    }


    function closeModal() {
        document.getElementsByClassName("modal")[0].style.display = "none";
        document.getElementsByClassName("modal")[1].style.display = "none";
    }


    function loadTodos() { // todosJson
             //const todosJson = TodoWebBridge.loadTasks();
             //const taskListFromApp = JSON.parse(todosJson);

             const taskListFromWeb = getLocalStorage("todoList"); // 웹브라우저 스토리지를 사용해 데이터를 바로 가져와 사용


            const todoListTag = document.getElementById('todo-list');
            todoListTag.innerHTML = '';

            // list 목록에 동적으로 아이템 추가
            taskListFromApp.forEach((todo, index) => {
                const li = document.createElement('li');
                li.className = 'todo-item';
                li.id = `todo-'${todo.id}'`;

                if (todo.isDone) {
                    li.style.backgroundColor = 'lightgray';
                } else {
                    li.style.backgroundColor = 'white';
                }

                li.innerHTML = `<input type="checkbox" id="checkbox-'${todo.id}'" onclick="checkIsDone('${todo.id}')" ${todo.isDone ? 'checked' : ''} />
                                 <span>${todo.content}</span>
                                 <button class="edit-button" onclick="openEditModal('${todo.id}','${todo.content}')">수정</button>
                                 <button class="delete-button" onclick="deleteTodo('${todo.id}')">삭제</button>`
                todoListTag.appendChild(li);
            });


    }

    const Task = (id, content, isDone) => ({
            id: id,
            content: content,
            isDone: isDone
    });


    function addTodo() {

            const newTodo = document.getElementById('new-todo').value;
            if (newTodo) {
                const id = Math.random().toString(36).substr(2, 16);

                /*TodoWebBridge.addTask(id, newTodo, false);
                document.getElementById('new-todo').value = '';
                showToast("항목이 추가되었습니다");
                 */
                closeModal();


                // 브라우저 스토리지에 저장 후 갱신

                const newTask = Task(id, newTodo, false)
                const localTodos = getLocalStorage("todoList")
                localTodos.push(newTask);
                saveLocalStorage("todoList", localTodos)

                loadTodos();

            }
    }

    function deleteTodo(id) {
            //.deleteTask(id);
            //showToast("항목이 삭제되었습니다")

            // 브라우저 스토리지에 저장 후 갱신

            const localTodos = getLocalStorage("todoList")
            const idx = localTodos.findIndex(todo => todo.id === id);
            if (idx !== -1) {
                localTodos.splice(idx, 1);
            }
            saveLocalStorage("todoList", localTodos)

            loadTodos()

    }

    function showToast(toast) {
            TodoWebBridge.showToast(toast);
    }

    function checkIsDone(id) {

        const todoItem = document.getElementById(`todo-'${id}'`);
        const checkbox = document.getElementById(`checkbox-'${id}'`);

        const localTodos = getLocalStorage("todoList")
        const todo = localTodos.find(todo => todo.id === id);

        if (checkbox.checked) { //checkbox.checked
            todoItem.style.backgroundColor = 'lightgray';
            //TodoWebBridge.setIsDone(id.toString(), true)

            todo.isDone = true;
        } else {
            todoItem.style.backgroundColor = 'white';
            //TodoWebBridge.setIsDone(id.toString(), false)

            todo.isDone = false
        }

        // 브라우저 스토리지에 저장 후 갱신

        saveLocalStorage("todoList", localTodos)
        loadTodos()


    }

    function editTodo(id, content) {

        /*TodoWebBridge.editTask(id.toString(), content.toString());
        document.getElementById('new-todo').value = '';
        showToast("항목이 수정되었습니다")

         */
        closeModal();

        // 브라우저 스토리지에 저장 후 갱신

        const localTodos = getLocalStorage("todoList")
        const todo = localTodos.find(todo => todo.id === id);
        if (todo) {
            todo.content = content;
            saveLocalStorage("todoList", localTodos);
        }

        loadTodos()


    }


    function saveLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    function getLocalStorage(key){
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : [];
    }

