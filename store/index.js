import axios from 'axios'
export const strict = false
    // export const nameSpaced = true
export const state = () => ({
    posts: [],
    editPosts: [],
    // message:'Vuex Messsage'
})

export const mutations = {
    //synchronous
    SET_POSTS(state, data) {
        state.posts = data
    },
    // EDIT_POST(state, payload) {
    //     state.editPosts = payload
    // }
}

export const getters = {
    getPost: state => state = state.posts,
    // editPosts: state => state = state.editPosts
    // getMessage: state => state = state.message
}

export const actions = {
    //asynchronous
    async getPosts({ commit }) {
        await axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                // console.log(response.data, "response")
                commit('SET_POSTS', response.data)
            }).catch(err => console.error(err))
    },

}