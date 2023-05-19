<template>
   <b-form @submit="addComment" @reset="onReset">
    <b-card border-variant="0">
      <div class="container">
        <div class="row" id="row1">
          <div class="col-10 mx-auto">
            <b-form-input aplaceholder="여기 닉넴"></b-form-input>
            <b-form-textarea 
              id="textarea-no-resize"
              v-model="comment.content"
              placeholder="댓글을 입력하세요..."
              rows="3"
              no-resize
              class = "mt-2"
              @keyup.13="addComment()"
              ></b-form-textarea>
              </div>
    
          <div class="col-10 mx-auto" id="areaBottom">
              <button class = "btn col-1.5" id="btn1">
              <b-icon class ="icon" icon="image" font-scale="1.1"></b-icon>
              파일</button>
              <b-button class = "btn col-1.5" id="btn2">전송</b-button>
          </div>
      </div>
      </div>
    </b-card>
    </b-form>
</template>



  <script>
import http from "@/util/http-common"

  export default {
    name: 'CommentInputItem',
    components: {},
    data() {
        return {
            comment: {
              id: 0,
              userid: 1,
              title: "",
              content: "",
            },
            text: ""
        };
    },
    created() {},
    methods: {
       addComment(){
        
        http
        .post(`/comment`, {
          userId: this.comment.userid,
          content: this.comment.content,
          boardId: 1
        })
        .then(response => {
          if (response.status === 200) {
            // 200 OK 상태 코드 처리
            console.log("comment save...")
          } else {
            // 다른 상태 코드 처리
            alert(response.status);
          }
        }).catch(()=>{
             let msg = "등록 처리시 문제가 발생했습니다.";
             alert(msg);
             });
      // this.comments.push({
      //   id:4,name:this.newComment.name,content:this.newComment.content, time:new Date(),like:0
      // })
      // this.newComment.name = " "
      // this.newComment.content= " "
      },onSubmit(){
       
      },onReset(){

      }

    },
  };
  </script>
  
  <style scoped>

  #areaBottom{
    margin-top: 7px;
  }


  #btn1{
    float: left;
  }

  #btn2{
    float: right;
    margin-right: 7px;
  }
  </style>