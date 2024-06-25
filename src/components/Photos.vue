<template>
    <div>
    <h1>Photos in Album {{ albumId }}</h1>
    <ul>
        <li v-for="photo in photos" :key="photo.id">
        <img :src="photo.thumbnailUrl" @click="viewPhoto(photo.url)" />
        </li>
    </ul>
    <div v-if="selectedPhotoUrl" class="modal" @click="closeModal">
        <img :src="selectedPhotoUrl" class="modal-content"/>
    </div>
    <button @click="$emit('back-to-albums')">Back to Albums</button>
    </div>
</template>

<script>
export default {
    name: 'Photos',
    props: {
    albumId: Number
    },
    data() {
    return {
        photos: [],
        selectedPhotoUrl: null
    };
    },
    watch: {
    albumId: 'fetchPhotos'
    },
    created() {
    this.fetchPhotos();
    },
    methods: {
    fetchPhotos() {
        if (this.albumId) {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${this.albumId}`)
            .then(response => response.json())
            .then(data => {
              console.log('Fetched photos:', data); // Add this line
            this.photos = data;
            })
            .catch(error => {
            console.error('Error fetching photos:', error);
            });
        }
      },
      viewPhoto(url) {
        console.log('Viewing photo:', url); // Add this line
        this.selectedPhotoUrl = url;
      },
      closeModal() {
        this.selectedPhotoUrl = null;
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
    display: inline-block;
    margin: 10px;
  }
  
  img {
    width: 150px;
    height: 150px;
    cursor: pointer;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    max-width: 90%;
    max-height: 90%;
  }
  </style>
  