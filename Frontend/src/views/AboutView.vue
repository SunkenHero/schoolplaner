import { Text } from 'vue';

<template>
  <div class="about">
    <pre>
      <h1>About Page</h1>
      <Text>Hello</Text>
    </pre>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>