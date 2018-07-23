<template>
   <div>
        <div class="heading">about pro advice</div>
        <div class="subheading">When you use Bud to request a call, DIYZ matches you with one of our Pro Advisors for real-time help.</div>
        <agile v-for="advisor in advisors" :key="advisor.id" :mobile-first="true" :arrows="true" :speed="1000"
            :timing="'linear'" :fade="true"
            :autoplay="true" :pause-on-hover="true">
            <div class="slide"><h3>{{advisor.name}}</h3></div>
        </agile>
    </div>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
export default {
    name: 'ProchatHome',
    components: {
        Loading
    },
    data() {
        return {
            advisors: [],
            isLoading: false
        };
    },

    beforeMount() {
        this.getAdvisors();
    },
    methods: {
        getAdvisors() {
            this.isLoading = false;
            axios
                .get(`https://api.sbd-diyz-dev.com/content/static/advisors`)
                .then(response => {
                    response = response.data;
                    this.advisors = response;
                })
                .catch(() => {
                    this.isLoading = false;
                });
        }
    }
};
</script>

<style scoped>
.md-tabs {
    margin-bottom: 24px;
}
.md-tabs.md-alignment-fixed .md-tabs-navigation {
    justify-content: space-between;
}
.heading {
    font-family: 'Roboto-Bold', serif;
    font-size: 20px;
    line-height: 20px;
    margin: 27px 0 16px 0;
    text-align: center;
    text-transform: uppercase;
}
.subheading {
    font-family: 'Roboto', serif;
    font-size: 15px;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 15px;
}
/* .slide {
    background: {
        position: center;
        size: cover;
    }
    height: 500px;

    &:before {
        background-color: rgba(#000, .2);
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    &--1 {
        color: blue
    }

} */
</style>
