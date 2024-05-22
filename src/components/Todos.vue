<template>
    <div>
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
.selesai {
    text-decoration: line-through;
}

button {
    margin-bottom: 10px;
}

button + button {
    margin-left: 10px;
}

thead th {
    padding: 10px; 
}
</style>