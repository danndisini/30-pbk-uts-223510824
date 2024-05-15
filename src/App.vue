<template>
  <div id="app">
    <header>
      <button @click="setActiveView('todos')">Todos</button>
      <button @click="setActiveView('posts')">Post</button>
    </header>

    <div v-if="activeView === 'todos'">
      <h1>Daftar Kegiatan</h1>
      <form @submit.prevent="tambahfi">
        <input type="text" v-model="kegiatanbaru.name" placeholder="Tambah Kegiatan Baru">
        <input type="date" v-model="kegiatanbaru.date">
        <button type="submit">Tambah</button>
      </form>
      <div>
        <button @click="filterr('semua')">Semua</button>
        <button @click="filterr('belum')">Belum Selesai</button>
        <button @click="filterr('selesai')">Selesai</button>
      </div>
      <br>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kegiatan</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kegiatan, index) in terfilter" :key="index">
            <td>{{ index + 1 }}</td>
            <td :class="{ selesai: kegiatan.selesai }">{{ kegiatan.name }}</td>
            <td>
              <input type="checkbox" @change="toggle(index)" :checked="kegiatan.selesai">
            </td>
            <td>{{ kegiatan.date }}</td>
            <td>
              <button @click="hapus(index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="activeView === 'posts'">
      <h1>Post</h1>
      <div>
        <label for="user-select">Pilih User:</label>
        <select id="user-select" v-model="selectedUserId" @change="fetchPosts">
          <option value="">Semua</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <ul>
        <li v-for="post in filteredPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <p><strong>User:</strong> {{ getUserById(post.userId).name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [],
      kegiatanbaru: {
        name: '',
        date: ''
      },
      filter: 'semua',
      activeView: 'todos',
      users: [],
      posts: [],
      selectedUserId: ''
    }
  },
  methods: {
    tambahfi() {
      if (this.kegiatanbaru.name.trim() !== '' && this.kegiatanbaru.date !== '') {
        this.activities.push({ 
          name: this.kegiatanbaru.name,
          date: this.kegiatanbaru.date,
          selesai: false 
        });
        this.kegiatanbaru.name = '';
        this.kegiatanbaru.date = '';
      }
    },
    hapus(index) {
      this.activities.splice(index, 1);
    },
    toggle(index) {
      this.activities[index].selesai = !this.activities[index].selesai;
    },
    filterr(filterType) {
      this.filter = filterType;
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
    fetchPosts() {
      let url = 'https://jsonplaceholder.typicode.com/posts';
      if (this.selectedUserId) {
        url += `?userId=${this.selectedUserId}`;
      }
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.posts = data;
        });
    },
    getUserById(userId) {
      return this.users.find(user => user.id === userId) || {};
    }
  },
  computed: {
    terfilter() {
      if (this.filter === 'semua') {
        return this.activities;
      } else if (this.filter === 'belum') {
        return this.activities.filter(kegiatan => !kegiatan.selesai);
      } else if (this.filter === 'selesai') {
        return this.activities.filter(kegiatan => kegiatan.selesai);
      }
    },
    filteredPosts() {
      return this.posts;
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
