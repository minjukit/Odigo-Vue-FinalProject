<template>
    <div id="mapList">
        <span style="font-size: 25px;">여행지 검색</span>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table-primary table-hover">
                <thead>
                    <tr>
                        <th class="col-3" style="right-margin:5px;">번호</th>
                        <th class="col-6">장소 이름</th>
                        <th class="col-3">장소 분류</th>
                    </tr>
                </thead>
                <tbody style="font-size:15px">
                    <tr v-if="items.length == 0">
                        <td colspan="3">검색 결과가 없습니다.</td>
                    </tr>
                    <template v-else>
                        <tr v-for="(item, index) in items" :key="item.id" @click="pickSpot(item.id)">
                            <td style="width:55px;">{{ index + 1 }}</td>
                            <td>{{ item.place_name }}</td>
                            <td style="width:100px;">{{ item.category_group_name }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    name: "mapList",
    // props: ["items"],
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            checkedId: "",
            striped: false,
        bordered: false,
        borderless: false,
        }
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

.my-custom-scrollbar {
    position: relative;
    height: 430px;
    overflow: auto;
}

.table-wrapper-scroll-y {
    display: block;
}
</style>