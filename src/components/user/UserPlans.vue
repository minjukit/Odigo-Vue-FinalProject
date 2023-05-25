<template>
  <b-container class="bv-example-row mt-3">

    <b-row class="mb-1">
      <b-col class="text-center">
        <h2>나의 계획</h2>
      </b-col>
    </b-row>
    <b-row>
    </b-row>
    <b-row class="mt-2">
      <b-col v-if="savedList.length">
        <b-table hover responsive :per-page="perPage" :items="savedList" :fields="fields" :current-page="currentPage"
          @row-clicked="rowClickHandler">

          <template #cell(index)="data">
            {{ (currentPage - 1) * perPage + data.index + 1 }}
          </template>

          <template #cell(buttons)="row">
           
            <!-- <b-icon icon="x-circle" scale="2" variant="danger" @click="deletePlan(row.item.id)"/> -->
            
            <button class="btn btn-danger btn-sm" @click="deletePlan(row.item.id)">삭제하기</button>
          </template>
        </b-table>
        <div class="overflow-auto mt-5" id="pagNav">
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" use-router
            align="center"></b-pagination>
        </div>

      </b-col>
      <b-col v-else class="text-center">등록한 계획이 없습니다.</b-col>
    </b-row>

  </b-container>
</template>

<script>
import moment from "moment";
import http from "@/util/http-common.js";
// import BoardListItem from "@/components/board/item/BoardListItem";
// import moment from "moment";
import { mapGetters } from 'vuex';

export default {
  name: "hotPlaceList",
  components: {
    // BoardListItem,
  },

  data() {
    return {
      articles: [],
      currentPage: 1,
      perPage: 10, // 한페이지 당 보여질 글 개수
      fields: [
        { key: 'index', label: '글번호' },
        { key: 'name', label: '제목' },
        { key: 'startDate', label: '출발일' },
        { key: 'buttons', label: '삭제' }
      ],
      savedList: null,
    };
  },
  created() {
    http.get("/plan").then((response) => {
      this.savedList = response.data;
      console.log(this.savedList)
      for (let i = 0; i < this.savedList.length; i++) {
        this.savedList[i].startDate = moment(this.savedList[i].startDate).format("YY-MM-DD");
        this.savedList[i].endDate = moment(this.savedList[i].endDate).format("YY-MM-DD");
      }
    }).catch(() => {
    })
  },
  methods: {
    rowClickHandler(row) { //click event
      console.log(row)
      this.$router.push(`/planDetail/savePlan/${row.id}`);
    },

    deletePlan(id) {
      http.delete(`/plan/${id}`)
        .then(() => {
          console.log("succes")
          location.reload()
        })
        .catch(() => {
          console.log("실패")
        })
    },
  },
  computed: {
    rows() {
      return this.savedList.length
    },
    filteredData() {
      let sortedArticles = [...this.articles]; // eslint 부작용 제거 => 배열 복사
      if (this.sortBy === 'dateDesc') {
        sortedArticles.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        console.log(sortedArticles);
      } else if (this.sortBy === 'dateAsc') {
        sortedArticles.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
        console.log(sortedArticles);
      }
      return sortedArticles;

    },
    ...mapGetters(["accessToken"])
  }
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}

.tdSubject {
  width: 300px;
  text-align: left;
}

/* #pagNav{
  display: flex; 
  justify-content: center; 
  align-items: center;
} */
</style>