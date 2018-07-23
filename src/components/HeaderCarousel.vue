<template>
    <v-carousel>
        <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.image"
        ></v-carousel-item>
    </v-carousel>
</template>

<script>
import axios from 'axios';

export default {
    name: 'HeaderCarousel',
    data() {
        return {
            items: []
        };
    },
    beforeMount() {
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
