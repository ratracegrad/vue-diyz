<template>
    <div>
        <v-carousel :style="{ height: height }">
            <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :lazy="true"
                    :src="item.image"
                    :interval="4000"
            ></v-carousel-item>
        </v-carousel>
        <div class="search">
            <!--<input type="text" placeholder="Search">-->
            <input type="text" placeholder="Search">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import setImageHeight from '../mixins/setImageHeight.js';

export default {
    name: 'HeaderCarousel',
    mixins: [setImageHeight],
    data() {
        return {
            items: this.$store.state.headerCarouselItems
        };
    },
    created() {
        if (this.items.length === 0) {
            this.getCarousel();
        }
    },
    methods: {
        getCarousel() {
            axios
                .get('https://api.diyz.com/content/static/carousel')
                .then(response => {
                    response = response.data;
                    this.$store.commit('setCarouselItems', response);
                    this.items = response;
                })
                .catch(() => {});
        }
    }
};
</script>

<style scoped>
.search {
    height: 82px;
    width: 100%;
    background: #ffd100;
    display: flex;
    align-items: center;
    padding: 0 30px;
}
input {
    background: white;
    /*height: 30px;*/
    font-size: 20px;
    padding: 15px 10px;
    min-width: 200px;
    max-width: 860px;
    margin: 0 auto;
}

@media screen and (max-width: 620px) {
    .search {
        padding: 0 15px;
    }
}
</style>
