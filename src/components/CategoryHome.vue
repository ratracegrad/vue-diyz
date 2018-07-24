<template>
    <div>
        <HeaderCarousel></HeaderCarousel>
        <GridComp :content="tags"/>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import GridComp from '@/components/GridComp.vue';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import axios from 'axios';
import HeaderCarousel from './HeaderCarousel.vue';
import formatUrlTitle from '../mixins/formatUrlTitle.js';

export default {
    name: 'CategoryHome',
    components: {
        Loading,
        GridComp,
        HeaderCarousel
    },
    mixins: [formatUrlTitle],
    data() {
        return {
            tags: [],
            currentPage: null,
            numPages: null,
            hasTags: false,
            isLoading: false
        };
    },
    beforeMount() {
        this.getTags();
    },
    methods: {
        getTags() {
            this.isLoading = true;
            axios
                .get('https://api.sbd-diyz-dev.com/content/static/tag_pages/1')
                .then(response => {
                    response.data.page.forEach(tag => {
                        tag.route =
                            '/category/' + this.formatUrlTitle(tag.title);
                    });
                    this.tags = response.data.page;
                    this.currentPage = response.data.current_page;
                    this.numPages = response.data.num_of_pages;
                    this.hasTags = true;
                    this.isLoading = false;
                })
                .catch(() => {
                    this.hasTags = false;
                    this.isLoading = false;
                });
        }
    }
};
</script>

<style scoped lang="scss">
</style>
