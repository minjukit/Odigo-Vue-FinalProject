<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">여행 정보 저장</h5>
						<div>{{ nowItem.place_name }}</div>
					</div>
					<div class="modal-body">
						<form>
							<div class="mb-3">
								<label for="route-cost" class="col-form-label">비용</label>
								<input type="number" class="form-control" id="route-cost" v-model="nowItem.cost"
									placeholder="여행 경비를 입력하세요">
							</div>
							<div class="mb-3">
								<label for="content" class="col-form-label">상세내용</label>
								<textarea class="form-control" id="content" placeholder="여행 상세 정보를 입력하세요"
									v-model="nowItem.content"></textarea>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" @click="$emit('close')">닫기</button>
						<button type="button" class="btn btn-primary" @click="saveDetail">저장 하기</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
  
<script>
import { mapActions } from 'vuex';
import Constant from '@/common/Constant'
export default {
	props: ["item"],
	data() {
		return {
			nowItem: { ...this.item },
		}
	},
	methods: {
		...mapActions([Constant.REMOVE_PLAN, Constant.MOVE_UP, Constant.MOVE_DOWN, Constant.REPRACE_ROUTE]),
		saveDetail() {

			console.log(this.nowItem.content)
			console.log(this.nowItem.cost)
			this.replaceRoute(this.nowItem)
		}
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