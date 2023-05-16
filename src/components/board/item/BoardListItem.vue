<!-- ***************사용 안함***************-->
<template #cell(fieldName)="data">
<router-link
        :to="{ name: 'boardDetail', params: { id: id } }"
        >
  <b-tr>
    <b-td>{{ idx+1 }}</b-td>
    <b-td>{{ title }}</b-td>
    <b-td>{{ count }}</b-td>
    <b-td>{{ userid }}</b-td>
    <b-td>{{ modifiedDate | dateFormat }}</b-td>
  </b-tr>
  </router-link
      >
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListItem",
  props: {
    idx: Number,
    id: Number,
    userid: String,
    content: String,
    title: String,
    count: Number,
    createdDate: String,
    modifiedDate: String
  },
  filters: {
    dateFormat(mdate) {
      return moment(new Date(mdate)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
