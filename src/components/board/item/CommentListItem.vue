<template>
   <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
    <b-card bg-variant="light">
      <div>
        <b-form-input aplaceholder="여기 닉넴" class="mt-1"></b-form-input>
        <b-form-textarea
          id="textarea-no-resize"
          v-model="text"
          placeholder="댓글을 입력하세요..."
          rows="3"
          no-resize
          class = "mt-2"
          @keyup.13="addComment()"
          ></b-form-textarea>
        <b-button class = "mt-3">전송</b-button>
      </div>
    </b-card>
    <!-- </b-form>  -->
</template>



  <script>
  export default {
    name: 'CommentListItem',
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
       addComment(){
      this.comments.push({
        id:4,name:this.newComment.name,content:this.newComment.content, time:new Date(),like:0
      })
      this.newComment.name = " "
      this.newComment.content= " "
    }
    },
  };
  </script>
  
  <style scoped></style>