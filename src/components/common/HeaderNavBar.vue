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
          <b-nav-item
            ><router-link to="/region/regionSearch">지역별 여행지</router-link></b-nav-item>
          <b-nav-item><router-link to="/hotplace">핫플레이스</router-link></b-nav-item>
          <b-nav-item><router-link to="/plan/searchPlan">여행계획</router-link></b-nav-item>
          <b-nav-item><router-link to="/board">정보공유</router-link></b-nav-item>

          <template v-if="!isLogin">
            <b-nav-item><router-link to="/login">로그인</router-link></b-nav-item>
            <b-nav-item><router-link to="/regForm">회원가입</router-link></b-nav-item>
          </template>
          <b-nav-item-dropdown right v-else>
            <template #button-content>
              마이페이지
            </template>

            <b-dropdown-item
              ><router-link to="/userDetail">내 정보</router-link></b-dropdown-item
            >
            
            <b-dropdown-item><router-link to="/userPlans">나의 여행계획</router-link></b-dropdown-item>

            <b-dropdown-item @click="doLogout">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="navb">
        </b-navbar-nav>
      
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Constant from "@/common/Constant";

export default {
  name: "HeaderNavBar",
  created() {},
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions([Constant.GET_CERT, Constant.LOGOUT, Constant.INITIATE_PLANS]),

    doLogout() {

      this[Constant.LOGOUT]()
      this[Constant.INITIATE_PLANS]()
      this.$router.push('/index')

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
  width:80px;
  margin-left: 190px;
  scale: 130%;
}

</style>
