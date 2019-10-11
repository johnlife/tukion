<template>
    <v-app>
        <v-toolbar app color="white" class="elevation-1">
            <router-link to="/" class="root-logo"><v-img src="/images/logo.png" alt="tukion home" height="100%" aspect-ratio="3.5" contain position="left"></v-img></router-link>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
            <v-container fluid class="pa-0" fill-height>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import _ from 'lodash';
    export default {
        metaInfo: () => ({
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'No Title Specified',
            titleTemplate: '%s - Tukion',
        }),
    }
</script>

<style>

</style>