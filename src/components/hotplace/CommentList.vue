<template>
    <b-container>
        <div>
            <h4 class="text-left">댓글</h4>
            <comment-input-item></comment-input-item>
        </div>
    <div>
      <b-row v-if="comments.length">
    
        <comment-list-item 
        v-for="(comment) in comments" :key="comment.idx" :comment="comment"
         @commentChangeEvent="getCommentList" class="commentBody"></comment-list-item>
       

      </b-row>
      <b-col v-else class="text-center">첫 댓글을 작성해주세요</b-col>
    </div>
    </b-container>
</template>

<script>
import http from "@/util/http-common.js";
import moment from "moment";
import CommentListItem from "./item/CommentListItem.vue";
import CommentInputItem from "./item/CommentInputItem.vue";

export default {
    name: 'CommentList',
    components: {CommentListItem, CommentInputItem},
    data() {
        return {
            comments: [
                
            ],
        };
    },
    created() {

        http.get(`/comment`).then(({ data }) => {
            console.log(data)
            this.comments = data;
            for(let i =0; i<this.comments.length; i++){
                this.comments[i].modifiedDate = moment(this.comments[i].modifiedDate).format("YY.MM.DD HH:mm");
            }
            });
    },
    methods: {

        getCommentList(){
            console.log("list reload.....")
            http.get(`/comment/`).then(({ data }) => {
            console.log("get function...then..")
            this.comments = data;
            for(let i =0; i<this.comments.length; i++){
                this.comments[i].modifiedDate = moment(this.comments[i].modifiedDate).format("YY.MM.DD HH:mm");
            }
            });
        }

    },
    computed:{
        computedList(){
            return this.comments;
        }
    }

};
</script>

<style scoped>

.commentBody{
    margin: auto;
    width: 78%;
}
</style>