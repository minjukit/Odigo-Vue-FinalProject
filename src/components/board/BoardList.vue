<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="articles.length">
        <b-table hover responsive
        :per-page="perPage"
        :items="articles"
        :fields="fields"
        :current-page="currentPage"
        @row-clicked="rowClickHandler">
        <template #cell(index)="data">
          {{ (currentPage-1)*perPage + data.index + 1 }}
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
        <div class="overflow-auto" id="pagNav">
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" use-router align="fill"></b-pagination>
        </div>
      </b-col>
      <b-col v-else class="text-center">글 목록이 없습니다.</b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common.js";
// import BoardListItem from "@/components/board/item/BoardListItem";


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
        { key: 'user', label: '작성자' },
        { key: 'title', label: '제목' },
         { key: 'count', label: '조회수' },
          { key: 'modifiedDate', label: '작성일' },
      ],
    };
  },
  created() {
    this.currentPage = this.$route.params.currentPage;
    if(this.currentPage === undefined) this.currentPage =1;
    http.get(`/board`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
    pageClick(){
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
    rowClickHandler(row){ //click event
      this.$router.push({ 
        name: "boardDetail",
        params:{
          id:row.id,
          currentPage: this.currentPage,
        } 
      });
    }
  },
    computed: {
      rows() {
        return this.articles.length
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

</style>