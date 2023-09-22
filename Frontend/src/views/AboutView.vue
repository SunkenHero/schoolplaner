<template>
  <div class="menu-screen">
    <div class="about">
      <h1 class="header">About Page</h1>
      <hr class="separator">
      <p class="github"><a href="https://github.com/SunkenHero/schoolplaner/tree/main">Github</a></p>
      <p class="authors">Yuki - Backend Developer</p>
      <p class="authors">Tobias - Frontend Developer, Designer</p>
    </div>
  </div>
</template>

<style>

.menu-screen {
  margin-top: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.about {
  width: 600px;
  height: 300px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background-mute);
  box-shadow: 0px 5px 10px 6px rgba(0, 0, 0, 0.5);
}

.header {
  font-size: 40px;
  font-weight: 600;
}

.separator {
  width: 50%;
  border: none;
  border-top: 2px solid var(--color-border);
  margin: 10px 0px 20px 0px;
}

.github{
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.authors{
  display: flex;
  justify-content: center;
}

</style>