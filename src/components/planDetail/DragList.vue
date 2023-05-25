<template>
	<div>
		<div class="table-wrapper-scroll-y my-custom-scrollbar">
			<div v-for="group in groups" :key="group">
				<h3>{{ group }} 일차</h3>
				<table class="table table-striped table-hover">
					<draggable :options="{ group: 'ITEMS', handle: '.drag-handle' }" v-model="groupItems[group]"
						@end="saveChanges(group)">
						<drag-list-row v-for="(item) in groupItems[group]" :key="item.id" :item="item"
							class="nomargin draggable-row drag-handle"></drag-list-row>
						<!-- <tr v-for="(item) in groupItems[group]" :key="item.id" class="row nomargin draggable-row drag-handle">
						<td class="col-3">{{ item.place_name }}</td>
						<td class="col-3">{{ item.phone }}</td>
						<td class="col-3">{{ item.category_group_name }}</td>
						<td class="col-3">상세 설정</td>
					</tr> -->
					</draggable>
				</table>
			</div>
		</div>
		<b-button id="plan_save_btn" type="button" class="btn btn-success" @click="goBack">돌아가기</b-button>
	</div>
</template>
  
<script>
import draggable from 'vuedraggable';
import { mapActions, mapGetters } from 'vuex';
import DragListRow from './DragListRow.vue';
import Constant from '@/common/Constant'

export default {
	components: {
		draggable,
		DragListRow,
	},
	computed: {
		...mapGetters(["startDate", "endDate", "modifyList", "plan", "endDate"]),
		// planList: {
		// 	set: function () {
		// 		console.log("상태변화")
		// 		this.$store.state.planList = this.planList
		// 	},
		// 	get: function () {
		// 		return this.$store.state.planList
		// 	}
		// }
	},
	created() {
		let start = this.plan.startDate
		let end = this.plan.endDate

		let diff = Math.abs(end.getTime() - start.getTime());
		diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

		this.days = diff + 1;

		let distribution = parseInt(this.modifyList.length / this.days)
		if (distribution <= 0) {
			distribution = 1
		}
		this.groups = []
		for (let i = 1; i < this.days + 1; i++) {
			this.groups.push(i);
		}
		this.planListForDrag = []
		console.log(distribution)
		for (let i = 0; i < this.modifyList.length; i++) {
			let now = this.modifyList[i]
			let gidx = parseInt(i / distribution)
			if (gidx >= this.groups.length) {
				gidx = this.groups.length - 1;
			}
			if (now.group == null) {
				now.group = this.groups[gidx]
			} else if (now.group >= this.days) {
				now.group = this.days
			}
			this.planListForDrag.push(now)
		}
		// console.log(this.planListForDrag)
		this.modifyList = this.planListForDrag
	},
	methods: {
		...mapActions([Constant.FORCE_PLANLIST]),
		groupItemsByIndex() {
			const groupItems = {};

			this.groups.forEach(group => {
				groupItems[group] = this.modifyList.filter(item => item.group === group);
			});

			return groupItems;
		},
		saveChanges() {
			// 변경된 아이템 배열을 업데이트
			const newItems = [];

			this.groups.forEach(group => {
				this.groupItems[group].forEach((item) => {
					item.group = group; // 그룹 값 업데이트
					newItems.push(item);
				});
			});

			// this.planList = newItems;
			this[Constant.FORCE_PLANLIST](newItems)
			console.log("method")
			console.log(this.modifyList)
		},
		goBack() {
			// this.$router.push(`/planDetail/${this.plan.id}/savePlan`)
			window.history.back();
		}
	},
	// props(),
	data() {
		return {
			planListForDrag: [],
			groups: [1, 2, 3, 4, 5],
			groupItems: {},
			days: 0,
		};
	},
	mounted() {
		this.groupItems = this.groupItemsByIndex();
	},
};
</script>
  
<style scoped>
.draggable-row {
	cursor: move;
}

#plan_save_btn {
	width: 101.18%;
	height: 47px;
	border-radius: 20px;
	margin-left: -2.6px;
}

.my-custom-scrollbar {
	position: relative;
	height: 615px;
	margin-top: 15px;
	overflow: auto;
}

.table-wrapper-scroll-y {
	display: block;
}
</style>
  