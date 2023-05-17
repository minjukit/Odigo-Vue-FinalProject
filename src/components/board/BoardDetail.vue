<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listArticle">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>
          ${article.title} </h3><div><h6>${article.userid}</div><div>${article.modifiedDate}</h6></div>조회수: ${article.count}`"
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
  </b-container>
</template>

<script>
import http from "@/util/http-common.js";
//import moment from "moment"

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      modifiedDate: ""
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
  //   dateFormat(modifiedDate) {
  //     this.modifiedDate = moment(new Date(modifiedDate)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
