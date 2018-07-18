<template>
    <div>
        <md-tabs md-sync-route md-alignment="fixed" class="md-transparent">
            <md-tab id="tab-team" md-label="Team" >
                <AboutHome></AboutHome>
            </md-tab>
            <md-tab id="tab-press" md-label="Press" >
                <AboutPress></AboutPress>
            </md-tab>
            <md-tab id="tab-faq" md-label="FAQ">
                <AboutFaq></AboutFaq>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
import AboutHome from '../components/AboutHome.vue';
import AboutPress from '../components/AboutPress.vue';
import AboutFaq from '../components/AboutFaq.vue';

export default {
    name: 'AboutView',
    components: {
        AboutHome,
        AboutPress,
        AboutFaq
    }
};
</script>

<style scoped>
.md-tabs {
    margin-bottom: 24px;
}
</style>
