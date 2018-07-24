<template>
   <div>
        <div class="heading">about pro advice</div>
        <div class="subheading">When you use Bud to request a call, DIYZ matches you with one of our Pro Advisors for real-time help.</div>
       <v-carousel :style="{ height: height }"
                   :hide-controls="true">
           <v-carousel-item
                   v-for="(item,i) in advisors"
                   :key="i"
                   :lazy="true"
                   :src="item.image"
                   :interval="4000">
           </v-carousel-item>
       </v-carousel>
    </div>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import setImageHeight from '../mixins/setImageHeight.js';

export default {
    name: 'ProchatHome',
    components: {
        Loading
    },
    mixins: [setImageHeight],
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
</style>
