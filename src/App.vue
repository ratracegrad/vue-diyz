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
    },
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'DIYZ',
        // all titles will be injected into this template
        titleTemplate: '%s | Vue DIYZ',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'description',
                content: 'demonstration of DIYZ created using Vue'
            }
        ]
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
    font-size: 16px;
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
@media screen and (max-width: 800px) {
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
    #drawer img {
        max-height: 40px;
    }
}
@media screen and (min-width: 801px) {
    #drawer {
        display: none;
    }
}
</style>
