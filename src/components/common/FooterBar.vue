<template>
  <div>
    <b-navbar variant="light" type="image.png" class="navContainer">
      <b-navbar-brand
        ><router-link to="/">
          <img id="imgLogo" src="@/assets/logo2.png" class="d-inline-block align-top" alt="ODIGO" />
          
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse"  is-nav>
        <b-navbar-nav class="ml-auto">
        
          <b-nav-item><router-link to="/board">SSAFY &nbsp; SEOUL11 TEAM3</router-link></b-nav-item>
          <b-nav-item>2023-05</b-nav-item>
            <b-nav-item class="mr-5"></b-nav-item>
              <b-nav-item class="mr-5"></b-nav-item>
        </b-navbar-nav>
      
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Constant from "@/common/Constant";

export default {
  name: "FooterBar",
  created() {},
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions([Constant.GET_CERT, Constant.LOGOUT]),

    doLogout() {
      this[Constant.LOGOUT]();
      this.$router.push("/index");
    },
  },
};
</script>

<style scope>

.navb{
  margin-right: 190px;
}

.navContainer{
  background-color: #f2f2f2; /* 회색 연한 배경색 */
  box-shadow: 0 4px 1px rgba(12, 109, 85, 0.185); /* 그림자 설정 */
}

img {
  width: 80px;
}

.header {
  padding: 30px;
  text-align: center;
  box-shadow: 0px 2px 10px rgba(185, 185, 185, 0.3);
}

b-nav-item {
  font-weight: bold;
  color: #abcef1;
  text-decoration: none;
}

.userbar {
  margin-right: 30px;
}


.nav-item a:hover {
  color: rgb(7, 179, 84);
  text-decoration: none;
}
.nav-item a:focus {
  color: rgb(7, 179, 84);
}

#imgLogo {
  margin-left: 190px;
  scale: 130%;
}

</style>
