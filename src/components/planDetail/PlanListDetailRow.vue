<template>
	<tr>
		<td class="middleTd" style="width:55px;" @click="openModal">{{ index + 1 }}</td>
		<td class="middleTd" @click="openModal">{{ item.place_name }}</td>
		<td class="middleTd" @click="openModal">{{ item.phone }}</td>
		<td class="middleTd" style="width:100px;" @click="openModal">{{ item.category_group_name }}</td>
		<td class="middleTd" style="padding-top: 17px;">
			<a :href="item.place_url" target="_blank" v-if="item.place_url != null">이동하기</a>
		</td>
		<RouteModal v-if="showModal" @close="showModal = false" :item="item"></RouteModal>
	</tr>
</template>

<script>
import RouteModal from '@/components/plan/RouteModal.vue'
import { mapActions } from 'vuex';
import Constant from '@/common/Constant'


export default {
	components: {
		RouteModal,
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