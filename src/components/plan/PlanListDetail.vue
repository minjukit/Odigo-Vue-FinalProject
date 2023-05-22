<template>
    <div id="mapList">
        <span style="font-size: 25px;">여행지 목록</span>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col-1" style="right-margin:5px;">번호</th>
                        <th scope="col-5">장소 이름</th>
                        <th scope="col-3">연락처</th>
                        <th scope="col-1">장소 분류</th>
                        <th scope="col-1">상세 정보</th>
                        <th style="width: 15%">순서 조정</th>
                        <th scope="col-1">삭제</th>
                    </tr>
                </thead>
                <tbody style="font-size:15px;">
                    <tr v-if="planList.length == 0">
                        <td colspan="7">검색 결과가 없습니다.</td>
                    </tr>
                    <template v-else>
                        <plan-list-detail-row v-for="(item, index) in planList" :key="item.id" :item="item"
                            :index="index"></plan-list-detail-row>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Constant from '@/common/Constant'
import PlanListDetailRow from './PlanListDetailRow.vue';

export default {
    name: "PlanList",
    computed: {
        ...mapState(["planList"]),
    },
    components: {
        PlanListDetailRow
    },
    props: {
    },
    data() {
        return {
            showModal: false,
            nowItem: {},
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {
        ...mapActions([Constant.REMOVE_PLAN, Constant.MOVE_UP, Constant.MOVE_DOWN]),
        pickSpot(id) {
            console.log(id)
        },

        toRemovePlan(id) {
            console.log(id);
            this[Constant.REMOVE_PLAN](id)
        },
        moveDown(id) {
            console.log(id)
            this.moveDownAction(id)
        },
        moveUp(id) {
            console.log(id)
            this.moveUpAction(id)
        },
    },
};
</script>

<style scoped>
#mapList {
    height: 500px;
    width: 94.4%;
    border-radius: 30px;
    border-style: solid;
    border-width: 2px;
    border-color: rgba(0, 0, 0, .3);
    padding: 5px 0px 5px 0px;
    margin-top: 6px;
    margin-left: 14px;
}

.my-custom-scrollbar {
    position: relative;
    height: 430px;
    overflow: auto;
}

.table-wrapper-scroll-y {
    display: block;
}

.middleTd {
    vertical-align: middle;
}
</style>