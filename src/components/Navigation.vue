<template>
    <div>
        <div id="drawer">
            <md-button class="md-icon-button" @click="showNavigation = !showNavigation">
                <md-icon>menu</md-icon>
            </md-button>
            <!--<icon name="bars" @click="showDialog = !showDialog"></icon>-->
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

        <md-drawer :md-active.sync="showNavigation" style="background-color: #ffd100;">
            <md-list style="background-color: #ffd100;">
                <md-list-item @click="changeRoutes('/')">
                    <span class="md-list-item-text">Home</span>
                </md-list-item>
                <md-list-item @click="changeRoutes('/category')">
                    <span class="md-list-item-text">Category</span>
                </md-list-item>
                <md-list-item @click="changeRoutes('/browse')">
                    <span class="md-list-item-text">Browse</span>
                </md-list-item>
                <md-list-item @click="changeRoutes('/shop')">
                    <span class="md-list-item-text">Shop</span>
                </md-list-item>
                <md-list-item @click="changeRoutes('/blog')">
                    <span class="md-list-item-text">Blog</span>
                </md-list-item>
                <md-list-item @click="changeRoutes('/pro-chat/pros')">
                    <span class="md-list-item-text">Pro Chat</span>
                </md-list-item>
                <md-list-item @click="changeRoutes('/about')">
                    <span class="md-list-item-text">About Us</span>
                </md-list-item>
                <md-list-item @click="changeRoutes('/contact')">
                    <span class="md-list-item-text">Contact Us</span>
                </md-list-item>
                <md-list-item @click="changeRoutes('/legal')">
                    <span class="md-list-item-text">Legal</span>
                </md-list-item>
            </md-list>
        </md-drawer>

    </div>
</template>

<script>
export default {
    name: 'Navigation',
    data() {
        return {
            showNavigation: false
        };
    },
    methods: {
        changeRoutes(path) {
            this.showNavigation = false;
            this.$router.push(path);
        }
    }
};
</script>

<style lang="scss" >
.md-list-item-text {
    border-bottom: 1px solid #efc100;
    color: #262624;
    font-weight: 400;
    min-height: 55px;
    font-size: 17px;
    cursor: pointer;
    padding: 0 16px;
    display: flex;
    justify-content: center;
}
</style>
