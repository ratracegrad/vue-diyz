<template>
    <div>
        <img src="../images/contact-header.jpg" class="header-picture"
             v-bind:style="{ backgroundColor: 'lightgray', height: height, backgroundSize: 'cover' }" />
        <div class="press-wrapper">
            <h1 class="header">DIYZ<sup>®</sup> is revolutionizing the way
                the world
                tackles
                DIY projects, and that can turn more than just a few heads.
                Make sure you check out the latest and greatest news
                featuring DIYZ<sup>®</sup>!
            </h1>
            <h2>For press inquiries contact:
                <a href="mailto:media@diyz.com">media@diyz.com</a>
            </h2>
            <div class="item-wrapper" v-show="hasPress">
                <div style="display: flex; flex-wrap: wrap;">
                    <div v-for="item in pressList" :key="item.index">
                        <div class="large-wrapper">
                            <div class="item-entry">
                                <div class="press-date">
                                    {{formatDate(item.date)}}</div>
                                <div class="press-title">
                                    {{item.title}}
                                </div>
                                <div class="press-publisher">
                                    {{item.publisher}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="!hasPress" class="no-items">
                No Press Items Found!
            </div>

            <loading :active.sync="isLoading"
                     :can-cancel="true"
                     :is-full-page="true"></loading>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import setImageHeight from '../mixins/setImageHeight.js';
import formatDate from '../mixins/formatDate.js';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'AboutPress',
    components: {
        Loading
    },
    mixins: [setImageHeight, formatDate],
    data() {
        return {
            pressList: [],
            hasPress: true,
            currentBatch: null,
            maxBatch: null,
            isLoading: false,
            page: 1
        };
    },
    mounted() {
        this.getPress(1);
    },
    methods: {
        getPress(page) {
            if (page === 1) {
                this.pressList = [];
            }

            axios
                .get(
                    `https://api.sbd-diyz-dev.com/content/static/press/${page}`
                )
                .then(response => {
                    response = response.data;

                    if (response && response.page) {
                        this.isLoading = false;
                        this.hasPress = response.page.length > 0;
                        this.currentBatch = response.current_page;
                        this.maxBatch = response.num_of_page;
                        response.page.forEach(team => {
                            this.pressList.push(team);
                        });
                    } else {
                        this.pressList = [];
                        this.hasPress = false;
                    }
                });
        }
    }
};
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}
.header-picture {
    width: 100%;
    margin: 0 auto;
    object-fit: cover;
}
.press-wrapper {
    max-width: 1440px;
    margin: 20px auto;
    padding: 0 30px;
}
.header {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    line-height: 20px;
    text-align: center;
    padding: 0 25px;
    margin-top: 20px;
    margin-bottom: 25px;
    font-weight: normal;
}
h2 {
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    padding: 0 25px;
    margin: 20px 0 25px;
}
.item-wrapper {
    padding: 0 10px;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    text-align: center;
}
.item-entry {
    border-bottom: 1px solid rgb(227, 227, 227);
    display: flex;
    flex-direction: column;
    width: 220px;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.press-date {
    font-size: 12px;
    color: #939199;
    line-height: 18px;
}
.press-title {
    font-size: 15px;
    line-height: 20px;
    font-weight: bold;
    height: 40px;
    overflow: hidden;
    margin: 0 10px;
    color: #0ab8e2;
    text-decoration: none;
    cursor: pointer;
}
.press-publisher {
    font-size: 13px;
    padding-top: 10px;
}
a {
    color: #0ab8e2;
    text-decoration: none;
}
.not-ready {
    padding-bottom: 25px;
}
.no-items {
    margin-top: 150px;
    font-family: 'Roboto-Bold', sans-serif;
    font-size: 17px;
    text-align: center;
}
.large-wrapper {
    /*width: 100%;*/
    margin-right: 30px;
    height: 160px;
    max-height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 620px) {
    .press-wrapper {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
    }
}
</style>
