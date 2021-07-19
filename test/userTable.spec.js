import { mount, shallowMount, flushPromises, createLocalVue } from '@vue/test-utils';
import UserTable from '@/components/UserTable.vue';
import Vuex from 'vuex'
import { expect } from '@jest/globals';

const localVue = createLocalVue()
localVue.use(Vuex)

const mocks = jest.fn()

function createStore() {
    return new Vuex.Store({
        // state: {
        //     posts: [{
        //         id: 0,
        //         title: "Sincere@april.biz",
        //         body: "Leanne Graham",
        //     }]
        // }
        actions
    })
}


const actions = {
    getPosts: jest.fn()
}

// const store = new Vuex.Store({ actions })

describe("UserTable.vue", () => {

    it('check if template is rendered', () => {
        const store = createStore()
        var wrapper = mount(UserTable, {
            localVue,
            store,
            mocks,
        });
        expect(wrapper.find('.container').isVisible()).toBe(true)
    })

    it("checks the computed properties", () => {
        const store = createStore()
        const wrapper = mount(UserTable, {
            store,
            localVue,
            props: {
                posts: [{
                    id: 0,
                    title: "Sincere@april.biz",
                    body: "Leanne Graham",
                }]
            }
        })
        const fakeData = [{
            id: 0,
            title: "Sincere@april.biz",
            body: "Leanne Graham",
        }]
        expect(wrapper.text()).toEqual(fakeData)
    })
})

