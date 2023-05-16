<template>
    <div id="mapList">
        <span style="font-size: 25px;">검색 목록</span>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col" style="right-margin:5px;">번호</th>
                        <th scope="col">장소 이름</th>
                        <th scope="col">장소 분류</th>
                    </tr>
                </thead>
                <tbody style="font-size:15px">
                    <tr v-if="items.length == 0">
                        <td colspan="3">검색 결과가 없습니다.</td>
                    </tr>
                    <template v-else>
                        <tr v-for="(item, index) in items" :key="item.id">
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
        }
    },
    created() {
    },
    mounted() {

    },
    methods: {},
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