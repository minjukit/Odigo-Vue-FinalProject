<template>
    <div id="mapList">
        <span style="font-size: 25px;">계획 등록</span>
        <div>
            <table class="table table-striped table-hover">
                <tbody style="font-size:15px">
                    <tr>
                        <td style="font-size: 17px;">계획 이름</td>
                    </tr>
                    <tr>
                        <input id="planName" class="form-control search" type="search" v-model="plan.name"
                            style="width:100%;height: 50px;" disabled />
                    </tr>
                    <tr>
                        <td style="font-size: 17px;">계획 설명</td>
                    </tr>
                    <tr>
                        <textarea class="form-control text-area" rows="5" v-model="plan.description" disabled></textarea>
                    </tr>
                    <tr>
                        <button id="plan_save_btn" type="button" class="btn btn-success" @click="detailPlan">상세 계획
                            보기</button>
                    </tr>
                    <tr>
                        <button id="plan_save_btn" type="button" class="btn btn-success" @click="modifyPlan">계획 수정
                            하기</button>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// import empRestAPI from '@/util/http-common.js'
import { mapGetters, mapActions } from 'vuex';
import Constant from '@/common/Constant';
export default {
    name: "PlanDetail",
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(["modifyList", "accessToken", "startDate", "endDate", "plan"]),
    },
    created() {
        console.log("data")
        console.log(this.plan)
    },
    mounted() {

    },
    methods: {
        ...mapActions([Constant.CHECK_REFRESH, Constant.REPLACE_PLANLIST]),
        pickSpot(id) {
            var checkedId = id;
            this.$emit('checkedIdFromChild', checkedId)
        },
        modifyPlan() {
            console.log("modify")
            this[Constant.REPLACE_PLANLIST](this.modifyList)
            this.$router.push("/plan/searchPlan")
        },
        detailPlan() {
            this.$router.push("/planDetail/DatePlan")
        },
    },
};
</script>

<style scoped>
#mapList {
    height: 500px;
    border-radius: 30px;
    border-style: solid;
    border-width: 2px;
    border-color: rgba(0, 0, 0, .3);
    padding: 5px 0px 5px 0px;
    margin-top: 5px;
}

.text-area {
    width: 100%;
    height: 180px;
    resize: none;
}

#plan_save_btn {
    width: 100%;
    border: none;
    height: 45px;
    margin-top: 3px;
}
</style>