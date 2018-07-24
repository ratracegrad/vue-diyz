<template>
    <div>
        <img src="../images/legal-header.jpg" class="header-picture"
             v-bind:style="{ backgroundColor: 'lightgray', height: height, backgroundSize: 'cover' }" />
        <div class="legal-wrapper">
            <div class="column-wrapper">
                <div class="row-wrapper" @click="showTerms = !showTerms">
                    <div class="title">Terms & Conditions</div>
                    <icon name="chevron-down" class="more-button" v-show="!showTerms"/>
                    <icon name="chevron-up" class="more-button" v-show="showTerms"/>
                </div>
                <div v-show="showTerms" v-html="terms"></div>
            </div>

            <div class="column-wrapper">
                <div class="row-wrapper" @click="showPrivacy = !showPrivacy">
                    <div class="title">Privacy Policy</div>
                    <icon name="chevron-down" class="more-button" v-show="!showPrivacy"/>
                    <icon name="chevron-up" class="more-button" v-show="showPrivacy"/>
                </div>
                <div v-show="showPrivacy" v-html="privacy"></div>
            </div>

            <div class="column-wrapper">
                <div class="row-wrapper" @click="showProAdvice = !showProAdvice">
                    <div class="title">Pro Advice Terms</div>
                    <icon name="chevron-down" class="more-button" v-show="!showProAdvice"/>
                    <icon name="chevron-up" class="more-button" v-show="showProAdvice"/>
                </div>
                <div v-show="showProAdvice" v-html="pro_legal"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import setImageHeight from '../mixins/setImageHeight.js';

export default {
    name: 'LegalHome',
    mixins: [setImageHeight],
    data() {
        return {
            privacy: null,
            pro_legal: null,
            sources: null,
            terms: null,
            hasLegal: false,
            showTerms: false,
            showPrivacy: false,
            showProAdvice: false
        };
    },
    mounted() {
        this.getLegal();
    },
    methods: {
        getLegal() {
            axios
                .get(
                    'https://api.sbd-diyz-dev.com/content/static/privacy-terms'
                )
                .then(response => {
                    response = response.data;
                    this.privacy = response.privacy;
                    this.pro_legal = response.pro_legal;
                    this.sources = response.sources;
                    this.terms = response.terms;
                    this.hasLegal = true;
                })
                .catch(() => {
                    this.haslegal = false;
                });
        }
    }
};
</script>

<style scoped>
.header-picture {
    width: 100%;
    margin: 0 auto;
    object-fit: cover;
}
.legal-wrapper {
    max-width: 1440px;
    margin: 20px auto;
    padding: 0 30px;
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
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
}
.more-button {
    height: 35px;
    width: 35px;
    color: #939199;
}
@media screen and (max-width: 620px) {
    .legal-wrapper {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
    }
}
</style>
