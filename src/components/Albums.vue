<template>
    <div>
    <h1>Albums</h1>
    <ul>
        <li v-for="album in albums" :key="album.id" @click="selectAlbum(album.id)">
        {{ album.title }}
        </li>
    </ul>
    </div>
</template>

<script>
export default {
    name: 'Albums',
    props: {
    albums: {
        type: Array,
        required: true
    }
    },
    methods: {
    selectAlbum(albumId) {
        this.$emit('select-album', albumId);
    }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    cursor: pointer;
    margin-bottom: 10px;
    padding: 5px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  li:hover {
    background-color: #e9e9e9;
  }
  </style>
  