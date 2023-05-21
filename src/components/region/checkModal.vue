<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">현재 여행지 리스트</h5>
					</div>
					<div class="modal-body">
						<tr v-if="planList.length == 0">
							<td colspan="7">저장된 리스트가 없습니다.</td>
						</tr>
						<template v-else>
							<tr v-for="(item, index) in planList" :key="item.id">
								<td class="middleTd" style="width:55px;">{{ index + 1 }}</td>
								<td class="middleTd">{{ item.place_name }}</td>
								<td><b-button class="btn btn-danger btn-sm" @click="toRemovePlan(item.id)">삭제</b-button>
								</td>
							</tr>
						</template>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" @click="$emit('close')">여행지 더 추가 하기</button>
						<button type="button" class="btn btn-primary" @click="toLogin">로그인 하기</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import Constant from '@/common/Constant'
export default {
	data() {
		return {
		}
	},
	computed: {
		...mapGetters(["planList"])
	},
	methods: {
		...mapActions([Constant.REMOVE_PLAN, Constant.MOVE_UP, Constant.MOVE_DOWN, Constant.REPRACE_ROUTE]),
		toLogin() {
			console.log("로그인 페이지로")
		},
		toRemovePlan(id) {
			console.log(id);
			this[Constant.REMOVE_PLAN](id)
		},
	},
};
</script>
  
<style>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 900px;
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 5px 0;
}

.modal-default-button {
	float: right;
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

.modal-body,
.modal {
	color: #666 !important;
}

label {
	float: left;
}

#route-cost {
	height: 40px;
}

#content {
	height: 100px;
}
</style>