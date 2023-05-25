<template>
	<tr class="row" style="margin:0px;">
		<td class="col-7" @click="openModal">{{ item.place_name }}</td>
		<!-- <td class="col-3" @click="openModal">{{ item.phone }}</td> -->
		<td class="col-2" @click="openModal">{{ item.category_group_name }}</td>
		<td class="col-3" @click="openModal"><a href="#" onclick="return false;">상세 보기</a></td>
		<RouteModal v-if="showModal" @close="showModal = false" :item="item"></RouteModal>
	</tr>
</template>

<script>
import RouteModal from '@/components/planDetail/RouteModal.vue'
import { mapActions, mapState } from 'vuex';
import Constant from '@/common/Constant'
export default {
	components: {
		RouteModal,
	},
	computed: {
		...mapState(["planList"]),
	},
	props: ["item", "index"],
	created() {
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
			console.log(id)
			this.moveDownAction(id)
			this.$emit("changeIndex");
		},
		moveUp(id) {
			console.log(id)
			this.moveUpAction(id)
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

<style></style>