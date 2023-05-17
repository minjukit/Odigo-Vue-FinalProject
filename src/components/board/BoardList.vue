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
      <b-col class="my-1" align-h="center">
        <b-form-group
          label=""
          label-for="sort-by-select"
          label-cols-sm="10"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
       
        >
          <!-- <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
            >
            <template #first>
                <option value="dateDesc">최근순</option>
                <option value="dateAsc">오래된순</option>
              </template>
            </b-form-select>
          </b-input-group> -->
        </b-form-group>
      </b-col>

    </b-row>
    <b-row>
      <b-col v-if="articles.length">
        <b-table hover responsive
        :per-page="perPage"
        :items="articles"
        :fields="fields"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :current-page="currentPage"
        :filter-function="sortBy"
        @row-clicked="rowClickHandler"
        @filtered="onFiltered">

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
        { key: 'modifiedDate', label: '작성일', sortable: true, sortDirection: 'desc'},
      ],
      filter: null,
      filterOn: [],
      sortDirection: 'dateDesc',
      sortBy: '', // 정렬방식 
      sortOption: [
        { value: 'dateDesc', text: '최근순' },
        { value: 'dateAsc', text: '오래된순' }
      ]
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
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
  },
    computed: {
      rows() {
        return this.articles.length
      },
       sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
    },
    watch: {
      // 지정정렬안됨
      sortBy(date){
        if(date == 'dateAsc'){
          this.articles.sort((a,b) => b.modifiedDate - a.modifiedDate);
        }else if(date == 'dateDesc'){
          this.articles.sort((a,b) => a.modifiedDate - b.modifiedDate);
        }
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