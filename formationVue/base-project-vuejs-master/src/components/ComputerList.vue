<template>
  <div>
    <ul>
      <h1>COMPUTER LIST</h1>

      <li v-for="computer in result" :key="computer.id">{{computer.name}}</li>
    </ul>
  </div>
</template>

<script>
import ComputersApi from "../api/computers_api";


export default {
  data: function() {
    return {
      result: []
    };
  },
  mounted: function() {
    ComputersApi.findAll().then(response =>
      this.result = response.data
    );
    console.log(this.result);
  }
};
</script>

<style>
tr:nth-of-type(odd) {
	background-color: #fff;
}

tr:nth-of-type(even) {
	background-color: #ccc;
}
</style>