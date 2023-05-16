<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common.js";

export default {
  name: "BoardDelete",
  created() {
    http.delete(`/board/${this.$route.params.id}`).then((response) => {
      let msg =response.status;
      if (response.status === 200) {
        msg = "삭제가 완료되었습니다.";
      }
      alert(msg);
      // 현재 route를 /list로 변경.
      this.$router.push({ name: "boardList" });
    }).catch((err)=>{
      alert("삭제 처리시 문제가 발생했습니다."+err);
       this.$router.push({ name: "boardList" });
    }
    );
  },
};
</script>

<style></style>
