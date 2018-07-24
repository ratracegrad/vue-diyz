<template>
    <div>
        <HeaderCarousel></HeaderCarousel>
        <div class="browseTag" v-show="categoryTag" > <span class="bold">Browse</span> {{categoryTag}}</div>
        <GridComp :content="projects"/>
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
    name: 'BrowseHome',
    components: {
        Loading,
        GridComp,
        HeaderCarousel
    },
    mixins: [formatUrlTitle],
    data() {
        return {
            projects: [],
            currentPage: null,
            numPages: null,
            hasTags: false,
            isLoading: false,
            categoryTag: this.$route.params.id
        };
    },

    beforeMount() {
        this.getProjects();
    },
    methods: {
        getProjects() {
            this.isLoading = true;

            this.categoryTag = this.categoryTag ? this.categoryTag : '';
            axios
                .get(
                    `https://api.sbd-diyz-dev.com/content/dynamic/project_pages?page=1&tag=${
                        this.categoryTag
                    }`
                )
                .then(response => {
                    response.data.projects.forEach(project => {
                        project.route =
                            '/project/' + this.formatUrlTitle(project.title);
                    });
                    this.projects = response.data.projects;
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
.browseTag {
    padding-top: 30px;
    text-align: center;
    font-size: 28px;
}
.bold {
    font-weight: bold;
}
</style>
