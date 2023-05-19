<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html=
          "`<div class='text-left'><h3>${article.title} </h3></div>
          <div  class='text-left'>${modifiedDate} | ${article.count} 읽음</h6></div>
          <div class='text-right'><h6>${article.userid}</div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
   
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
    <div class="mt-5">
    <h4 class="text-left">댓글</h4>
     <comment-input-item></comment-input-item>
    <comment-list-item></comment-list-item>
    </div>
     <div class="mt-5">
    <h4 class="text-left">댓글</h4>
     <comment-list></comment-list>
    </div>
  </b-container>

</template>

<script>
import http from "@/util/http-common.js";
import moment from "moment"
import CommentInputItem from "./item/CommentInputItem.vue";
import CommentListItem from "./item/CommentListItem.vue";
import CommentList from "./CommentList.vue";


export default {
  components: {CommentInputItem,CommentListItem, CommentList},
  name: "BoardDetail",
  
  data() {
    return {
      article: {},
      modifiedDate: Date
    };
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    http.get(`/board/${this.$route.params.id}`).then(({ data }) => {
      this.article = data;
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
      this.$router.replace({
        name: "boardModify",
        params: { id: this.article.id },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boardDelete",
          params: { id: this.article.id },
        });
      }
    },
  },
  // filters: {
  //   dateFormat() {
  //     this.modifiedDate = moment(this.article.modifiedDate).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
