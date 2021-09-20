<script>
  import { fade } from "svelte/transition";
  //   export let name;
  const title = "Todolist";
  const msg = "liste effacée";
  let hasChanged = false;
  let todo = "";
  let textStatus = "empty";
  let todoList = [];
  function addTodo(e) {
    // hasChanged = false;
    console.log(e.key);
    if (todo.length && e.key === "Enter") {
      textStatus = "valid";
      todoList = [...todoList, todo];
      todo = "";
    }
  }
  function deleteTask(id) {
    // console.log(id);
    const removedItem = todoList.filter((itm) => itm !== id);
    console.log(removedItem);
    todoList = removedItem;
    if (todoList.length === 0) {
      hasChanged = true;
      console.log(msg);
      setTimeout(() => {
        hasChanged = false;
      }, 3000);
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <div class="title">
    <h1>{title}</h1>
  </div>
  <input on:keydown={addTodo} type="text" bind:value={todo} />
  <div class="list">
    {#each todoList as thisTodo, i}
      <!-- <p>{todoList[0]}</p> -->
      <div class="todo {i % 2 === 0 ? 'primary' : 'secondary'}">
        <span>
          {thisTodo}
        </span>
        <span role="button" class="semibold" on:click={deleteTask(thisTodo)}
          >&times;</span
        >
      </div>
    {/each}
    {#if todoList.length}
      <div
        transition:fade={{ duration: "300" }}
        class="todo info"
        role="button"
        on:click={() => (todoList = [])}
      >
        effacer liste
      </div>
    {/if}
  </div>
  {#if hasChanged && !todoList.length}
    <div
      transition:fade={{ duration: "300" }}
      class="
	"
    >
      {msg}
    </div>
    <!-- {:else}
    <div /> -->
  {/if}
  <!-- <p>{todoAdd}</p> -->
  <!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
</main>

<style>
  main {
    text-align: center;
    padding: 0.5em;
    /* max-width: 240px; */
    margin: 0 auto;
    /* box-sizing: content-box; */
  }
  div.title {
    margin: 3em auto;

    max-width: 16em;
  }

  h1 {
    background: -webkit-linear-gradient(
      135deg,
      violet,
      indigo,
      blue,
      green,
      gold,
      orange,
      red
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    font-size: 3.5em;
    font-weight: 300;
  }
  @keyframes fade {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    90% {
      opacity: 1;
    }
  }
  .semibold {
    font-weight: 600;
  }
  input,
  .list {
    width: 100%;
    margin-bottom: 1em;
  }
  .list {
    margin: 0 auto;
  }
  .todo {
    display: flex;
    justify-content: space-between;

    font-size: 1.25em;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 8px;
    color: #444;
  }
  .primary {
    background: rgba(127, 0, 127, 0.3);
  }
  .secondary {
    background: rgba(127, 127, 0, 0.3);
  }
  .info {
    background: rgba(0, 127, 255, 0.3);
    padding: 0.75em;
    box-shadow: 8px 8px 1em rgba(0, 0, 0, 0.5);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
    input,
    .list {
      width: 50%;
    }
  }
</style>
