<template>
  <div id="app">
    <header-nav-bar></header-nav-bar>
    <transition :name="transitionName">
    <router-view/>
    </transition>
  </div>
</template>


<script>
import HeaderNavBar from "./components/common/HeaderNavBar.vue";


export default {
  name: "App",
  components: {
    HeaderNavBar
  },
  watch: {
    $route(to, from) {
      if(to.meta.page == null || from.meta.page == null){
        this.transitionName = "fade";
      }else{
        this.transitionName = to.meta.page > from.meta.page ? "next" : "prev";
      }
      console.log(this.transitionName);
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* 전환효과 (Fade) */
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>
