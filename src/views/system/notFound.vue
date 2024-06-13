<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home Page</router-link>
  </div>
</template>

<script lang="ts" setup name="notFound">

</script>

<style lang="less" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.not-found h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.not-found a {
  font-size: 1rem;
  color: #42b983;
  text-decoration: none;
}
</style>
