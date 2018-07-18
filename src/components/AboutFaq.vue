<template>
    <div>
        <img src="../images/contact-header.jpg" class="header-picture"
             v-bind:style="{ backgroundColor: 'lightgray', height: height, backgroundSize: 'cover' }" />
        <div class="faq-wrapper">
            <h1 class="header">Here are answers to some of our most
                frequently asked questions.
            </h1>



            <div class="item-wrapper" v-show="hasFaq">
                <!--<div style="display: flex; flex-wrap: wrap; flex-direction: column;">-->
                    <template v-for="item in faqList">
                        <div class="row-wrapper">
                            <div class="title">{{item.title}}</div>
                            <icon name="chevron-down" class="more-button" />
                        </div>
                    </template>
                <!--</div>-->
            </div>

            <div v-show="!hasFaq" class="no-items">
                No Press Items Found!
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AboutFaq',
    data() {
        return {
            height: this.setImageHeight(),
            faqList: [],
            hasFaq: null,
            currentBatch: null,
            maxBatch: null,
            isLoading: false,
            page: 1
        };
    },
    mounted() {
        this.getFaq(1);
    },
    methods: {
        setImageHeight() {
            if (window.innerWidth <= 620) {
                return (Math.round(window.innerWidth) * 9) / 16 + 'px';
            } else if (window.innerWidth >= 1060) {
                return '450px';
            } else if (this.querySelector('.header-picture')) {
                return (
                    (Math.round(
                        this.querySelector('.header-picture').offsetWidth
                    ) *
                        9) /
                        16 +
                    'px'
                );
            }
        },
        getFaq(page) {
            if (page === 1) {
                this.faqList = [];
            }

            axios
                .get(`https://api.diyz.com/content/static/faqs/${page}`)
                .then(response => {
                    response = response.data;

                    if (response && response.page) {
                        this.isLoading = false;
                        this.hasFaq = response.page.length > 0;
                        this.currentBatch = response.current_page;
                        this.maxBatch = response.num_of_page;
                        response.page.forEach(team => {
                            this.faqList.push(team);
                        });
                    } else {
                        this.faqList = [];
                        this.hasFaq = false;
                    }
                });
        },
        formatDate(dt) {
            let arr = dt.split('-');
            return `${arr[1]}/${arr[2]}/${arr[0]}`;
        }
    }
};
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}
.header-picture {
    width: 100%;
    margin: 0 auto;
    object-fit: cover;
}
.faq-wrapper {
    max-width: 1440px;
    margin: 20px auto;
    padding: 0 30px;
}
.header {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    line-height: 20px;
    text-align: center;
    padding: 0 25px;
    margin-top: 20px;
    margin-bottom: 25px;
    font-weight: normal;
}
h2 {
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    line-height: 18px;
    text-align: center;
    text-transform: uppercase;
    padding: 0 25px;
    margin: 20px 0 25px;
}
.item-wrapper {
    padding: 0 10px;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
}
a {
    color: #0ab8e2;
    text-decoration: none;
}
.no-items {
    margin-top: 150px;
    font-family: 'Roboto-Bold', sans-serif;
    font-size: 17px;
    text-align: center;
}
.column-wrapper {
    display: flex;
    flex-direction: column;
}
.row-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(231, 231, 231);
    padding: 10px 0;
}
.title {
    line-height: 48px;
    font-size: 15px;
    font-family: 'Poppins-Light', sans-serif;
}
.more-button {
    height: 35px;
    width: 35px;
    color: #939199;
}

@media screen and (max-width: 620px) {
    .faq-wrapper {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
    }
}
</style>
