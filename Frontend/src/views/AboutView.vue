import { Text } from 'vue';

<template>
  <div class="about">
    <pre>
      <h1 class="header">About Page</h1>
      <p class="github"><a href="https://github.com/SunkenHero/schoolplaner/tree/main">Github</a></p>
    </pre>
  </div>
</template>

<style>

.about {
  display:flex;
  justify-content: center;
}

.header {
  font-size: 40px;
}

.github{
  font-size: 15px;
}

</style>