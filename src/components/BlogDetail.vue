<template>
    <div>
        <div v-show="hasDetail">
            <div v-show="hasParts">
                <img v-bind:src="blogSelected.header_image" class="header-picture"
                     v-bind:style="{ backgroundColor: 'lightgray', height: height, backgroundSize: 'cover' }" />
                <div class="detail-wrapper">
                    <div class="blog-date">
                        {{formatDate(blogSelected.date)}}</div>
                    <div class="blog-title">{{blogSelected.title}}</div>
                    <div class="blog-author">
                        {{getAuthor(blogSelected.author)}}
                    </div>

                    <div v-for="item in blogSelected.body_parts" :key="item.index">
                        <div class="blog-parts-title">{{item.title}}</div>
                        <div class="blog-text" v-html="item.text"></div>

                        <div class="video" v-show="hasVideo(item.body_video)">
                            <video-player class="main-poster-image" v-show="hasVideo(item.body_video)"
                                          :options="setVideoOptions(item.body_video, item.body_image)"></video-player>


                        </div>
                        <img v-bind:src="item.body_image" v-show="!hasVideo(item.body_video)" />

                        <span class="internal-link">{{item.link_title}}</span>
                    </div>

                </div>
            </div>
            <div v-show="!hasParts">
                <img v-bind:src="blogSelected.header_image" class="header-picture" :style="{backgroundColor: 'lightgray', height: height}"/>
                <div class="detail-wrapper">
                    <div class="blog-date">
                        {{formatDate(blogSelected.date)}}</div>
                    <div class="blog-title">{{blogSelected.title}}</div>
                    <div class="blog-author">
                        {{getAuthor(blogSelected.author)}}
                    </div>

                    <div class="blog-text" v-html="blogSelected.body"></div>
                </div>

            </div>
        </div>

        <div v-show="!hasDetail">
            <div class="no-details">Unable to load blog details.<br> Please
                try again later.</div>
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
import formatDate from '../mixins/formatDate.js';
import setImageHeight from '../mixins/setImageHeight.js';

export default {
    name: 'BlogDetail',
    components: {
        videoPlayer,
        Loading
    },
    mixins: [formatDate, setImageHeight],
    data() {
        return {
            id: this.$route.params.id,
            blogSelected: {},
            hasDetail: true,
            hasParts: false,
            isLoading: false
        };
    },
    computed: {
        options: function() {
            return {
                sources: [
                    {
                        src: this.blogSelected.body_video
                    }
                ],
                poster: this.blogSelected.body_image
            };
        }
    },
    mounted() {
        this.getBlogs();
    },
    methods: {
        getBlogs() {
            this.isLoading = true;
            axios
                .get(
                    `https://api.sbd-diyz-dev.com/content/dynamic/searchBlogs/${
                        this.id
                    }`
                )
                .then(response => {
                    response = response.data;
                    if (response && response.body_parts) {
                        this.hasParts = true;
                    }

                    if (response) {
                        this.blogSelected = response;
                    }

                    this.hasDetail = true;
                    this.isLoading = false;
                })
                .catch(() => {
                    this.hasDetail = false;
                    this.isLoading = false;
                });
        },
        getAuthor(author) {
            if (author !== undefined) {
                return author ? `By ${author}` : 'By DIYZ';
            }
        },
        hasVideo: function(item) {
            return !(item === null || item === undefined);
        },
        setVideoOptions(src, poster) {
            if (src) {
                return {
                    sources: [
                        {
                            type: 'video/mp4',
                            src: src
                        }
                    ],
                    poster: poster
                };
            }
            return {};
        }
    }
};
</script>

<style scoped>
.header-picture {
    width: 100%;
    margin: 0 auto;
    object-fit: cover;
}
.detail-wrapper {
    margin: 0 15px;
}
.detail-wrapper img {
    width: 100%;
}
.blog-date {
    font-size: 16px;
    line-height: 23px;
    color: rgb(92, 92, 92);
    text-align: center;
}
.blog-title {
    font-size: 17px;
    font-weight: bold;
    line-height: 23px;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
}
.blog-parts-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 23px;
    max-width: 900px;
    margin: 0 auto;
}
.blog-author {
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    color: #939199;
    text-align: center;
}
.blog-text {
    font-size: 16px;
    line-height: 20px;
    max-width: 900px;
    margin: 0 auto;
}
.internal-link {
    display: block;
    margin: 0 auto 20px;
    cursor: pointer;
    color: #0000ee;
    font-size: 16px;
}

a.blog-text {
    display: block;
    margin: 0 auto 20px;
}
.blog-text img {
    width: 100%;
    height: calc(900vw / 16);
    max-width: 985px;
    max-height: 500px;
    margin: 0 auto;
    background-size: contain;
}
.no-details {
    font-family: 'Roboto-Bold', sans-serif;
    font-size: 15px;
    text-align: center;
    margin: 40px;
}
video-player,
.main-poster-image {
    width: 100%;
    height: auto;
    position: relative;
}
.video {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

@media all and (min-width: 620px) {
    .detail-wrapper {
        margin: 0 auto;
        max-width: 900px;
        padding: 0 30px;
    }
}
</style>
