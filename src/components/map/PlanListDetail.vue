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
                        <!-- <tr v-for="(item, index) in planList" :key="item.id">
                            <td class="middleTd" style="width:55px;" @click="openModal">{{ index + 1 }}</td>
                            <td class="middleTd" @click="openModal">{{ item.place_name }}</td>
                            <td class="middleTd" @click="openModal">{{ item.phone }}</td>
                            <td class="middleTd" style="width:100px;" @click="openModal">{{ item.category_group_name }}</td>
                            <td class="middleTd"><a :href="item.place_url" target="_blank">이동하기</a></td>
                            <td><b-button class="btn btn-light btn-sm" style="margin-right: 5px;"
                                    @click="moveUp(item.id)">올리기</b-button>
                                <b-button class="btn btn-dark btn-sm" @click="moveDown(item.id)">내리기</b-button>
                            </td>
                            <td><b-button class="btn btn-danger btn-sm" @click="toRemovePlan(item.id)">삭제</b-button></td>
                        </tr> -->
                        <!-- <table-row v-for="item in planList" :key="item.id" :row-data="item"></table-row> -->
                        <plan-list-detail-row v-for="(item, index) in planList" :key="item.id" :item="item"
                            :index="index"></plan-list-detail-row>
                    </template>
                </tbody>
            </table>
            <!-- <button @click="openModal">열기</button> -->
            <!-- <RouteModal v-if="showModal" @close="showModal = false" :detailitem="nowitem"></RouteModal> -->

        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Constant from '@/common/Constant'
// import RouteModal from '@/components/map/RouteModal.vue'
import PlanListDetailRow from './PlanListDetailRow.vue';

export default {
    name: "PlanList",
    // props: ["items"],
    computed: {
        ...mapState(["planList"]),
    },
    components: {
        // RouteModal,
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