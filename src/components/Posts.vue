<template>
    <div>
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
</template>

<script>
export default {
    name: 'Posts',
    props: {
    users: Array,
    posts: Array
    },
    data() {
    return {
        selectedUserId: ''
    }
    },
    computed: {
    filteredPosts() {
        if (this.selectedUserId) {
        return this.posts.filter(post => post.userId == this.selectedUserId);
        }
        return this.posts;
    }
    },
    methods: {
    fetchPosts() {
        this.$emit('fetch-posts', this.selectedUserId);
    },
    getUserById(userId) {
        return this.users.find(user => user.id === userId) || {};
    }
    }
}
</script>