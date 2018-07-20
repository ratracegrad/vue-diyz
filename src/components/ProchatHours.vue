<template>
   <div>
        <md-tabs md-sync-route md-alignment="fixed" class="md-transparent" >
            <md-tab id="tab-pros" md-label="PROS" to="/pro-chat/pros" >
                <router-view></router-view>
            </md-tab>
            <md-tab id="tab-hours" md-label="HOURS" to="/pro-chat/hours" >
                <router-view></router-view>
            </md-tab>
            <md-tab id="tab-apply" md-label="APPLY" to="/pro-chat/apply" >
                <router-view></router-view>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
export default {
    name: 'ProchatHome'
};
</script>

<style scoped>
.md-tabs {
    margin-bottom: 24px;
}
.md-tabs.md-alignment-fixed .md-tabs-navigation {
    justify-content: space-between;
}
</style>
