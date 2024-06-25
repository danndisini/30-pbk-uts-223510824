<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          
          
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item clickable @click="setActiveView('todos')">
          <q-item-section>
            Todos
          </q-item-section>
        </q-item>
        <q-item clickable @click="setActiveView('posts')">
          <q-item-section>
            Posts
          </q-item-section>
        </q-item>
        <q-item clickable @click="setActiveView('albums')">
          <q-item-section>
            Albums
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
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
        <div v-if="activeView === 'albums'">
          <Albums
            :albums="albums"
            @select-album="showPhotos"
          />
        </div>
        <div v-if="activeView === 'photos'">
          <Photos
            :albumId="selectedAlbumId"
            @back-to-albums="backToAlbums"
          />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';
import Albums from './components/Albums.vue';
import Photos from './components/Photos.vue';

export default {
  components: {
    Todos,
    Posts,
    Albums,
    Photos
  },
  setup() {
    const leftDrawerOpen = ref(false);

    const activities = ref([]);
    const activeView = ref('todos');
    const users = ref([]);
    const posts = ref([]);
    const albums = ref([]);
    const selectedAlbumId = ref(null);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const tambahfi = (activity) => {
      activities.value.push(activity);
    };

    const hapus = (index) => {
      activities.value.splice(index, 1);
    };

    const toggle = (index) => {
      activities.value[index].selesai = !activities.value[index].selesai;
    };

    const setActiveView = (view) => {
      activeView.value = view;
      if (view === 'posts' && users.value.length === 0) {
        fetchUsers();
      } else if (view === 'albums' && albums.value.length === 0) {
        fetchAlbums();
      }
    };

    const fetchUsers = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          users.value = data;
        });
    };

    const fetchPosts = (userId) => {
      let url = 'https://jsonplaceholder.typicode.com/posts';
      if (userId) {
        url += `?userId=${userId}`;
      }
      fetch(url)
        .then(response => response.json())
        .then(data => {
          posts.value = data;
        });
    };

    const fetchAlbums = () => {
      fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(data => {
          albums.value = data;
        });
    };

    const showPhotos = (albumId) => {
      selectedAlbumId.value = albumId;
      activeView.value = 'photos';
    };

    const backToAlbums = () => {
      activeView.value = 'albums';
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      activities,
      activeView,
      users,
      posts,
      albums,
      selectedAlbumId,
      tambahfi,
      hapus,
      toggle,
      setActiveView,
      fetchUsers,
      fetchPosts,
      fetchAlbums,
      showPhotos,
      backToAlbums
    };
  }
};
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.9);
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
  color: #333;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

input[type="text"],
input[type="date"],
button {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f8f8f8;
}

.selesai {
  text-decoration: line-through;
  color: #999;
}

select {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  font-size: 1.2em;
  color: #333;
}

li p {
  margin: 5px 0;
  color: #555;
}
</style>
