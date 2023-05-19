<template>
    <b-container>
    <b-row>
      <b-row v-if="comments.length">
       
       <!-- <b-row class="commentBody" v-for="comment in comments" :key="comment.id">
        <comment-list-item :comment="comment"></comment-list-item>
       </b-row> -->

        <comment-list-item v-for="(comment) in comments" :key="comment.idx" :comment="comment" @commentChangeEvent="getCommentList"></comment-list-item>
       

      </b-row>
      <b-col v-else class="text-center">첫 댓글을 작성해주세요</b-col>
    </b-row>
    </b-container>
</template>

<script>
import http from "@/util/http-common.js";
import moment from "moment";
import CommentListItem from "./item/CommentListItem.vue";

export default {
    name: 'CommentList',
    components: {CommentListItem},
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
            console.log("delete.....")
            http.get(`/comment`).then(({ data }) => {
            console.log("delete...then..")
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
    width: 80%;
}
</style>