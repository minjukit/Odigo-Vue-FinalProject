<template>
	<div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
		<div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded ml-auto mr-auto" style="width:400px; text-align:center" id="userPage">
		
			<!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->
			<img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
			<p id="profile-name" class="profile-name-card"></p>
			<form class="form-signin">
				<span id="reauth-email" class="reauth-email"></span>


					<p class="inputarea">아이디</p>
				<input type="id" id="inputEmail" class="form-control" style="margin-bottom: 3%;"
					v-model.lazy:value="id" required autofocus>
					<p class="inputarea">비밀번호</p>
				<input type="password" id="inputPassword" class="form-control" v-model.lazy:value="password"
					required>
				<div id="remember" class="checkbox">
					<!-- <label>
						<input type="checkbox" value="remember-me"> Remember me
					</label> -->
				</div>
				<b-button class = "btnmodify" variant="success" @click.prevent.stop="login">로그인</b-button>
				<!-- <button class="btn btn-lg btn-primary btn-block btn-signin" @click.prevent.stop="login">로그인 하기</button> -->
			</form><!-- /form -->
			<!-- <a href="#" class="forgot-password">
				Forgot the password?
			</a> -->
			
		</div>
		<div class="heightmo">
			</div>
	</div><!-- /container -->
</template>

<script>
import empRestAPI from "@/util/http-common.js";
import Constant from '@/common/Constant';
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			id: "",
			password: ""
		}
	},
	methods: {
		...mapActions([Constant.SET_TOKENS])
		,
		login() {
			const data = {
				userId: this.id,
				userPw: this.password,
			}
			console.log(data)
			empRestAPI.post('/user/login', data)
				.then((response) => {
					this.setTokens(response.data)
					if (this.$route.query.redirect == null) {
						this.$router.push("/")
					} else {
						this.$router.push(this.$route.query.redirect)
					}
				})
				.catch(() => console.log("catch exception"))
		}
	}

}
</script>

<style scoped>
.heightmo{
	height: 130px;
}
.cardCom{
	width: 380px;
	background: rgba(255, 255, 255, 0.425);
}

.btnmodify{
	margin-top: 50px;
	width: 150px;
	height: 30px;
}


.inputarea{
margin-top: 10px;
 text-align: left;
}
#userPage{
	margin-top: 50px;
	
}

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
	background-color: #F7F7F7;
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

.form-signin #inputEmail,
.form-signin #inputPassword {
	direction: ltr;
	height: 44px;
	font-size: 16px;
}

.form-signin input[type=email],
.form-signin input[type=password],
.form-signin input[type=text],
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
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(104, 145, 162);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
	/*background-color: #4d90fe; */
	background-color: rgb(104, 145, 162);
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
	color: rgb(104, 145, 162);
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus {
	color: rgb(12, 97, 33);
}
</style>