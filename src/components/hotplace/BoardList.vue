<template>
  <b-container class="bv-example-row mt-3">
   
    <b-row class="ml-2">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-1" align-h="center">
        <b-form-group
          label="정렬"
          label-for="sort-by-select"
          label-cols-sm="10"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
        <b-input-group size="sm">
          <b-form-select v-model="sortBy" :options="sortOption" 
           id="sort-by-select">
              <!-- option data안에 있음 -->
          </b-form-select>
        </b-input-group>
        </b-form-group>
      </b-col>

    </b-row>
    <b-row  class ="mt-2">
      <b-col v-if="articles.length">
        <b-table hover responsive
        :per-page="perPage"
        :items="filteredData"
        :fields="fields"
        :current-page="currentPage"
        @row-clicked="rowClickHandler"
        >

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
        <div class="overflow-auto mt-5" id="pagNav">
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" use-router align="center"></b-pagination>
        </div>
      </b-col>
      <b-col v-else class="text-center">글 목록이 없습니다.</b-col>
    </b-row>
  
  </b-container>
</template>

<script>
import http from "@/util/http-common.js";
// import BoardListItem from "@/components/board/item/BoardListItem";
import moment from "moment";
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
      perPage: 6, // 한페이지 당 보여질 글 개수
      fields: [
        // { key: 'index', label: '글번호' },
        { key: 'nickName', label: '작성자' },
        { key: 'title', label: '제목' },
        { key: 'count', label: '조회수' },
        { key: 'heart', label: '좋아요수' },
        { key: 'modifiedDate', label: '작성일'},
      ],
      sortBy: 'heartDesc', // 정렬방식 default
      sortOption: [
        { value: 'dateDesc', text: '최근순' },
        { value: 'dateAsc', text: '오래된순' },
        { value: 'heartDesc', text: '인기순' }
      ],
      
       
    };
  },
  created() {
    this.sortBy = this.$route.params.sortBy;
    this.currentPage = this.$route.params.currentPage;
    if(this.currentPage === undefined) this.currentPage =1;
     if(this.sortBy === undefined) this.sortBy ='heartDesc';
    http.get(`/hotplace`).then(({ data }) => {
      this.articles = data;
      for(let i =0; i<this.articles.length; i++){
         this.articles[i].modifiedDate = moment(this.articles[i].modifiedDate).format("YY.MM.DD");
      }
      console.log("created")
      console.log(this.filteredData)
    });

  },
  methods: {
    moveWrite() {
      this.$router.push('/hotplace/write' );
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
        name: "hotPlaceDetail",
        params:{
          id:row.id,
          currentPage: this.currentPage,
          sortBy: this.sortBy
        } 
      });
    }
  },
    computed: {
      rows() {
        return this.articles.length
      },
      filteredData(){
        let sortedArticles = [...this.articles]; // eslint 부작용 제거 => 배열 복사
        if(this.sortBy === 'dateDesc'){
          sortedArticles.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
          console.log(sortedArticles);
        }else if(this.sortBy ==='dateAsc'){
          sortedArticles.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
          console.log(sortedArticles);
        }else if(this.sortBy ==='heartDesc'){
          sortedArticles.sort((a, b) => new Date(b.heart).getTime() - new Date(a.heart).getTime());
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