<template>
  <div>
      <h4>Login</h4>
    <SignInForm />
  </div>
</template>

<script>

import SignInForm from '@/components/SignInForm.vue';

export default {
  name: "Login",
  components: { SignInForm },
};
</script> 