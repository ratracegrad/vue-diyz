<template>
    <div style="padding: 20px 30px; width: 100%; margin: 0 auto; box-sizing: border-box;">
        <div class="square-wrapper">
            <div v-for="square in content" :key="square.id">
                <router-link :to="square.route" exact>
                    <div class="square-entry photo-content">
                        <img :src="square.image" />
                        <div class="detail">{{square.title}}</div>
                    </div>
                </router-link>
            </div>
        </div>

        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :is-full-page="true"></loading>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'GridComp',
    components: {
        Loading
    },
    props: ['content'],
    data() {
        return {
            currentPage: null,
            numPages: null,
            hasContent: false,
            isLoading: false
        };
    },
    methods: {}
};
</script>

<style scoped lang="scss">
.square-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 30px;
}
.square-entry {
    width: 396px;
    height: 222.75px;
    background-size: cover;
    margin: 2px;
}
.square-entry img {
    width: 100%;
    background-size: cover;
}
.photo-content {
    background-color: #ddd;
    position: relative;
    margin: 2px;
}
.photo-content > .detail {
    opacity: 1;
    position: absolute;
    color: black;
    bottom: 0;
    left: 0;
    right: 0;
    transition: opacity 0.1s;
    font-size: 16px;
    font-family: 'Roboto';
    font-weight: bold;
    text-transform: uppercase;
    padding: 30px 10px 10px 10px;
    line-height: 14px;
    background: -moz-linear-gradient(
        bottom,
        rgba(255, 255, 255, 0.9) 30%,
        rgba(255, 255, 255, 0) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
        bottom,
        rgba(255, 255, 255, 0.9) 30%,
        rgba(255, 255, 255, 0) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.9) 30%,
        rgba(255, 255, 255, 0) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff', GradientType=0 ); /* IE6-9 */
}
</style>
