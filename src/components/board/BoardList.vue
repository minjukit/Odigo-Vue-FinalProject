<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <!-- <b-col>
        <b-alert  show variant="success" class="mt-3">
          <h3>정보</h3>
        </b-alert>
      </b-col> -->
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right mr-5 mt-3">
        <b-button variant="success" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row v-if="articles.length">
      <b-col class="my-1" align-h="center">
        <b-form-group label="정렬" label-for="sort-by-select" label-cols-sm="10" label-align-sm="right" label-size="sm"
          class="mb-0">
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" :options="sortOption" id="sort-by-select">
              <!-- option data안에 있음 -->
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

    </b-row>
    <b-row>
      <b-col v-if="articles.length">
        <b-table hover responsive :per-page="perPage" :items="filteredData" :fields="fields" :current-page="currentPage"
          @row-clicked="rowClickHandler">

          <template #cell(index)="data">
            {{ (currentPage - 1) * perPage + data.index + 1 }}
          </template>
          <!-- <tbody>
            <board-list-item
              v-for="(article,idx) in articles"
              :key="article.id"
              :idx="idx"
              v-bind="article"
            />
          </tbody> -->
        </b-table>
        <!--page navigation-->
        <div class="overflow-auto mt-5" id="pagNav">
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" use-router
            align="center" class="pagination"></b-pagination>
        </div>
      </b-col>
      <b-col v-else class="text-center">
        <div style="height: 90px;">  </div>
        글 목록이 없습니다.
        
        <div style="height: 100px;">  </div>
        </b-col>
    </b-row>

  </b-container>
</template>

<script>
import http from "@/util/http-common.js";
// import BoardListItem from "@/components/board/item/BoardListItem";
import moment from "moment";

export default {
  name: "BoardList",
  components: {
    // BoardListItem,
  },
  data() {
    return {
      articles: [],
      currentPage: 1,
      perPage: 6, // 한페이지 당 보여질 글 개수
      fields: [
        { key: 'index', label: '글번호' },
        { key: 'nickName', label: '작성자' },
        { key: 'title', label: '제목' },
        { key: 'count', label: '조회수' },
        { key: 'modifiedDate', label: '작성일' },
      ],
      sortBy: 'dateDesc', // 정렬방식 default
      sortOption: [
        { value: 'dateDesc', text: '최근순' },
        { value: 'dateAsc', text: '오래된순' }
      ],

    };
  },
  created() {
    this.sortBy = this.$route.params.sortBy;
    this.currentPage = this.$route.params.currentPage;
    if (this.currentPage === undefined) this.currentPage = 1;
    if (this.sortBy === undefined) this.sortBy = 'dateDesc';
    http.get(`/board`).then(({ data }) => {
      this.articles = data;
      for (let i = 0; i < this.articles.length; i++) {
        this.articles[i].modifiedDate = moment(this.articles[i].modifiedDate).format("YY.MM.DD");
      }
      console.log("created")
      console.log(this.filteredData)
    });

  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
    pageClick() {
      //this.currentPage = page;
      //this.getBoardListByPage(page);
    },
    // getBoardListByPage(page){
    //   let offset = (page-1)*this.perPage;
    //   http.get(`/board/list?${offset}&limit=${this.perPage}`)
    //   .then(response => {
    //     this.articles = response.data;
    //     console.log("sdfs")
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    // },
    rowClickHandler(row) { //click event
      this.$router.push({
        name: "boardDetail",
        params: {
          id: row.id,
          currentPage: this.currentPage,
          sortBy: this.sortBy
        }
      });
    },
  },
  computed: {
    rows() {
      return this.articles.length
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

    }
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

.pagination > .active > a, 
.pagination > .active > span, 
.pagination > .active > a:hover, 
.pagination > .active > span:hover, 
.pagination > .active > a:focus, 
.pagination > .active > span:focus {
  background: red;
  border-color: red;
}
</style>