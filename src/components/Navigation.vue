<template>
    <div>
        <div id="drawer">
            <icon name="bars"></icon>
            <img src="../images/logo.png" />
            <div></div>
        </div>
        <div id="nav">
            <router-link to="/" exact><img src="../images/logo.png" /></router-link>
            <router-link to="/category" exact>Category</router-link>
            <router-link to="/browse" exact>Browse</router-link>
            <router-link to="/shop" exact>Shop</router-link>
            <router-link to="/blog" exact>Blog</router-link>
            <router-link to="/pro-chat/pros" exact>Pro Chat</router-link>
            <router-link to="/about" exact>About Us</router-link>
            <router-link to="/contact" exact>Contact Us</router-link>
            <router-link to="/legal" exact>Legal</router-link>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Navigation'
};
</script>

<style lang="scss" >

</style>
