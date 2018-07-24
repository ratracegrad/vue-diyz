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
    name: 'ProjectHome',
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
            hasProjects: false,
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
                    'https://api.sbd-diyz-dev.com/content/static/landingpage/1'
                )
                .then(response => {
                    response.data.page.forEach(project => {
                        project.route =
                            '/project/' + this.formatUrlTitle(project.title);
                    });
                    this.projects = response.data.page;
                    this.currentPage = response.data.current_page;
                    this.numPages = response.data.num_of_pages;
                    this.hasProjects = true;
                    this.isLoading = false;
                })
                .catch(() => {
                    this.hasProjects = false;
                    this.isLoading = false;
                });
        }
    }
};
</script>

<style scoped lang="scss">
</style>
