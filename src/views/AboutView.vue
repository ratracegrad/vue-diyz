<template>
    <div>
        <md-tabs class="md-transparent"  md-alignment="fixed" md-sync-route  >
                <md-tab id="tab-team" md-label="Team" to="/about" style="padding: 0;">
                    <about-home></about-home>
                </md-tab>
                <md-tab id="tab-press" md-label="Press" to="/about/press"  style="padding: 0;">
                    <router-view></router-view>
                </md-tab>
                <md-tab id="tab-faq" md-label="FAQ" to="/about/faq"  style="padding: 0;">
                    <router-view></router-view>
                </md-tab>
            </md-tabs>
    </div>
</template>

<script>
import AboutHome from '@/components/AboutHome.vue';

export default {
    name: 'AboutView',
    components: {
        'about-home': AboutHome
    }
};
</script>

<style lang="scss">
.md-tabs-navigation {
    margin-bottom: 24px;
}
</style>
