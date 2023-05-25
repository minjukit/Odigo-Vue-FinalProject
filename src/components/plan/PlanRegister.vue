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
                        <input id="planName" class="form-control search" type="search" placeholder="계획 이름을 입력하세요"
                            style="width:100%;height: 50px;" v-model.lazy:value="planName" />
                    </tr>
                    <tr >
                        <td style="font-size: 17px;">계획 설명</td>
                    </tr>
                    <tr>
                        <textarea class="form-control text-area" rows="5" placeholder="상세 설명을 추가해 주세요"
                            v-model.lazy="planDetail"></textarea>
                    </tr>
                    <tr style="background: white;">
                        <template v-if="!onModify">
                            <button id="plan_save_btn" type="button" class="btn btn-success" @click="savePlan">계획
                                저장하기</button>
                        </template>
                        <template v-else>
                            <button id="plan_save_btn" type="button" class="btn btn-success" @click="modifyPlan">계획
                                수정하기</button>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import empRestAPI from '@/util/http-common.js'
import { mapGetters, mapActions } from 'vuex';
import Constant from '@/common/Constant';
export default {
    name: "PlanDetail",
    data() {
        return {
            planName: "",
            planDetail: ""
        }
    },
    computed: {
        ...mapGetters(["planList", "accessToken", "startDate", "endDate", "onModify", "plan"]),
    },
    created() {
        if (this.onModify == true) {
            this.planDetail = this.plan.description
            this.planName = this.plan.name
        }
    },
    mounted() {

    },
    methods: {
        ...mapActions([Constant.CHECK_REFRESH, Constant.INITIATE_PLANS]),
        pickSpot(id) {
            var checkedId = id;
            this.$emit('checkedIdFromChild', checkedId)
        },

        savePlan() {
            const data = {
                name: this.planName,
                description: this.planDetail,
                login_id: "test",
                routes: this.planList,
                start_date: new Date(this.startDate),
                end_date: new Date(this.endDate),
            }
            console.log(data)
            empRestAPI.post('/plan', data, {
            })
                .then(() => {
                    console.log("success")
                    this[Constant.INITIATE_PLANS]()
                    alert("저장되었습니다.")
                    this.$router.push("/")
                })
                .catch(() => {
                    console.log("저장에 실패 하였습니다.")
                })
        },

        modifyPlan() {
            const data = {
                name: this.planName,
                description: this.planDetail,
                login_id: "test",
                routes: this.planList,
                start_date: new Date(this.startDate),
                end_date: new Date(this.endDate),
                id_for_delete: this.plan.id
            }
            console.log(data)
            empRestAPI.post('/plan/modify', data, {
            })
                .then(() => {
                    console.log("success")
                    this[Constant.INITIATE_PLANS]()
                    this.$router.push("/")
                })
                .catch((/**data**/) => {
                    // if (data.response.status == 403) {
                    //     this[Constant.CHECK_REFRESH]();
                    //     console.log("checkRefresh");
                    //     this.savePlan();
                    // }
                    console.log("저장에 실패 하였습니다.")
                })
        }
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
    margin-top: 6px;
}

.text-area {
    width: 100%;
    height: 230px;
    resize: none;
}

#plan_save_btn {
    width: 90%;
    border: none;
    height: 45px;
}

</style>