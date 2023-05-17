<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">

        <b-form-group
          id="title-group"
          label="제목:"
          label-for="title"
        >
          <b-form-input
            id="title"
            v-model="article.title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >글수정</b-button
        >
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/util/http-common.js";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        id: 0,
        userid: "",
        title: "",
        content: "",
     
      },
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      http.get(`/board/${this.$route.params.id}`).then(({ data }) => {
        // this.article.articleno = data.article.articleno;
        // this.article.userid = data.article.userid;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        this.article = data;
      });
      this.isUserid = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      
      err &&
        !this.article.title &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.title.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.id = 0;
      this.article.title = "";
      this.article.content = "";
      this.$router.push({ name: "boardList" });
    },
    registArticle() {
      console.log(this.article);
      http
        .post(`/board`, {
          userid: this.article.userid,
          title: this.article.title,
          content: this.article.content,
        })
        .then(response => {
          if (response.status === 200) {
            // 200 OK 상태 코드 처리
            this.moveList();
          } else {
            // 다른 상태 코드 처리
            alert(response.status);
          }
        }).catch(()=>{
             let msg = "등록 처리시 문제가 발생했습니다.";
             alert(msg);
             });
    },
    modifyArticle() {
      
      http
        .put(`/board/${this.article.id}`,  {
          id: this.article.id,
          userid: this.article.userid,
          title: this.article.title,
          content: this.article.content,
        })
        .then(() => {
          // 현재 route를 /list로 변경.
          this.moveList();
        }).catch(() => {    let msg = "수정 중 문제가 발생했습니다."; alert(msg);});

    },
    moveList() {
      this.$router.push({ name: "boardList" });
    },
  },
};
</script>

<style></style>
