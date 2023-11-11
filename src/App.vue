<template>
  <div>
    <p>Replay de MERCADO</p>
    <NavbarComponent />
    <Divider />
    <router-view />
    <Divider />
    <p>Version: {{$store.state.appInfo.version}}<span v-show="$store.getters.logged"></span></p>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import Divider from 'primevue/divider';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    Divider
  },
  data() {
    return {

    }
  },
  beforeCreate() {
		this.$store.commit('INITIALISE_STORE');
	}
}
</script>

<style>
body {
  text-align: center;
  align-items: center;
}
</style>