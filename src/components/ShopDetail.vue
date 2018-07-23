<template>
    <div>
        <div>Store: {{storeTool}}</div>
        <div>
            <div class="overview-wrapper">
                <div class="image-wrapper">
                    <img :src="itemSelected.largeImage" class="large-image" />
                </div>
                <div class="detail-wrapper">
                    <div class="product-title">
                        {{itemSelected.title}}
                    </div>
                    <div class="product-department">
                        By {{itemSelected.brand}}
                    </div>
                    <div class="product-price bold">
                        {{itemSelected.price}}
                    </div>
                    <img src="../images/primeLogo.png" class="product-prime" />
                    <div class="product-description">
                        <span class="bold">Features:</span>
                        <ul>
                            <li class="product-features" v-for="item in itemSelected.feature" :key="item.index">
                                {{item}}
                            </li>
                        </ul>

                    </div>

                    <div class="product-checkout">
                        <button class="amazon-button" @click="showSnackbar = true">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>

        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
            <span>Product added to cart.</span>
        </md-snackbar>
    </div>
</template>

<script>

export default {
    name: 'ShopDetail',
    data() {
        return {
            id: this.$route.params.id,
            showSnackbar: false,
            position: 'left',
            duration: 4000,
            isInfinity: false
        };
    },
    computed: {
        itemSelected() {
            return this.$store.state.itemSelected;
        }
    }
};
</script>

<style scoped>
.overview-wrapper {
    display: flex;
    flex-direction: column;
    padding-top: 35px;
    max-width: 1366px;
}
.image-wrapper {
    width: 45%;
    height: 60%;
    min-width: 250px;
    max-height: 400px;
    min-height: 250px;
    padding: 0 10px;
}
.large-image {
    width: 100%;
    height: -webkit-fill-available;
    background-size: cover;
    background-position: center;
}
.product-title {
    font-size: 18px;
    line-height: 22px;
    height: 44px;
    overflow: hidden;
    font-weight: bold;
}
.product-department {
    font-size: 18px;
    color: rgb(38, 38, 36);
    line-height: 22px;
}
.product-price {
    color: rgb(231, 51, 34);
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    margin-top: 7px;
}
.product-prime {
    width: 60px;
    height: 20px;
    margin: 16px 0 21px;
}
.product-description {
    padding-bottom: 20px;
}
.product-description > span {
    font-size: 15px;
}
.product-features {
    font-size: 14px;
    line-height: 20px;
    color: rgb(95, 95, 95);
}
ul {
    margin: 0;
}
.bold {
    font-weight: bold;
}
.no-details {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    margin: 40px;
}
.amazon-button {
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
    margin-left: auto;
    margin-right: auto;
    min-width: 80px;
    text-transform: none;
}
.product-checkout {
    width: 181px;
}

@media all and (min-width: 0px) and (max-width: 620px) {
    .overview-wrapper {
        display: flex;
        flex-direction: column;
        padding-top: 35px;
        max-width: 1366px;
    }
    .image-wrapper {
        width: 100%;
        padding: 0;
        max-height: 250px;
    }

    .product-checkout {
        width: 100%;
        height: 35px;
        border-top: 1px solid rgb(231, 231, 231);
        padding: 15px 0;
    }
    .product-prime {
        width: 60px;
        height: 20px;
        margin: 0;
    }
    .product-title {
        font-size: 15px;
        line-height: 18px;
        height: 36px;
        overflow: hidden;
        font-weight: bold;
    }
    .product-department {
        font-size: 14px;
        line-height: 16px;
    }
    .product-price {
        font-size: 14px;
    }
}

@media all and (min-width: 621px) {
    .overview-wrapper {
        flex-direction: row;
    }
    .image-wrapper {
        min-height: 400px;
    }
    .large-image {
        width: 100%;
        height: -webkit-fill-available;
        max-height: 500px;
        min-height: 250px;
    }
    .detail-wrapper {
        padding: 0 30px 0 0;
    }
}
</style>
