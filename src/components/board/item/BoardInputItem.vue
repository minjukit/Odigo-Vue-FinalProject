<template>
  <b-row class="mb-1 mr-3 ml-3">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">

         <b-button
          type="submit"
          variant="outline-success"
          class = "btnForm"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit"  variant="outline-success" class = "btnForm" v-else
          >글수정</b-button
        >
        <b-button type="reset" variant="outline-danger" class = "btnForm">초기화</b-button>

        <b-form-group
          id="title-group"
          
          label-for="title"
  
        >
          <b-form-input
            id="title"
            v-model="article.title"
            type="text"
            required
            placeholder="제목을 입력하세요"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용을 입력하세요"
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

       
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/util/http-common.js";
import { mapGetters } from 'vuex';

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        id: 0,
        user: "",
        title: "",
        content: "",
       },
      isUserid: false,
    };
  },
   computed: {
    ...mapGetters(["nickName", "accessToken"])
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      console.log(this.type)
      http.get(`/board/${this.$route.params.id}`).then(({ data }) => {
        // this.article.articleno = data.article.articleno;
        // this.article.userid = data.article.userid;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        console.log(data)
        this.article = data
        // this.article = {...data}
        // this.id = data.id;
        // this.title = data.title;
        // this.content = data.content;
        // console.log(this.article.title)
      });
      //this.isUserid = true;
    }
    // console.log("데이터왜안나와")
    // console.log(this.article.title)
    // console.log(this.article)
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
      
      this.article.title = "";
      this.article.content = "";

    },
    registArticle() {
      console.log(this.article);
      http
        .post(`/board`, {
          userid: this.article.userid,
          title: this.article.title,
          content: this.article.content,
        }
        ,{
        headers: {
            ACCESS_TOKEN: this.accessToken,
            REFRESH_TOKEN: "noneToken",
          }
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
          //userid: this.article.userid,
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

<style scoped>
.btnForm{
  margin: 5px 5px 15px 5px;
  float: right;
}
</style>
