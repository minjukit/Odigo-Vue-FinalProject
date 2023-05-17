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
          "`<div  class='text-left'><h3>${article.title} </h3></div>
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
    <comment-list-item
             v-for="(article,idx) in articles"
              :key="article.id"
              :idx="idx"
              v-bind="article"
            />
  </b-container>
</template>

<script>
import http from "@/util/http-common.js";
import moment from "moment"
import CommentListItem from "./item/CommentListItem.vue";

export default {
  components: { CommentListItem },
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
      this.$router.push({ name: "boardList" , params: {currentPage: this.$route.params.currentPage}});
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
