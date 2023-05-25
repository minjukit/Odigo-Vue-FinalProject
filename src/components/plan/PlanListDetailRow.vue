<template>
	<tr>
		<td class="middleTd" style="width:55px;" @click="openModal">{{ index + 1 }}</td>
		<td class="middleTd" @click="openModal">{{ item.place_name }}</td>
		<td class="middleTd" @click="openModal">{{ item.phone }}</td>
		<td class="middleTd" style="padding-top: 17px;">
			<a :href="item.place_url" target="_blank" v-if="item.place_url != null">이동하기</a>
		</td>
		<td>
			<b-icon icon="bookmark-x-fill" scale="2" variant="danger" @click="toRemovePlan(item.id)"></b-icon>
			<!-- <b-button class="btn btn-danger btn-sm" @click="toRemovePlan(item.id)">삭제
			</b-button> -->
		</td>
		<RouteModal v-if="showModal" @close="showModal = false" :item="item"></RouteModal>
	</tr>
</template>

<script>
import RouteModal from '@/components/plan/RouteModal.vue'
import { mapActions, mapGetters } from 'vuex';
import Constant from '@/common/Constant'


export default {
	components: {
		RouteModal,
	},
	props: ["item", "index"],
	created() {
	},
	computed: {
		...mapGetters(["planList"])
	},
	methods: {
		openModal() {
			this.showModal = true
		},
		...mapActions([Constant.REMOVE_PLAN, Constant.MOVE_UP, Constant.MOVE_DOWN]),
		pickSpot(id) {
			console.log(id)
		},

		toRemovePlan(id) {
			console.log(id);
			this[Constant.REMOVE_PLAN](id)
			this.$emit("changeIndex");
		},
		moveDown(id) {
			this.moveDownAction(id)
			console.log(this.planList)
			this.$emit("changeIndex");
		},
		moveUp(id) {
			this.moveUpAction(id)
			console.log(this.planList)
			this.$emit("changeIndex");
		},
	},
	data() {
		return {
			showModal: false,
			nowItem: {},
		}
	},

}
</script>

<style>
.b-icon {
	scale: 100%;
	width: 30%;
	margin: 2px;
	padding: 1px;
}

.icon {
	scale: 180%;
}
</style>