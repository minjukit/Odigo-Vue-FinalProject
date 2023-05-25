<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
          <b-alert  show variant="success" class="mt-3">
          <h3>글쓰기</h3></b-alert>
      </b-col>
    </b-row>
    <board-input-item type="register" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem.vue";

export default {
  name: "BoardWrite",
  components: {
    BoardInputItem,
  },
};
</script>

<style scoped>
#cardheader{
  background: rgba(180, 231, 202, 0.342);
  border-radius: 5px;
}
</style>
