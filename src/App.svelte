<script>
  import { each } from "svelte/internal";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  var todo = "";
  var todoList;
  var localTodos;

  if (localStorage.data) {
    todoList = JSON.parse(localStorage.data).todos;
  } else {
    todoList = [];
  }
  const addToLocalStorage = () => {
    localTodos = JSON.stringify({ todos: todoList });
    localStorage.setItem("data", localTodos);
  };

  const addTodo = () => {
    if (todo !== "") {
      var id = Math.random();
      todoList = [...todoList, { id, todo, isDone: false }];
      addToLocalStorage();
      console.log("new todo added \n", todoList);
      todo = "";
    } else {
      toast.push("Empty todo input detected!", {
        theme: {
          "--toastBackground": "#F56565",
          "--toastBarBackground": "#C53030",
        },
      });
    }
  };

  const deleteTodo = (todo) => {
    todoList = todoList.filter((singleTodo) => singleTodo.id !== todo.id);
    addToLocalStorage();
    toast.push("Todo deleted successfully");
  };

  const flipIsDone = (itemId) => {
    let index = todoList.findIndex((item) => item.id === itemId);
    todoList[index].isDone = !todoList[index].isDone;
	addToLocalStorage();
    toast.pop();
    toast.push(todoList[index].isDone ? 'Todo marked as complete' :'Todo marked as incomplete', {
      theme: {
        "--toastBackground": "#48BB78",
        "--toastBarBackground": "#2F855A",
      },
    });
  };

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      addTodo();
    }
  };
</script>

<SvelteToast />
<section class="h-100 section">
  <main class="h-100 d-flex flex-column align-items-center ">
    <h1 class="title">todo List</h1>
    <div class="shop-container mt-3 mb-5">
      <div class="input-group my-2">
        <input
          on:keypress={onKeyPress}
          bind:value={todo}
          type="text"
          class="form-control bg-transparent border-secondary text-light input-outline-secondary"
          placeholder="Add new todo..."
        />
        <div class="input-group-append">
          <button
            on:click={addTodo}
            class="btn text-white btn-outline-secondary">Add</button
          >
        </div>
      </div>
      <ul class="list-group border-secondary">
        {#each todoList as todo}
          <li
            class="list-group-item d-flex justify-content-between align-items-center bg-transparent text-white border-secondary"
          >
            <span
              class="todo-text d-inline-block text-truncate {todo.isDone
                ? 'text-secondary'
                : ''}"
              title={todo.todo}
              >{#if todo.isDone}
                <del>{todo.todo}</del>
              {:else}
                {todo.todo}
              {/if}
            </span>

            <div>
              <span
                class="btn {todo.isDone
                  ? 'btn-secondary'
                  : 'btn-primary'} border border-secondary rounded me-3 "
                on:click={flipIsDone(todo.id)}
              >
                <i class="fa fa-check" /></span
              ><span
                class="btn btn-danger border border-secondary rounded"
                on:click={deleteTodo(todo)}
              >
                <i class="fa fa-trash" /></span
              >
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </main>
</section>
<div class="footer">
  <p>
    Developed By <a class="link" href="https://github.com/geethakash/"
      >AkaiGEN</a
    >
    Using <a class="link" href="https://svelte.dev/">Svelte</a>
  </p>
</div>

<style>
  .section {
    background-color: #2f2c42;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 600px;
    margin: 0 auto;
  }

  .title {
    color: #2097b4;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  .shop-container {
    width: 100%;
	padding-bottom: 100px;
  }
  .todo-text {
    max-width: 400px;
  }
  .footer {
    position: fixed;
    font-family: acme;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 35px;
    background-color: rgb(61, 61, 68);
    color: rgb(173, 168, 168);
    text-align: center;
  }
  .footer p {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    margin: 5px;
    text-align: center;
    font-weight: 50;
  }
  .link {
    color: rgb(144, 143, 224);
  }

  @media only screen and (max-width: 600px) {
    .shop-container {
      width: 100%;
    }
    .todo-text {
      max-width: 60%;
    }
  }
</style>
