import { mount, shallowMount, flushPromises, createLocalVue } from '@vue/test-utils';
import UserTable from '@/components/UserTable.vue';
import Vuex from 'vuex'
import { expect } from '@jest/globals';

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
    getPosts: jest.fn()
}

const store = new Vuex.Store({ actions })

describe("UserTable.vue", () => {

    it('check if template is rendered', () => {
        var wrapper = shallowMount(UserTable, {
            localVue,
            store,
        });
        expect(wrapper.find('.container').isVisible()).toBe(true)
    })

    it('checks posts data from vuex Store', async () => {
        const fakeData = [{
            id: 0,
            title: "Sincere@april.biz",
            body: "Leanne Graham",
        }]
        const mockStore = { dispatch: jest.fn() }
        const wrapper = mount(UserTable, {
            mocks: {
                $store: mockStore,
                fakeData,
                localVue
            }
        })
        await wrapper.find('dispatch').trigger('click')
        expect(mockStore.computed.dispatch).toHaveBeenCalledWith('getPosts', fakeData)
    })

})

