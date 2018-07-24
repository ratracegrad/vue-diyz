<template>
    <div>
        <img src="../images/about-header.jpg" class="header-picture"
             v-bind:style="{ backgroundColor: 'lightgray', height: height, backgroundSize: 'cover' }" />
        <div class="team-wrapper">
            <h1 class="header">So who exactly is DIYZ<sup>®</sup>? Glad you asked! We’re a couple dozen wild-eyed makers that can hammer left, hammer right, and we never rest until the job is done.</h1>
            <div class="item-wrapper">
                <div class="container" v-for="item in teamList" :key="item.member_id">
                    <div class="team-entry">
                        <div class="left-content">
                            <img class="team-photo" v-bind:src="item.main_picture" />
                        </div>
                        <div class="right-content">
                            <div class="right-column">
                                <div class="team-name">
                                    {{item.first_name}}
                                </div>
                                <div class="team-title">
                                    {{item.job_title}}
                                </div>

                                <div class="team-about-wrapper">
                                    <div class="team-about">
                                        About
                                    </div>
                                    <icon name="chevron-down" class="more-button" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import setImageHeight from '../mixins/setImageHeight.js';

export default {
    name: 'AboutHome',
    mixins: [setImageHeight],
    data() {
        return {
            teamList: [],
            hasTeam: null,
            currentBatch: null,
            maxBatch: null,
            isLoading: false,
            page: 1
        };
    },
    created() {
        this.getTeam(1);
    },
    methods: {
        getTeam(page) {
            if (page === 1) {
                this.teamList = [];
            }

            axios
                .get(`https://api.sbd-diyz-dev.com/content/static/team/${page}`)
                .then(response => {
                    response = response.data;

                    if (response && response.page) {
                        this.isLoading = false;
                        this.hasTeam = response.page.length > 0;
                        this.currentBatch = response.current_page;
                        this.maxBatch = response.num_of_page;
                        response.page.forEach(team => {
                            this.teamList.push(team);
                        });
                    } else {
                        this.teamList = [];
                        this.hasTeam = false;
                    }
                });
        }
    }
};
</script>

<style scoped>
body {
    height: 100%;
}
.header-picture {
    width: 100%;
    margin: 0 auto;
    object-fit: cover;
}
.team-wrapper {
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
.more-button {
    height: 35px;
    width: 35px;
    color: #939199;
    padding-right: 8px;
}
.item-wrapper {
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
.container {
    width: 100%;
    max-width: 400px;
    margin: 10px;
    border: 1px solid rgb(227, 227, 227);
    cursor: pointer;
}
.team-entry {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 157px;
    background: rgba(247, 247, 247, 0.5);
}
.left-content,
.right-content {
    height: 100%;
    width: 100%;
}
.left-content {
    display: flex;
    align-items: center;
    min-width: 152px;
    max-width: 152px;
    padding-left: 10px;
}
.right-column {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.team-photo {
    width: 137px;
    height: 137px;
    background-size: cover;
    display: block;
}
.team-name {
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    padding-top: 15px;
    padding-right: 15px;
    color: rgb(38, 38, 36);
}
.team-title {
    color: rgb(66, 66, 66);
    font-size: 15px;
    line-height: 18px;
    padding-right: 15px;
}
.team-about-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top: auto;
    font-weight: bold;
}
.team-about {
    color: rgb(66, 66, 66);
    font-weight: normal;
    font-size: 16px;
    line-height: 40px;
}

@media screen and (max-width: 620px) {
    .team-wrapper {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
    }
}
</style>
