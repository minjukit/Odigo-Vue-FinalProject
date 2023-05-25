<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mt-5">
      <!-- <b-col>
          <b-alert  show variant="success" class="mt-3">
          <h3>글수정</h3></b-alert>
      </b-col> -->
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

<style scoped>


#cardheader{
  background: rgba(180, 231, 202, 0.342);
  border-radius: 5px;
}
</style>
