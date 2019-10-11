<template>
    <v-card class="mb-3" @mouseover="hovered = true" @mouseout="hovered = false">
        <template v-if="video.download_status === 'pending'">
            <div class="pa-5">
                <h3 class="headline restricted video-title mb-3 font-weight-light">{{video.link}}</h3>
                <div class="caption yellow--text">{{ video.download_status }}</div>
            </div>
        </template>
        <template v-else>
            <v-img
                :src="video.thumbnail"
                aspect-ratio="1.75"
            ></v-img>
            <v-card-title primary-title>
                <div class="w100">
                    <template v-if="editing">
                        <v-text-field
                            label="Title"
                            :rules="[$rules.required]"
                            v-model="edits.title"
                        ></v-text-field>
                    </template>
                    <template v-else>
                        <h3 class="headline restricted video-title mb-3 font-weight-light">{{video.title}}</h3>
                    </template>
                    <v-layout class="caption text--secondary">
                        <v-flex class="body-1 font-weight-light">by <span class="font-weight-bold">{{ video.channel }}</span></v-flex>
                        <v-flex xs5 class="text-xs-right">
                            <span class="green--text" v-if="video.download_status === 'downloading'">{{ video.download_status }}</span>
                            <a :href="video.downloaded_url" v-if="video.download_status === 'downloaded'"><v-icon small>cloud_download</v-icon> {{ video.download_status }}</a>
                        </v-flex>
                    </v-layout>
                    <v-layout class="caption text--secondary">
                        <v-flex class="restricted video-tags">{{ video.tags.join(', ') }}</v-flex>
                        <v-flex xs3 class="text-xs-right">{{ video.duration }}</v-flex>
                    </v-layout>

                    <template v-if="editing">
                        <v-text-field
                            label="Description"
                            :rules="[$rules.required]"
                            v-model="edits.description"
                        ></v-text-field>
                    </template>
                    <template v-else>
                        <div class="restricted video-description"> {{ video.description }} </div>
                    </template>
                    <v-layout class="caption text--secondary">
                        <v-flex v-for="i in icons" :key="i.field"><v-icon small>{{ i.icon}}</v-icon> {{ video[i.field] }}</v-flex>
                    </v-layout>
                </div>
                <v-btn
                    v-show="hovered && !editing"
                    color="primary"
                    dark small fab
                    absolute bottom right
                    @click="edit()"
                    >
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn
                    v-show="editing"
                    color="primary"
                    dark small fab
                    absolute bottom right
                    @click="submit()"
                    >
                    <v-icon>check</v-icon>
                </v-btn>
            </v-card-title>
        </template>
    </v-card>
</template>

<script>
    import _ from 'lodash';
    export default {
        data: () => ({
            icons: [
                {icon: 'visibility', field: 'views'},
                {icon: 'thumb_up', field: 'likes'},
                {icon: 'favorite_border', field: 'favorites'},
                {icon: 'chat_bubble_outline', field: 'comments'},
            ],
            hovered: false,
            editing: false,
            edits: {},
        }),
        props: {
            video: {required: true},
        },
        computed: {
        },
        methods: {
            edit() {
                this.editing = true;
                this.edits = _.pick(this.video, ["title", "description", "_id"]);
            },
            submit() {
                this.editing = false;
                this.$store.dispatch("editVideo", this.edits);
                this.edits = {};
            },
        },
    }
</script>

<style scoped>
    .restricted {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .video-tags {
        -webkit-line-clamp: 1;
    }

    .video-title {
        -webkit-line-clamp: 2;
    }

    .video-description {
        -webkit-line-clamp: 3;
    }

    .w100 {
        width: 100%;
    }
</style>