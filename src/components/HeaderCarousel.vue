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

export default {
    name: 'HeaderCarousel',
    data() {
        return {
            items: [],
            height: this.setImageHeight()
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
        },
        setImageHeight() {
            if (window.innerWidth <= 620) {
                return (Math.round(window.innerWidth) * 9) / 16 + 'px';
            } else if (window.innerWidth >= 1060) {
                return '450px';
            } else if (this.querySelector('.v-carousel')) {
                return (
                    (Math.round(this.querySelector('.v-carousel').offsetWidth) *
                        9) /
                        16 +
                    'px'
                );
            }
        }
    }
};
</script>

<style scoped>
</style>
