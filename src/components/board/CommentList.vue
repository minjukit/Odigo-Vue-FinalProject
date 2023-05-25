<template>
    <b-container>
        <div>
            <h4 class="text-left">댓글</h4>
            <comment-input-item :boardid="boardId"></comment-input-item>
        </div>
    <div>
      <b-row v-if="comments.length">
    
        <comment-list-item 
        v-for="(comment) in comments" :key="comment.id" :comment="comment"
         @commentChangeEvent="getCommentList" class="commentBody" :boardId="boardId"></comment-list-item>
       

      </b-row>
      <b-col v-else class="text-center">첫 댓글을 작성해보세요</b-col>
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
    props: {
        boardId: {
            type: Number
        }
    },
    created() {
    console.log("boardId======" + this.boardId)
        http.get(`/comment/list/`+this.boardId).then(({ data }) => {
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
            http.get(`/comment/list/`+this.boardId).then(({ data }) => {
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