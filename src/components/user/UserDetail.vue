<template>
  <b-container class="bv-example-row">
    <b-card class="cardCon">
      <!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->
      <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
      <p id="profile-name" class="profile-name-card"></p>
      <form>
        <p class="inputarea">ID</p>
        <input type="input" id="input" class="form-control" placeholder="id를 입력해주세요" :value="user.loginId" disabled />

        <p class="inputarea">이름</p>
        <input type="input" id="input" class="form-control" placeholder="이름을 입력해주세요" :value="user.name" disabled />

        <p class="inputarea">Email</p>
        <input type="input" id="input" class="form-control" placeholder="email을 입력해주세요" :value="user.mail" disabled />

        <p class="inputarea">전화번호</p>
        <input type="input" id="input" class="form-control" placeholder="전화번호를 입력해주세요" :value="user.phoneNumber"
          disabled />
        <p class="inputarea">닉네임</p>
        <input type="input" id="input" class="form-control" placeholder="닉네임을 입력해주세요" :value="user.nickName" disabled />
        <b-row>
          <b-col cols="6">
            <b-button class="btndetail" variant="success" @click.prevent.stop="toModify">수정하기</b-button>
          </b-col>
          <b-col cols="6">
            <b-button class="btndetail" variant="success" @click.prevent.stop="toDelete">삭제하기</b-button>
          </b-col>
        </b-row>
      </form>
      <!-- /form -->
    </b-card>
  </b-container>
  <!-- /container -->
</template>

<script>
import http from "@/util/http-common.js";
export default {
  data() {
    return {
      id: "",
      password: "",
      mail: "",
      name: "",
      phoneNumber: "",
      nickName: "",
      user: null,
    };
  },
  created() {
    console.log("create");
    http
      .get("/user/detail")
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
      })
      .catch();
  },
  methods: {
    toDelete() {
      console.log(this.user.id)
      http.delete(`/user/${this.user.id}`)
        .then(() => {
          alert("회원 탈퇴에 성공 했습니다.")
          this.$router.push("/")
        }).catch(() => {
          alert("회원 탈퇴에 실패 했습니다.")
        })
    },
    toModify() {
      this.$router.push("/userModify");
    },
  },
};
</script>

<style scoped>
.card-container.card {
  max-width: 350px;
  padding: 40px 40px;
}

.btn {
  font-weight: 700;
  height: 36px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

/*
 * Card component
 */
.card {
  background-color: #f7f7f7;
  /* just in case there no content*/
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  /* shadows and rounded borders */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

/*
 * Form styles
 */
.profile-name-card {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 0;
  min-height: 1em;
}

.reauth-email {
  display: block;
  color: #404040;
  line-height: 2;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin #input {
  direction: ltr;
  height: 44px;
  font-size: 16px;
}

.form-signin input[type="email"],
input[type="input"],
.form-signin input[type="text"],
.form-signin button {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  z-index: 1;
  position: relative;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin .form-control:focus {
  border-color: rgb(104, 145, 162);
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(104, 145, 162);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
  /*background-color: #4d90fe; */
  background-color: rgb(125, 194, 165);
  /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
  padding: 0px;
  font-weight: 700;
  font-size: 14px;
  height: 36px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  border: none;
  -o-transition: all 0.218s;
  -moz-transition: all 0.218s;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
  background-color: rgb(12, 97, 33);
}

.forgot-password {
  color: rgb(104, 162, 135);
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus {
  color: rgb(12, 97, 33);
}

.cardCon {
  width: 380px;
  background: rgba(255, 255, 255, 0.425);
}

.btndetail {
  margin-top: 30px;
  width: 130px;
}

.inputarea {
  margin-top: 13px;
  text-align: left;
}
</style>
