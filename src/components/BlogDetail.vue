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

                    <div v-for="item in blogSelected.body_parts">
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
                <img v-bind:src="blogSelected.header_image" class="header-picture" :style="[backgroundColor, height]"/>
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
    </div>
</template>

<script>
import axios from 'axios';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

export default {
    name: 'BlogDetail',
    components: {
        videoPlayer
    },
    data() {
        return {
            id: this.$route.params.id,
            blogSelected: {},
            hasDetail: false,
            hasParts: false,
            backgroundColor: 'lightgray',
            height: this.setImageHeight()
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
        axios
            .get(`https://api.diyz.com/content/dynamic/searchBlogs/${this.id}`)
            .then(response => {
                response = response.data;
                if (response && response.body_parts) {
                    this.hasParts = true;
                }

                if (response) {
                    this.blogSelected = response;
                }

                this.hasDetail = true;
            })
            .catch(() => {
                this.hasDetail = false;
            });
    },
    methods: {
        formatDate(dt) {
            if (dt) {
                let arr = dt.split('-');
                return arr[1] + '/' + arr[2] + '/' + arr[0];
            }
        },
        getAuthor(author) {
            if (author !== undefined) {
                return author ? `By ${author}` : 'By DIYZ';
            }
        },
        hasVideo: function(item) {
            return !(item === null || item === undefined);
            // return item && item !== null && item !== undefined;
        },
        setImageHeight() {
            console.log('setImageHeight', window.innerWidth);
            if (window.innerWidth <= 620) {
                return (Math.round(window.innerWidth) * 9) / 16 + 'px';
            } else if (window.innerWidth >= 1060) {
                return '450px';
            } else if (this.querySelector('.header-picture')) {
                return (
                    (Math.round(
                        this.querySelector('.header-picture').offsetWidth
                    ) *
                        9) /
                        16 +
                    'px'
                );
            }
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
.detail-picture {
    width: 100%;
    max-width: 900px;
    margin: 10px auto;
    object-fit: cover;
    display: inherit;
}
.detail-wrapper {
    margin: 0 15px;
}
.detail-wrapper img {
    width: 100%;
}
.blog-date {
    font-size: 12px;
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
    font-size: 15px;
    font-weight: bold;
    line-height: 23px;
    max-width: 900px;
    margin: 0 auto;
}
.blog-author {
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    color: #939199;
    text-align: center;
}
.blog-text {
    font-size: 13px;
    line-height: 18px;
    max-width: 900px;
    margin: 0 auto;
}
.internal-link {
    display: block;
    margin: 0 auto 20px;
    cursor: pointer;
    color: #0000ee;
    font-size: 13px;
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
