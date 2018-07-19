<template>
    <div>
        <GridComp :content="tags"/>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import GridComp from '@/components/GridComp.vue';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import axios from 'axios';

export default {
    name: 'CategoryHome',
    components: {
        Loading,
        GridComp
    },
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
        formatUrlTitle(title) {
            title = title.trim();
            title = title.replace(/[:?!&']/g, '');
            return title.toLowerCase().replace(/\s/g, '-');
        },
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
