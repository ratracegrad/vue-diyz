<template>
    <div>
        <md-tabs md-sync-route md-alignment="fixed" class="md-transparent" >
            <md-tab id="tab-team" md-label="Team" to="/about/home" >
                <router-view></router-view>
            </md-tab>
            <md-tab id="tab-press" md-label="Press" to="/about/press" >
                <router-view></router-view>
            </md-tab>
            <md-tab id="tab-faq" md-label="FAQ" to="/about/faq" >
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
            this.$router.push(`/about/${title}`);
        }
    }
};
</script>

<style >
.md-tabs {
    margin-bottom: 24px;
}
.md-tabs.md-alignment-fixed .md-tabs-navigation {
    justify-content: space-between;
}
</style>
