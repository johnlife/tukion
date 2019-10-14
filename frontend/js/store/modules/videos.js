import axios from "axios";
import statuses from '../../../../config/download_statuses';
import ListUtils from 'lifeNode/essentials/utils/ListUtils';
let scheduledUpdate = null;

export default {
    state: {
        videos: [],
    },
    mutations: {
        setVideos(state, data) {
            state.videos = data;
        },
        addVideo(state, data) {
            state.videos.push(data);
        },
        replaceVideo(state, video) {
            ListUtils.replace(state.videos, video);
        },
    },
    actions: {
        retrieveBackendData: async ({commit, dispatch}) => {
            const { data } = await axios.get('/api/data/videos');
            commit('setVideos', data);
            const incomplete = data.find(video => video.download_status !== statuses.downloaded);
            if (scheduledUpdate) clearTimeout(scheduledUpdate);
            scheduledUpdate = setTimeout(() => dispatch('retrieveBackendData'), incomplete ? 1000 : 60000);
        },
        downloadVideo: async ({commit, dispatch}, link) => {
            const { data } = await axios.post('/api/data/video', {link});
            commit('addVideo', data);
            setTimeout(() => dispatch('retrieveBackendData'), 1000);
        },
        editVideo: async ({commit, dispatch}, edits) => {
            const _id = edits._id;
            const { data } = await axios.post(`/api/data/video/${_id}`, edits);
            commit('replaceVideo', data);
        },
    }
};