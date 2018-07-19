<template>
    <div>
        <SquaresComp :content="projects"/>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import SquaresComp from '@/components/SquaresComp.vue';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import axios from 'axios';

export default {
    name: 'ProjectHome',
    components: {
        Loading,
        SquaresComp
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
        showProject(title) {
            let urlTitle = this.formatUrlTitle(title);
            this.$router.push(`/project/${urlTitle}`);
        },
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
                    this.projects = response.data.page;
                    response.data.page.forEach(project => {
                        project.route =
                            '/project/' + this.formatUrlTitle(project.title);
                    });
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
