<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand><router-link to="/">
          <img id="imgLogo" src="https://placekitten.com/g/20/20" class="d-inline-block align-top" alt="Kitten">
          EnjoyTrip
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link to="/region/regionSearch">지역별 여행지</router-link></b-nav-item>
          <b-nav-item><router-link to="/hotplace">핫플레이스</router-link></b-nav-item>
          <b-nav-item><router-link to="/plan/searchPlan">여행계획</router-link></b-nav-item>
          <b-nav-item><router-link to="/board">공지사항</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <template v-if="!isLogin">
            <b-nav-item><router-link to="/login">login</router-link></b-nav-item>
            <b-nav-item><router-link to="/regForm">회원가입</router-link></b-nav-item>
          </template>
          <b-nav-item-dropdown right v-else>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item>마이페이지</b-dropdown-item>
            <b-dropdown-item>나의 계획</b-dropdown-item>
            <b-dropdown-item @click="doLogout">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Constant from '@/common/Constant'

export default {
  name: "HeaderNavBar",
  created() {
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions([Constant.GET_CERT, Constant.LOGOUT]),

    doLogout() {
      this[Constant.LOGOUT]()
    },
  },
};
</script>

<style scope>
img {
  width: 150px;
}

.header {
  padding: 50px;
  text-align: center;
  box-shadow: 0px 1px 10px rgba(159, 157, 157, 0.3);
}

b-nav-item {
  font-weight: bold;
  color: #abcef1;
  text-decoration: none;
}


.nav-item a:hover {
  color: rgb(0, 132, 209);
  text-decoration: none;
}

.nav-item a:focus {
  color: rgb(0, 91, 209);
}

.nav-item a:link {
  color: rgb(90, 90, 90);
}

#imgLogo {
  width: 30px;
}

.navbar-brand a:link {
  text-decoration: none;
  color: rgb(90, 90, 90);
}

/* a:hover {
  text-decoration: none;
  font-weight: bold;
}

a.router-link-exact-active {
  color: #3aa4ca;
} */
</style>
