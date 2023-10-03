<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <text class="title">Schulplaner</text>
    <nav class="nav">
      <div class="navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
      <div class="profile">
            <RouterLink to="/logout">Logout</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
      </div>
    </nav>
  </div>
  <RouterView/>
</template>

<style>

.nav {
  justify-content: space-between;
  display:flex;
  flex-direction: row;
  width: 100%;
}

.container {
  display: flex;
  align-items: center;
  width: 100%;
  user-select: none;
}

.title {
  font-size: 30px;
  font-weight: 550;
  margin-right: 10px;
}

.navigation {
  font-size: 20px;
  margin-top: 2rem;
  height: 60px;
}

.navigation .router-link-exact-active {
  color: var(--color-text);
}

.navigation .router-link-exact-active:hover {
  background-color: transparent;
}

.navigation a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

.navigation a:first-of-type {
  border: 0;
}

.profile{
  font-size: 20px;
  margin-top: 2rem;
  height: 60px;
}

.profile .router-link-exact-active {
  color: var(--color-text);
}

.profile .router-link-exact-active:hover {
  background-color: transparent;
}

.profile a {
  display: inline-block;
  padding: 0 1rem;
}

</style>