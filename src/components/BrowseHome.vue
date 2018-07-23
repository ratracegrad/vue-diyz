<template>
    <div>
        <HeaderCarousel></HeaderCarousel>
        <GridComp :content="projects"/>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import GridComp from '@/components/GridComp.vue';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import axios from 'axios';
import HeaderCarousel from './HeaderCarousel.vue';

export default {
    name: 'BrowseHome',
    components: {
        Loading,
        GridComp,
        HeaderCarousel
    },
    data() {
        return {
            projects: [],
            currentPage: null,
            numPages: null,
            hasTags: false,
            isLoading: false
        };
    },

    beforeMount() {
        this.getProjects();
    },
    methods: {
        formatUrlTitle(title) {
            title = title.trim();
            title = title.replace(/[:?!&']/g, '');
            return title.toLowerCase().replace(/\s/g, '-');
        },
        getProjects() {
            this.isLoading = true;
            axios
                .get(
                    'https://api.sbd-diyz-dev.com/content/dynamic/project_pages?page=1'
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
</style>
