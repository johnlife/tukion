<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12><add-video-form/></v-flex>
            <v-flex xs6 sm5 md3 xl2><video-lists/></v-flex>
            <v-flex xs6 sm5 md3 xl2 offset-sm2 offset-md6 offset-xl8><v-select :items="availableSorts" label="Sort" v-model="sort"></v-select></v-flex>
            <v-flex xs12 sm6 lg4 xl3 v-for="video in sorted" :key="video._id" >
                <video-card :video="video"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import VideoCard from "../components/VideoCard";
    import AddVideoForm from "../components/AddVideoForm";
    import stringComparator from 'lifeNode/essentials/utils/comparators/stringComparator';
    import VideoLists from "./videos/VideoLists";

    const sortings = {
        initial: (a,b) => stringComparator(a._id, b._id),
        title: (a,b) => stringComparator(a.title, b.title),
    };

    export default {
        components: {
            VideoLists,
            AddVideoForm,
            VideoCard
        },
        metaInfo: () => ({
            title: 'Videos list',
        }),
        data: () => ({
            sort: 'initial',
            availableSorts: Object.keys(sortings),
        }),
        props: {
        },
        computed: {
            videos() {
                let state = this.$store.state;
                return (state.lists.current._id === -1) ? state.videos.videos : state.lists.current.videos;
            },
            sorted() {
                return this.videos.sort(sortings[this.sort]);
            }
        },
        methods: {
        },
        mounted() {
        },
        watch: {
        }
    }
</script>
