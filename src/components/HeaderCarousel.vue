<template>
    <v-carousel :style="{ backgroundColor: 'lightgray', height: height, backgroundSize: 'cover' }">
        <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :lazy="true"
                :src="item.image"
                :interval="4000"
        ></v-carousel-item>
    </v-carousel>
</template>

<script>
import axios from 'axios';
import setImageHeight from '../mixins/setImageHeight.js';

export default {
    name: 'HeaderCarousel',
    mixins: [setImageHeight],
    data() {
        return {
            items: []
        };
    },
    created() {
        this.getCarousel();
    },
    methods: {
        getCarousel() {
            axios
                .get('https://api.diyz.com/content/static/carousel')
                .then(response => {
                    response = response.data;
                    this.items = response;
                })
                .catch(() => {});
        }
    }
};
</script>

<style scoped>
</style>
