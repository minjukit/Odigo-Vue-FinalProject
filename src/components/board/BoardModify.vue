<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글수정</h3></b-alert>
      </b-col>
    </b-row>
    <board-input-item type="modify" :id="id" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem.vue";

export default {
  name: "BoardModify",
  props: ["id"],
  components: {
    BoardInputItem,
  },
  created () {
    console.log('BoardModify created..');
  },
};
</script>

<style></style>
