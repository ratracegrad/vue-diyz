<template>
    <div class="project-wrapper">
        <div class="left-side">
            <div class="left-wrapper">
                <div class="video-wrapper">
                    <div class="sixteen-nine">
                        <template v-if="project.hasVideo">
                            <video-player class="content" :options='options'></video-player>
                        </template>
                        <template v-if="!project.hasVideo">
                            <img class="content" src="../images/no_image.png"  />
                        </template>
                    </div>
                </div>
            </div>
            <div class="icon-wrapper" style="color: #939199;">
                <div class="like-wrapper">
                    <icon name="thumbs-up" class="like-icon" /> <span style="padding-left: 3px;">3</span>
                </div>
                <icon name="star" class="like-icon"/>
                <icon name="share-alt" class="like-icon" />
            </div>
            <h1 class="project-title">{{project.title}}</h1>
            <div class="project-descr" v-show="project.main_description == null">{{project.description}}</div>
            <div class="project-descr" v-show="project.main_description !== null" v-html="descrHTML"></div>
            <div class="see-more">Show More</div>
            <div class="line"></div>
            <img src="../images/banner_ad.png" class="project-add" id="banner-large"/>
            <img src="../images/banner_ad_small.png" class="project-add" id="banner-small"/>
            <div class="line"></div>
            <div class="ugc-header-wrapper">
                <div class="community-header-wrap">
                    <h2 class="community-header">OUR COMMUNITY:</h2>
                    <span class="flex"></span>
                    <icon name="user-plus" class="ugc-comment" />
                    <icon name="chevron-down" class="ugc-button" />
                </div>
                <p class="community-subheader">Join the conversation - {{project.title}}</p>
            </div>
            <div v-show="communityExpanded">
                <div v-show="hasCommunity">
                    <div v-for="item in communityList" :key="item.index">
                        <div class="full-width">
                            <div class="ugc-wrapper">
                                <div class="community-entry">
                                    <img src="../images/no_image.png" />
                                    <div class="community-detail">
                                        <div class="community-title">{{item.title}}</div>
                                        <div class="community-author">{{item.userName}}</div>
                                        <div class="community-date">{{item.postedOn}}</div>
                                        <div class="community-descr">{{item.body}}</div>
                                    </div>
                                    <icon name="chevron-down" class="community-more-button" />
                                </div>
                            </div>
                            <div class="spacer" style="background: white;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!hasCommunity" class="noCommunityTitle">
                Be the first to contribute by clicking the + button above!
            </div>
        </div>
        <div class="right-side">
            <div class="right-wrapper">
                <h1 class="related-header">related projects</h1>
                <div v-for="item in project.related_project" :key="item.project_id" v-on:click="showRelated(item.titleId)">
                    <div class="right-list-wrap">
                        <div class="related-wrapper">
                            <div class="related-image-wrapper">
                                <div class="sixteen-nine">
                                    <img v-bind:src="item.image" class="content"/>
                                </div>
                            </div>
                            <div class="related-detail-wrapper">
                                <div class="related-title">{{item.title}}</div>
                                <div class="related-descr">{{item.description}}</div>
                            </div>
                        </div>
                        <div class="spacer"></div>
                    </div>
                </div>
            </div>
        </div>

        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :is-full-page="true"></loading>
    </div>
</template>

<script>
import axios from 'axios';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'ProjectDetail',
    components: {
        videoPlayer,
        Loading
    },
    data() {
        return {
            id: this.$route.params.id,
            project: {},
            communityList: [],
            isLoading: false,
            hasCommunity: false,
            currentBatch: null,
            maxBatch: null,
            communityExpanded: true
        };
    },
    computed: {
        options: function() {
            if (this.project && this.project.video) {
                return {
                    sources: [
                        {
                            type: this.project.video.filemime,
                            src: this.project.video.path
                        }
                    ],
                    poster: this.project.image.path
                };
            }
            return '';
        },
        descrHTML: function() {
            if (this.project && this.project.main_description) {
                return this.project.main_description;
            }
            return '';
        },
        hasMainDescription: function() {
            return (
                this.project.main_description !== undefined &&
                this.project.main_description !== null
            );
        }
    },
    watch: {
        '$route.params'() {
            this.id = this.$route.params.id;
            this.reset();
            this.getProject();
            this.getCommunity();
        }
    },
    mounted() {
        this.reset();
        this.getProject();
        this.getCommunity();
    },
    methods: {
        showRelated(title) {
            this.$router.push(`/project/${title}`);
        },
        getProject() {
            this.isLoading = true;
            axios
                .get(
                    `https://api.sbd-diyz-dev.com/content/dynamic/getProjectInfo/${
                        this.id
                    }`
                )
                .then(response => {
                    this.project = response.data;
                    this.isLoading = false;
                })
                .catch(() => {
                    this.isLoading = false;
                });
        },
        getCommunity() {
            axios
                .get(
                    `https://api.diyz.com/community/retrieve/${this.id}?page=1`
                )
                .then(response => {
                    response = response.data;
                    if (response && response.posts) {
                        this.hasCommunity = response.posts.length > 0;
                        this.currentBatch = response.current_batch;
                        this.maxBatch = response.num_of_batches;

                        response.posts.forEach(item => {
                            if (!this.communityList.includes(item)) {
                                this.communityList.push(item);
                            }
                        });
                    } else {
                        this.communityList = [];
                        this.hasCommunity = false;
                    }
                });
        },
        reset() {
            this.project = {};
            this.communityList = [];
            this.hasCommunity = false;
            this.currentBatch = null;
            this.maxBatch = null;
        }
    }
};
</script>

<style scoped>
.project-wrapper {
    display: flex;
    flex-direction: row;
    max-width: 1440px;
    margin: 0 auto;
}
.left-side {
    flex: 2;
    padding: 30px;
}
.right-side {
    flex: 1;
    background: #f6f6f6;
}
.left-wrapper {
    display: flex;
    flex-direction: column;
}
.right-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
#banner-large,
#banner-small,
.see-more,
.like-wrapper,
.share-star,
.ugc-comment,
.share-project {
    cursor: pointer;
}

/*  image resize to 16/9 ratio mixin */
.sixteen-nine {
    position: relative;
    overflow: hidden;
    width: 100%;
}
.sixteen-nine:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: 56.25%;
}
.sixteen-nine > .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
}

/* project styling */
.video-wrapper {
    width: 100%;
}
.icon-wrapper {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.project-title {
    font-family: 'Poppins', sans-serif;
    color: #262624;
    font-size: 26px;
    text-transform: uppercase;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
}
.project-descr {
    font-size: 15px;
    line-height: 19px;
    height: 55px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.project-descr-no-clamp {
    -webkit-line-clamp: unset;
    overflow: visible;
}
.see-more {
    color: #0ab8e2;
    font-size: 15px;
    line-height: 28px;
    margin-bottom: 16px;
}
.like-wrapper {
    display: flex;
    align-items: center;
}
.like-icon {
    width: 24px;
    height: 24px;
    padding-left: 5px;
}
.line {
    height: 1px;
    width: 100%;
    border: 1px solid #e7e7e7;
    margin-bottom: 11px;
}
.project-add {
    height: 60px;
    width: 100%;
    margin-bottom: 13px;
}
.ugc-comment {
    margin-left: auto;
    margin-right: 45px;
    height: 35px;
    width: 35px;
}
.ugc-button {
    color: #939199;
    width: 35px;
    height: 35px;
    margin-right: 16px;
}
.ugc-header-wrapper {
    margin-top: 21px;
    display: flex;
    flex-direction: column;
}
.community-header-wrap {
    display: flex;
    justify-content: center;
    /*@apply --layout-horizontal;*/
    /*@apply --layout-center;*/
}
.community-header {
    color: #262624;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    font-size: 26px;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    height: 29px;
    line-height: 29px;
}
.community-subheader {
    color: #262624;
    font-size: 14px;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    margin: 5px 0 18px 0;
}
.ugc-wrapper {
    border: 1px solid #e7e7e7;
    background-color: #f6f6f6;
    padding: 15px;
}
.full-width {
    width: 100%;
}
.community-entry {
    display: flex;
    align-items: center;
}
.community-entry > img,
.progressive-image {
    width: 211px;
    height: 119px;
}
.community-detail {
    margin-left: 10px;
    display: flex;
    flex: 1;
    flex-direction: column;
}
.community-title {
    height: 21px;
    color: #262624;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.07px;
    line-height: 21px;
    overflow: hidden;
}
.community-author {
    height: 19px;
    color: #262624;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: -0.05px;
    line-height: 19px;
    overflow: hidden;
}
.community-date {
    height: 15px;
    color: #939199;
    font-size: 11px;
    letter-spacing: -0.03px;
    line-height: 15px;
    overflow: hidden;
}
.community-descr {
    height: 36px;
    color: #262624;
    font-size: 14px;
    line-height: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* styling for Related Projects */
.related-header {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    line-height: 29px;
    text-transform: uppercase;
    padding: 30px 15px 8px;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
}
.right-list-wrap {
    display: flex;
    flex-direction: column;
    overflow-y: inherit !important;
    background: #f6f6f6;
    padding: 0 15px;
    width: 100%;
    box-sizing: border-box;
}
.related-wrapper {
    display: flex;
    width: 100%;
}
.related-image-wrapper {
    width: 36.45%;
    display: flex;
}
.related-detail-wrapper {
    width: 50%;
    margin-left: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.related-title {
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: 'Roboto-Bold', sans-serif;
}
.related-descr {
    font-size: 14px;
    line-height: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 54px;
    overflow: hidden;
}
.community-more-button {
    height: 35px;
    width: 35px;
    color: #939199;
}

/*  Community (UGC) styling */
.noCommunityTitle {
    font-family: 'Roboto-Bold', sans-serif;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    margin: 30px 0;
}

.spacer {
    height: 20px;
    width: 100%;
}

@media screen and (max-width: 800px) {
    .project-wrapper {
        display: flex;
        flex-direction: column;
    }
    .left-side,
    .right-side {
        padding: 15px;
    }

    .related-wrapper {
        display: flex;
    }
    .related-header {
        padding: 15px 0;
    }
    .right-list-wrap {
        padding: 0;
    }
    .spacer {
        height: 20px;
        width: 100%;
    }
}
@media screen and (max-width: 1200px) {
    .left-side {
        flex: 1;
    }
    .related-descr {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 36px;
        overflow: hidden;
    }
    #banner-large {
        display: none;
    }
}
@media screen and (min-width: 1201px) {
    #banner-small {
        display: none;
    }
}
</style>
