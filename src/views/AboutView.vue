<template>
    <div>
        <md-tabs md-sync-route md-alignment="fixed" class="md-transparent" >
            <md-tab id="tab-team" md-label="Team" @click="showAbout('home')" >
                <router-view></router-view>
            </md-tab>
            <md-tab id="tab-press" md-label="Press" @click="showAbout('press')" >
                <router-view></router-view>
            </md-tab>
            <md-tab id="tab-faq" md-label="FAQ" @click="showAbout('faq')" >
                <router-view></router-view>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
export default {
    name: 'AboutView',
    beforeMount() {
        this.showAbout('home');
    },
    methods: {
        showAbout(title) {
            console.log('showAbout', title);

            this.$router.push(`/about/${title}`);
        }
    }
};
</script>

<style scoped>
.md-tabs {
    margin-bottom: 24px;
}
</style>
