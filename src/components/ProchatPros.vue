<template>
   <div>
        
        <v-container >
            <v-layout column>
                <v-flex>
                    <div class="heading bold">about pro advice</div>
                    <div class="subheading">When you use Bud to request a call, DIYZ matches you with one of our Pro Advisors for real-time help.</div>
                </v-flex>
                <v-flex>
                    <v-carousel>
                        <v-carousel-item 
                        v-for="(item,i) in advisors"
                        :key="'car' + i"
                        :src="item.image"
                        ><div class="details">{{item.name}}</div></v-carousel-item>
                    </v-carousel>
                </v-flex>
                <v-flex class="prochat-info">
                    <ul>
                        <li><span class="bold">Live</span> voice or video call with a DIY professional <span class="bold">FOR FREE</span></li>
                        <li>Pro Advisors empower you to do it right the first time, saving you <span class="bold">time</span> and <span class="bold">money</span></li>
                        <li>Available <span class="bold">every day</span> of the week</li>
                    </ul>
                </v-flex>
            </v-layout>
        </v-container>
        
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

<style>
.bold {
    font-weight: bold;
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
.details {
    bottom: 50px;
    padding: 1%;
    position: absolute;
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    background: rgba(0, 0, 0, 0.5);
}
.v-carousel__controls {
    background: transparent;
}
.prochat-info {
    padding: 2%;
    background: rgb(247, 247, 247);
    font-size: 16px;
    -webkit-box-align: center;
}
</style>
