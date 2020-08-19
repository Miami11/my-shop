<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <main role="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from "./Header";
import Alert from "../AlertMessage";
export default { components: { Header, Alert } };
</script>
