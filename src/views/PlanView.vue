<template>
	<div id="Plan">
		<router-view></router-view>
	</div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import Constant from '@/common/Constant'

export default {
	name: 'BoardView',
	components: {
	},
	computed: {
		...mapGetters(["planList", "onModify", "preModify"])
	},
	created() {
		console.log(this.preModify)
		if (this.preModify) {
			this[Constant.FALSE_PREMODIFY]();
			return;
		}

		if (this.planList.length > 0) {
			if (!confirm("이전에 작성하던 계획에 이어서 작성 하시겠습니까?")) {
				this[Constant.INITIATE_PLANS]()
			}
		}
	},
	methods: {
		...mapActions([Constant.INITIATE_PLANS, Constant.FALSE_PREMODIFY])
	}
}
</script>

<style></style>