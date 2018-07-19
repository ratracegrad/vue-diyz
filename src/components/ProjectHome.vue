<template>
    <div style="padding: 20px 30px; width: 100%; margin: 0 auto; box-sizing: border-box;">
        <div class="project-wrapper">
            <div v-for="project in projects" :key="project.id">
                <div v-if="project.type === 'projects'" class="project-entry" v-on:click="showProject(project.title)">
                    <img :src="project.image" />
                </div>
            </div>
        </div>

        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :on-cancel="whenCancelled"
                 :is-full-page="true"></loading>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import axios from 'axios';

export default {
    name: 'ProjectHome',
    components: {
        Loading
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

    mounted() {
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
.project-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 30px;
}
.project-entry {
    width: 396px;
    height: 222.75px;
    background-size: cover;
    margin: 2px;
}
.project-entry img {
    width: 100%;
    background-size: cover;
}
</style>
