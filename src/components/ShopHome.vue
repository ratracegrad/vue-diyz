<template>
    <div>
        <div class="shop-wrapper">
            <div v-for="tool in toolsList" :key="tool.index" class="outer-wrapper">
                <div class="tool-wrapper" v-on:click="showDetail(tool)">
                    <img class="tool-image" :src="tool.largeImage" />
                    <div class="right-wrapper">
                        <div class="tool-title">{{tool.title}}</div>
                        <div class="right-detail-wrapper">
                            <div>
                                <div class="tool-brand">By {{tool.brand}}</div>
                                <div class="tool-price">{{tool.price}}</div>
                                <img class="tool-prime" v-show="tool.isEligibleForPrime === '1'" src="../images/primeLogo.png" />
                            </div>
                            <button id="smallBtn" class="tool-button">Add To Cart</button>
                        </div>
                        <button id="largeBtn" class="tool-button" @click.prevent.stop="showSnackbar = true">Add To Cart</button>
                    </div>

                </div>
            </div>
        </div>

        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :is-full-page="true"></loading>

        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
            <span>Product added to cart.</span>
        </md-snackbar>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import axios from 'axios';

export default {
    name: 'ShopHome',
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            toolsList: [],
            currentBatch: 1,
            maxBatch: null,
            hasTools: false,
            page: 1,
            showSnackbar: false,
            position: 'left',
            duration: 4000,
            isInfinity: false
        };
    },
    mounted() {
        this.getTools(1);
    },
    methods: {
        getTools(batch) {
            this.isLoading = true;
            batch = batch || this.currentBatch;
            if (batch === 1) {
                this.toolsList = [];
            }

            axios
                .get(
                    `https://api.sbd-diyz-dev.com/content/dynamic/searchProducts?page=${batch}`
                )
                .then(response => {
                    response = response.data;
                    if (
                        response &&
                        response.products &&
                        response.products.length > 0
                    ) {
                        this.hasTools = response.products.length > 0;
                        this.currentBatch = response.current_batch;
                        this.maxBatch = response.num_of_batches;
                        this.isLoading = false;

                        response.products.forEach(tool => {
                            if (!this.toolsList.includes(tool)) {
                                this.toolsList.push(tool);
                            }
                        });
                    } else {
                        this.toolsList = [];
                        this.hasTools = false;
                    }
                })
                .catch(() => {
                    this.hasTools = false;
                    this.isLoading = false;
                });
        },
        showDetail(tool) {
            this.$store.commit('setSelectedTool', tool);
            this.$router.push(`/shop/${tool.id}`);
        }
    }
};
</script>

<style lang="scss" scoped>
.outer-wrapper {
    width: 254px;
    max-width: 254px;
    max-height: 382px;
    height: 382px;
    margin: 10px 5px;
    box-sizing: border-box;
}
.shop-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
}
.tool-wrapper {
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    height: 100%;
    border: 1px solid #e7e7e7;
    /*margin: 5px;*/
    padding: 7px;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    background: white;
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(white),
        color-stop(79%, white),
        color-stop(91%, #f7f7f7),
        to(#f2f2f2)
    );
    background: linear-gradient(
        to bottom,
        white 0%,
        white 79%,
        #f7f7f7 91%,
        #f2f2f2 100%
    );
}
.tool-image {
    height: 107px;
    margin: 0 auto;
}
.tool-title {
    font-size: 13px;
    line-height: 16px;
    height: 48px;
    overflow: hidden;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 9px;
    color: rgb(29, 113, 197);
}
.right-wrapper {
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.tool-brand {
    font-size: 14px;
    height: 17px;
    line-height: 17px;
    overflow: hidden;
}
.tool-price {
    font-size: 15px;
    height: 18px;
    line-height: 18px;
    font-weight: bold;
    color: rgb(231, 51, 34);
    margin-top: 4px;
}
.tool-prime {
    height: 15px;
    width: 55px;
    margin-top: 10px;
}
.tool-button {
    background: #f3d078;
    background: -webkit-linear-gradient(top, #f7dfa5, #f0c14b);
    background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset;
    border-radius: 2px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    padding: 8px;
    text-align: center;
    font-size: 14px;
    width: 100%;
    max-width: 600px;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    min-width: 80px;
    text-transform: uppercase;
}
#smallBtn {
    display: none;
}

@media screen and (max-width: 620px) {
    .shop-wrapper {
        padding: 0;
    }
    .outer-wrapper {
        width: 100%;
        max-width: 100%;
        height: unset;
        margin: 5px 10px;
    }
    .tool-wrapper {
        flex-direction: row;
        align-items: center;
        background: white;
    }
    .right-detail-wrapper {
        display: flex;
        justify-content: space-between;
    }
    .tool-button {
        max-width: 120px;
        margin: auto 0 0 0;
        font-size: 13px;
    }
    .tool-image {
        width: 107px;
        height: 107px;
        object-fit: contain;
    }
    #largeBtn {
        display: none;
    }
    #smallBtn {
        display: block;
        font-size: 13px;
        max-width: 110px;
    }
}
</style>
