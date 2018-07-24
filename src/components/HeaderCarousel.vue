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
    created() {
        this.getCarousel();
    },
    mounted() {
        this.$nextTick(function() {
            window.addEventListener('resize', this.setImageHeight);
            this.setImageHeight();
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
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
                this.height = (Math.round(window.innerWidth) * 9) / 16 + 'px';
            } else if (window.innerWidth >= 1060) {
                this.height = '450px';
            } else {
                this.height = (window.innerWidth * 9) / 16;
            }
        }
    }
};
</script>

<style scoped>
</style>
