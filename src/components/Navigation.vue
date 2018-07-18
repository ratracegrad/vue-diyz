<template>
    <div id="nav">
        <router-link to="/" exact><img src="../images/logo.png" /></router-link>
        <router-link to="/categories" exact>Categories</router-link>
        <router-link to="/browse" exact>Browse</router-link>
        <router-link to="/shop" exact>Shop</router-link>
        <router-link to="/blog" exact>Blog</router-link>
        <router-link to="/prochat" exact>Pro Chat</router-link>
        <router-link to="/about" exact>About Us</router-link>
        <router-link to="/contact" exact>Contact Us</router-link>
        <router-link to="/legal" exact>Legal</router-link>
    </div>
</template>

<script>
export default {
    name: 'Navigation'
};
</script>

<style lang="scss" >
</style>
