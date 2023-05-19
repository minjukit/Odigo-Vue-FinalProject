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
                    <tr>
                        <td style="font-size: 17px;">계획 설명</td>
                    </tr>
                    <tr>
                        <textarea class="form-control text-area" rows="5" placeholder="상세 설명을 추가해 주세요"
                            v-model.lazy="planDetail"></textarea>
                    </tr>
                    <tr>
                        <button id="plan_save_btn" type="button" class="btn btn-success" @click="savePlan">계획 저장하기</button>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import empRestAPI from '@/util/http-common.js'
import { mapGetters } from 'vuex';
export default {
    name: "PlanDetail",
    data() {
        return {
            planName: "",
            planDetail: ""
        }
    },
    computed: {
        ...mapGetters(["planList"]),
    },
    created() {
    },
    mounted() {

    },
    methods: {
        pickSpot(id) {
            var checkedId = id;
            this.$emit('checkedIdFromChild', checkedId)
        },
        savePlan() {
            const data = {
                name: this.planName,
                description: this.planDetail,
                login_id: "test",
                routes: this.planList
            }
            empRestAPI.post('/plan', data)
                .then(() => console.log("sucess"))
                .catch(() => console.log("catch exception"))
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
    width: 100%;
    border: none;
    height: 45px;
}
</style>