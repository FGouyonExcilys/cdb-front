<template>
  <div class="companies">
    <CompanyList/>
  </div>
</template>

<script>
// @ is an alias to /src
import CompanyList from "@/components/CompanyList.vue";

export default {
  components: {
    CompanyList
  }
};
</script>