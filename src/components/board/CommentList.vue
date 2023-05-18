<template>
    <b-container>
    <b-row>
      <b-row v-if="comments.length">
       
       <div v-for="comment in comments" :key="comment.id">
        <comment-list-item :comment="comment"></comment-list-item>
       </div>
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
            comments: [],
        };
    },
    created() {

        http.get(`/comment`).then(({ data }) => {
            this.comments = data;
            for(let i =0; i<this.comments.length; i++){
                this.comments[i].modifiedDate = moment(this.comments[i].modifiedDate).format("YY.MM.DD HH:mm");
            }
            });
    },
    methods: {},
};
</script>

<style scoped></style>