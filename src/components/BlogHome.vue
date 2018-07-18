<template>
    <div class="blog-outer-wrapper">
        <h1 class="header" v-show="hasBlog">Get inspired to DIY with
            tips, tricks and other ideas that will help you
            turn your house into a home.</h1>
        <div v-show="!hasBlog" class="no-blog-posts">
            No Blog Posts Found!
        </div>
        <div class="wrapper">
            <div v-for="item in blogList" :key="item.blog_id">
                <div class="large-item-wrapper">
                    <div class="item"  v-on:click="showBlog(item.titleId)">
                        <img v-bind:src="item.thumbnail" class="blog-thumbnail"/>
                        <div class="blog-wrapper">
                            <div class="blog-date">{{item.date}} - {{item.author}}</div>
                            <div class="blog-title">{{item.title}}</div>
                            <div class="blog-clip">{{item.bodyText}}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'BlogHome',
    data() {
        return {
            blogList: [],
            currentBatch: null,
            maxBatch: null,
            isLoading: false,
            hasBlog: false
        };
    },
    mounted() {
        axios
            .get(
                'https://api.sbd-diyz-dev.com/content/dynamic/searchBlogs?page=1'
            )
            .then(response => {
                response = response.data;

                if (response && response.products) {
                    this.isLoading = false;
                    this.hasBlog = response.products.length > 0;
                    this.currentBatch = response.current_batch;
                    this.maxBatch = response.num_of_batches;

                    let _cleanBody = parts => {
                        for (let i = 0; i < parts.length; i++) {
                            if (parts[i]['text'] !== null) {
                                return parts[i].text
                                    .replace(/<\/?[^>]+(>|$)/g, '')
                                    .replace(/&nbsp;/gi, ' ');
                            }
                        }
                    };

                    let _formatDate = dt => {
                        let arr = dt.split('-');
                        return arr[1] + '/' + arr[2] + '/' + arr[0];
                    };

                    response.products.forEach(x => {
                        x.thumbnail = x.thumbnail.replace(/\s/g, '%20');
                        x['bodyText'] = _cleanBody(x.body_parts);
                        x.author = x.author || 'DIYZ';
                        x.date = _formatDate(x.date);

                        if (!this.blogList.includes(x)) {
                            this.blogList.push(x);
                        }
                    });
                } else {
                    this.set('blogList', []);
                    this.hasBlog = false;
                }
            })
            .catch(() => {
                this.hasBlog = false;
            });
    },
    methods: {
        showBlog(title) {
            this.$router.push(`/blog/${title}`);
        }
    }
};
</script>

<style scoped>
.blog-outer-wrapper {
    padding: 0 30px;
}
.wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
}
.no-blog-posts {
    margin-top: 150px;
    font-family: 'Roboto-Bold', sans-serif;
    font-size: 17px;
    text-align: center;
    height: 100%;
}
.header {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    line-height: 20px;
    text-align: center;
    padding: 0 25px;
    margin: 20px 0;
    font-weight: normal;
}
.item {
    display: block;
    padding: 20px 0 35px 0;
    border-bottom: 1px solid rgb(231, 231, 231);
    cursor: pointer;
    margin: 0 20px 20px 0;
}
.blog-thumbnail {
    width: 106px;
    height: 106px;
    float: left;
}
.blog-wrapper {
    display: flex;
    flex-direction: column;
    padding-left: 18px;
}
.blog-date {
    font-size: 11px;
    color: rgb(92, 92, 92);
}
.blog-title {
    font-size: 14px;
    font-weight: bold;
    line-height: 17px;
    height: 34px;
    margin: 3px 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.blog-clip {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 12px;
    line-height: 1.2em;
    height: 30px;
    overflow: hidden;
}
.large-item-wrapper {
    max-width: 400px;
}
@media all and (min-width: 0px) and (max-width: 620px) {
    .blog-outer-wrapper {
        padding: 0;
    }
    .item {
        margin: 0;
    }
    .large-screen {
        display: none;
    }

    .large-item-wrapper {
        width: 100%;
        padding: 0 15px;
        /*margin-bottom: 90px;*/
    }
}

@media all and (min-width: 621px) and (max-width: 671px) {
    .large-item-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 15px;
    }
}
</style>
