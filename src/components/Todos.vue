<template>
  <div>
    <h1>Daftar Kegiatan</h1>
    <form @submit.prevent="tambahfi">
      <input type="text" v-model="kegiatanbaru.name" placeholder="Tambah Kegiatan Baru" />
      <input type="date" v-model="kegiatanbaru.date" />
      <button type="submit">Tambah</button>
    </form>
    <div class="filter-buttons">
      <button @click="filterr('semua')">Semua</button>
      <button @click="filterr('belum')">Belum Selesai</button>
      <button @click="filterr('selesai')">Selesai</button>
    </div>
    <br />
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
            <input type="checkbox" @change="toggle(index)" :checked="kegiatan.selesai" />
          </td>
          <td>{{ kegiatan.date }}</td>
          <td>
            <button @click="hapus(index)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Todos',
  props: {
    activities: Array
  },
  data() {
    return {
      kegiatanbaru: {
        name: '',
        date: ''
      },
      filter: 'semua'
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
    }
  },
  methods: {
    tambahfi() {
      if (this.kegiatanbaru.name.trim() !== '' && this.kegiatanbaru.date !== '') {
        this.$emit('add-activity', {
          name: this.kegiatanbaru.name,
          date: this.kegiatanbaru.date,
          selesai: false
        });
        this.kegiatanbaru.name = '';
        this.kegiatanbaru.date = '';
      }
    },
    hapus(index) {
      this.$emit('remove-activity', index);
    },
    toggle(index) {
      this.$emit('toggle-activity', index);
    },
    filterr(filterType) {
      this.filter = filterType;
    }
  }
}
</script>
  
  <style scoped>
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    justify-content: center;
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
  
  .filter-buttons {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .filter-buttons button {
    margin-right: 10px;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  .filter-buttons button:hover {
    background-color: #0056b3;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  thead th {
    background-color: #f8f8f8;
    padding: 10px;
    text-align: left;
    border-bottom: 2px solid #ddd;
  }
  
  tbody td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .selesai {
    text-decoration: line-through;
    color: #999;
  }
  
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c82333;
  }
  </style>
  