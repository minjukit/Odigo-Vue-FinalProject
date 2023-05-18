<template>
   <b-form @submit="onSubmit" @reset="onReset">
    <b-card border-variant="0">
      <div class="container">
        <div class="row" id="row1">
          <div class="col-10 mx-auto">
            <b-form-input aplaceholder="여기 닉넴"></b-form-input>
            <b-form-textarea 
              id="textarea-no-resize"
              v-model="text"
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
  export default {
    name: 'CommentInputItem',
    components: {},
    data() {
        return {
            comments: [{

            }],
            text: ""
        };
    },
    created() {},
    methods: {
       addComment(event){
        event.preventDefault();
        
      // this.comments.push({
      //   id:4,name:this.newComment.name,content:this.newComment.content, time:new Date(),like:0
      // })
      // this.newComment.name = " "
      // this.newComment.content= " "
      },
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