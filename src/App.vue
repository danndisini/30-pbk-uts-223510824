<template>
  <div id="app">
    <header>
      <button @click="setActiveView('todos')">Todos</button>
      <button @click="setActiveView('posts')">Post</button>
    </header>

    <div v-if="activeView === 'todos'">
      <Todos
        :activities="activities"
        @add-activity="tambahfi"
        @remove-activity="hapus"
        @toggle-activity="toggle"
      />
    </div>

    <div v-if="activeView === 'posts'">
      <Posts
        :users="users"
        :posts="posts"
        @fetch-posts="fetchPosts"
      />
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'
import Posts from './components/Posts.vue'

export default {
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      activities: [],
      activeView: 'todos',
      users: [],
      posts: []
    }
  },
  methods: {
    tambahfi(activity) {
      this.activities.push(activity);
    },
    hapus(index) {
      this.activities.splice(index, 1);
    },
    toggle(index) {
      this.activities[index].selesai = !this.activities[index].selesai;
    },
    setActiveView(view) {
      this.activeView = view;
      if (view === 'posts' && this.users.length === 0) {
        this.fetchUsers();
      }
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        });
    },
    fetchPosts(userId) {
      let url = 'https://jsonplaceholder.typicode.com/posts';
      if (userId) {
        url += `?userId=${userId}`;
      }
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.posts = data;
        });
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-size: cover;
}

#app {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(183, 246, 221, 0.8);
}

header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

header button {
  margin: 0 10px;
}

h1 {
  text-align: center;
}

form {
  margin-bottom: 20px;
}

input[type="text"],
input[type="date"],
button {
  margin-right: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.selesai {
  text-decoration: line-through;
}

select {
  margin: 10px 0;
  padding: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

li h3 {
  margin: 0;
}

li p {
  margin: 5px 0;
}


</style>
