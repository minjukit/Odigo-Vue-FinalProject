<!-- ***************사용 안함***************-->
<template #cell(fieldName)="data">
<router-link
        :to="{ name: 'boardDetail', params: { id: id } }"
        >
  <b-tr>
    <b-td>{{ idx+1 }}</b-td>
    <b-td>{{ title }}</b-td>
    <b-td>{{ count }}</b-td>
    <b-td>{{ loginId }}</b-td>
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
    loginId: String,
    content: String,
    title: String,
    count: Number,
    heart: Number,
    fileInfos: [],
    modifiedDate: Date
  },
  filters: {
    dateFormat(mdate) {
      return moment(mdate).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
