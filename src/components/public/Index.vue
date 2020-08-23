<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <main role="main">
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Alert from "../AlertMessage";
import Footer from "./Footer";
export default { components: { Header, Alert, Footer } };
</script>
