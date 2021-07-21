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
}

export const getters = {
    getPost: state => state = state.posts,
}

export const actions = {
    //asynchronous
    async getPosts({ commit }) {
        // await axios.get('https://jsonplaceholder.typicode.com/posts')
        await axios.get(`https://crudcrud.com/api/c777d368f24f40e7b4810d8bb6e80838/unicorns`)
            .then((response) => {
                console.log(response.data, "response")
                commit('SET_POSTS', response.data)
            }).catch(err => console.error(err))
    },

}