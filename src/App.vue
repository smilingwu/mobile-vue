<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
    </div>-->
    <router-view/>
  </div>
</template>

<style lang="less">
* {
    box-sizing: border-box;
    font-family: PingFangSC-Regular, Arial, Helvetica, sans-serif;
    font-weight: 400;
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
}
img {
    max-width: 100%;
}
</style>
