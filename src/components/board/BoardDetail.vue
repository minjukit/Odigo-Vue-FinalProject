<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card>
        <!-- <b-card
          :header-html=
          "`<div class='text-left'><h3>${article.title} </h3></div>
          <div  class='text-left'>${modifiedDate} | ${article.count} 읽음</h6></div>
          <div class='text-right'><h6>${article.userid}</div>`"
          class="mb-2"
          id="boardcard"
          border-variant="light"
          no-body
        > -->
        <b-card-header class="mb-2 d-flex flex-column">
        
          <div class="d-flex">
            <div class='text-left'><h3>{{article.title}} </h3></div>
            <div class="flex-item1"><h6>{{modifiedDate}}</h6></div>
          </div>
          <div class="d-flex">
          <div class="flex-item2"><h6>{{article.user}} 닉네임</h6></div>
          <div class="flex-item1"><h6> {{article.count}} 읽음</h6></div>
          </div>
        </b-card-header>
   
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="mb-1" align-self="center">
        <b-button variant="outline-secondary" @click="listArticle">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
     <!--댓글-->
     <b-button
      v-if="isScrolled && showButton"
      @click="scrollToTop"
      class="button-float"
    ><b-icon icon="arrow-up"></b-icon></b-button>
     <div class="mt-5">
     <comment-list></comment-list>
    </div>
  </b-container>

</template>

<script>
import http from "@/util/http-common.js";
import moment from "moment"
import CommentList from "./CommentList.vue";


export default {
  components: {CommentList},
  name: "BoardDetail",
  
  data() {
    return {
      article: {},
      modifiedDate: new Date(),
      isScrolled: false,
      showButton: false
    };
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  mounted() {
  window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    http.get(`/board/${this.$route.params.id}`).then(({ data }) => {
      this.article = data;
      console.log("createdDetail")
      console.log(data)
      this.modifiedDate= moment(this.article.modifiedDate).format("YYYY.MM.DD HH:MM");
    });
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "boardList" , 
      params: {
        currentPage: this.$route.params.currentPage,
        sortBy: this.$route.params.sortBy
      }
      });
      console.log("listarticle")
      console.log(this.$route.params.currentPage)
      console.log(this.$route.params.sortBy)
    },
    moveModifyArticle() {
      this.$router.push({
        name: "boardModify",
        params: { id: this.article.id },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.push({
          name: "boardDelete",
          params: { id: this.article.id },
        });
      }
    },
    handleScroll() {
    this.isScrolled = window.pageYOffset > 0;
    this.showButton = window.innerHeight < document.documentElement.scrollHeight;
    },
    scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  },
  // filters: {
  //   dateFormat() {
  //     this.modifiedDate = moment(this.article.modifiedDate).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style scoped>
#boardcard{
  border: none;
  background: white;
}

.flex-item2{
  flex:1;
  text-align: left;

}


.flex-item1{
  flex:1;
  margin-top: 7px;
  text-align: right;
}

.button-float {
  position: fixed;
  bottom: 80px;
  right: 90px;
  font-size: 40%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(62, 165, 255);
  border: none;
}
.button-float .b-icon{
   scale: 300%;
   margin-top: 1px;
}
</style>
