<template>

  <div class="card bg-dark text-white">
  <img src="@/assets/home/main1.jpg" class="card-img" alt="제주도"/>
  <div class="card-img-overlay">
    <h1 class="card-title">제주도</h1>
    <p class="card-text">
      This is a wider card with supporting text below as a natural lead-in to additional
      content. This content is a little bit longer.
    </p>
    <p class="card-text">Last updated 3 mins ago</p>
  </div>
  <div>
  <b-card-group deck>
  
    <b-card title="Title" 
      img-src="@/assets/home/main1.jpg" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.
      </b-card-text>
      <template #footer>
        <small class="text-muted">3일전</small>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
      <b-card-text>
        This card has supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <template #footer>
        <small class="text-muted">15분전</small>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This card has even longer content than the first to show that equal height action.
      </b-card-text>
      <template #footer>
        <small class="text-muted">어제</small>
      </template>
    </b-card>
  </b-card-group>
</div>
</div>

</template>

<script>
export default {

    components: {},
    data() {
        return {
            message: '',
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped></style>