import axios from "axios";

const allVideos = {
    _id: -1,
    title: "All videos",
};

export default {
    state: {
        lists: [allVideos],
        current: allVideos
    },
    mutations: {
        setLists(state, data) {
            state.lists = [allVideos, ...data];
        },
        addList(state, data) {
            state.lists.push(data);
        },
        selectList(state, newCurrent) {
            const found = state.lists.find(ls => ls._id === newCurrent._id); //try to find list to protect self from injection of non-existent list
            if (found) {
                state.current = found;
            } else {
                console.warn({newCurrent, found});
            }
        },
    },
    actions: {
        retrieveBackendData: async ({commit}) => {
            const { data } = await axios.get('/api/data/lists');
            commit('setLists', data);
        },
        createList: async ({commit}, title) => {
            const { data } = await axios.post('/api/list', {title});
            commit('addList', data);
        },
        addVideoToList: async ({commit, dispatch}, {list, video}) => {
            const { data } = await axios.post(`/api/list/${list._id}/video`, [video._id]);
            dispatch('retrieveBackendData');
        },
    }
};