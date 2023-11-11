<template>
  <Menubar :model="menuItems">
    <template #end>
      <a class="link" v-if="obtemUsuarioLoggado.id" @click="leaveSession()"><span class="pi pi-lock"></span> logout</a>
      <a class="link" v-else @click="goToLink('/login')"><span class="pi pi-lock-open"></span> login</a>
    </template>
  </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
  name: 'NavbarComponent',
  components: {
    Menubar
  },
  data() {
    return { 
      menuItems: [
        {label: 'Home', url: '/'}, // using 'url' prop will refresh the whole app
        {label: 'Profile', command: () => this.goToLink('/profile')},
        {label: 'Replay', command: () => this.goToLink('/replay')},
        {label: 'About', command: () => this.goToLink('/about')},
        // { separator:true },
      ],
    }
  },
  computed: {
    obtemUsuarioLoggado() {
      return this.$store.state.userModule.user;
    }
  }, 
  methods: {
    leaveSession() {
      localStorage.clear();

      this.$store.commit('SET_USER', {});
      this.$store.commit('SET_TASKS', {});

      this.$router.push('/');
    },
    goToLink(link) {
      this.$router.push(link);
    },
  } 
}
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>
