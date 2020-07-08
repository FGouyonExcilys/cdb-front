<template>
  <div >
    <v-alert
      v-model="alert"
      dismissible
      type="success"
    >
      {{message}}
    </v-alert>

  </div>
</template>

<script>
  export default {
    
    props: {
          message: String,
    },
    
    data () {
      return {
        alert: true
      }
    },

    methods:{
        toto : function(){
            this.$emit('props',this.props);
        }

    }
  }
</script>