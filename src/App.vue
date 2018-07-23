<template>
    <div id="app">
        <app-navigation></app-navigation>
        <router-view/>
    </div>
</template>

<script>
import Navigation from './components/Navigation';

export default {
    components: {
        'app-navigation': Navigation
    }
};
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    background: white;
}
#app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#nav {
    display: flex;
    align-items: center;
    padding: 0 30px;
    height: 50px;
    line-height: 50px;
    color: black;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    font-size: 15px;
    border-bottom: 1px solid rgb(231, 231, 231);
    a {
        display: flex;
        align-items: center;
        color: black;
        text-decoration: none;
        margin: 0 10px;
    }
    .router-link-active {
        font-weight: 400;
    }
    img {
        max-height: 40px;
    }
}
@media screen and (max-width: 620px) {
    #nav {
        display: none;
    }
    #drawer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid rgb(231, 231, 231);
        padding: 0 15px;
    }
    img {
        max-height: 40px;
    }
}
@media screen and (min-width: 621px) {
    #drawer {
        display: none;
    }
}
</style>
