<template>
  <header class="navbar navbar-inverse navbar-fixed-top">
		<div align ="justify">
			<a class="navbar-brand" href="dashboard"> <spring:message
					code="label.header" />
			</a> 
			
			<div align ="center" >
			<a href="${pageContext.request.contextPath}/addUser"
				style="color: white"><i class="fa fa-user-plus"
				style="font-size: 24px; color: #de4e4e"></i> Add user</a> 
				
			<a href="${pageContext.request.contextPath}/logout"
				style="color: white"><i class="fa fa-sign-out"
				style="font-size: 24px; color: #de4e4e" aria-hidden="true"></i>Logout</a>
			</div>	
				
			<div align="right">
				<a class="dropdown-item" href="?lang=en"> <img
					src="resources/img/united-kingdom.png" width="45" height="45"></a>
				&nbsp;&nbsp;&nbsp; <a class="dropdown-item" href="?lang=fr"> <img
					src="resources/img/france.png" width="45" height="45"></a>
			</div>
		</div>
	</header>
</template>

<script>
export default {
  name: 'Header',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

tr:nth-of-type(odd) {
	background-color: #fff;
}

tr:nth-of-type(even) {
	background-color: #ccc;
}

</style>
