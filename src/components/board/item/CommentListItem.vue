<template>
   <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
    <b-card border-variant="0"> <!-- 카드 no border-->
       <div class="container">
        <div class="row">
        <div class="col-10 ml-4 mx-auto">
        <label class="nicklabel">{{data.userid}}</label>
        <label class="datelabel">{{data.modifiedDate}}</label>

        <b-dropdown class="dropdown" variant="link" toggle-class="text-decoration-none" no-caret>
        <!-- dropdown -->
          <template #button-content >
            <b-icon class ="editicon" icon="three-dots" font-scale="1.2"></b-icon>
          </template>
          <b-dropdown-item href="#">삭제</b-dropdown-item>
          <b-dropdown-item href="#">수정</b-dropdown-item>
        </b-dropdown>
          <!-- comment text -->
        <b-form-textarea
          id="textarea-no-resize"
          v-model="data.content"
          rows="3"
          no-resize
          readonly
          class = "mt-2"
          @keyup.13="addComment()"
          ></b-form-textarea>
     
        <button class = "btn">
        <b-icon class ="icon" icon="heart" font-scale="1.1"></b-icon>
        좋아요</button>
        <button class = "btn">
        <b-icon class ="icon" icon="chat-right-text" font-scale="1.1"></b-icon>
        답글</button>
         <button class = "btn">
         <b-icon class ="icon" icon="image" font-scale="1.1"></b-icon>
        파일</button>
        </div>
        </div>
        </div>
    </b-card>
    <!-- </b-form>  -->
</template>



  <script>
  export default {
    name: 'CommentListItem',
    components: {},
    props: ["comment"],
    data() {
        return {
            data:{

            }
        };
    },
    created() {
      this.data = {...this.comment};
      console.log("댓글모두")
    },
    methods: {
    //    addComment(){
    //   this.comments.push({
    //     id:4,name:this.newComment.name,content:this.newComment.content, time:new Date(),like:0
    //   })
    //   this.newComment.name = " "
    //   this.newComment.content= " "
    // }
    },
  };
  </script>
  
  <style scoped>
  
  .nicklabel{
   font-weight: bold;
    text-align: left;
    float: left;
    margin-right: 15px;
    margin-left: 15px;
  }
    .datelabel{
    text-align: left;
    float: left;
  }

  .editicon{
    float: right;
  }

  .icon{
    margin-right: 3px;
    margin-top: 3px;
  }

  .btn{
    float: left;
    border: none;
    outline: none;
    background: none;
    margin-left: 10px;
       margin-top: 6px;
  }

  .dropdown{
    float: right;
  }

  </style>