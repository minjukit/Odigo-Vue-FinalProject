<template>
	<div class="container">
			<b-card   class="cardCon">
		
			<!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->
			<img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
			<p id="profile-name" class="profile-name-card"></p>
			<form>
				
				<p class="inputarea">아이디</p>
				<input type="input" id="input" class="form-control" placeholder="" v-model.lazy:value="id"
					required autofocus>
					<p class="inputarea">비밀번호</p>
				<input type="input" id="input" class="form-control" placeholder="" v-model.lazy:value="password"
					required>
					<p class="inputarea">이름</p>
				<input type="input" id="input" class="form-control" placeholder=""  v-model.lazy:value="name"
					required>
					<p class="inputarea">Email</p>
				<input type="input" id="input" class="form-control" placeholder=""  v-model.lazy:value="mail"
					required>
					<p class="inputarea">전화번호</p>
				<input type="input" id="input" class="form-control" placeholder="" 
					v-model.lazy:value="phoneNumber" required>
					<p class="inputarea">닉네임</p>
				<input type="input" id="input" class="form-control" placeholder=""  v-model.lazy:value="nickName"
					required>
					<b-button class = "btnmodi" variant="success" @click.prevent.stop="registerBtn">가입하기</b-button>
				<!-- <button class="btn btn-lg btn-primary btn-block" @click.prevent.stop="registerBtn">가입하기</button> -->
			</form><!-- /form -->
		<!-- /card-container -->
		</b-card>
	</div><!-- /container -->
</template>

<script>
import empRestAPI from "@/util/http-common.js";
export default {
	data() {
		return {
			id: "",
			password: "",
			mail: "",
			name: "",
			phoneNumber: "",
			nickName: "",
		}
	}
	, methods: {
		registerBtn() {
			const data = {
				loginId: this.id,
				mail: this.mail,
				name: this.name,
				password: this.password,
				phoneNumber: this.phoneNumber,
				nickName: this.nickName,
			}
			empRestAPI.post('/user', data)
				.then(() => {console.log("success")
				this.$router.push("/");})
				.catch(() => console.log("catch exception"))
		}
	}

}
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

.form-signin #input {
	direction: ltr;
	height: 44px;
	font-size: 16px;
}

.form-signin input[type=email],
input[type=input],
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


.cardCon{
	width: 380px;
	background: rgba(255, 255, 255, 0.425);
}

.btnmodi{
	margin-top: 20px;
	width: 150px;
}


.inputarea{
margin-top: 10px;
 text-align: left;
}


</style>