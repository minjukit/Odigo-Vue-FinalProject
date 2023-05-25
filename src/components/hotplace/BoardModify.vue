<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert success><h3>글수정</h3></b-alert>
      </b-col>
    </b-row>
    <board-input-item type="modify" :id="id" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/hotplace/item/BoardInputItem.vue";

export default {
  name: "hotBoardModify",
  props: ["id"],
  components: {
    BoardInputItem,
  },
  created () {
    console.log('hotBoardModify created..');
  },
};
</script>

<style></style>
