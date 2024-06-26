<template>
    <HeaderComponent />
    <main>
        <ul class="tabs">
            <li class="tab" v-for="category in categories" :key="category.id"
                :class="{ 'current': category.id === currentCategoryId }">
                <button @click="selectCategory(category.id)">{{ category.name || '無題' }}</button>
            </li>
        </ul>
        <div class="toolbar">
            <CounterChipComponent :done="counts.isDone" separator="/" :total="counts.total" />
            <button @click="toggleList" class="btn-md btn-br-4"
                :class="isIncompleteOnly ? 'btn-primary' : 'btn-secondary'">{{ isIncompleteOnly ? "すべて表示" : "未完了のみ表示"
                }}</button>
        </div>
        <ul class="list">
            <template v-if="filteredCheckLists.length === 0">
                <li class="blank">リストが登録されていません。</li>
            </template>
            <template v-else>
                <ListItemTransitionComponent>
                    <li v-for="(checkList, index) in filteredCheckLists" :key="checkList.id" class="list-item">
                        <div class="enable">
                            <div class="checkbox">
                                <input type="checkbox" v-model="checkList.isDone" @change="registerCheckList(user.uid)">
                            </div>
                            <textarea v-model="checkList.name" @change="registerCheckList(user.uid)"
                                @input="adjust($event, checkList.id)" rows="1" :style="{ height: checkList.height }"
                                :class="{ 'done': checkList.isDone }" placeholder="無題"></textarea>
                            <div class="flex-col">
                                <button @click="change(index, 'forward')" :disabled="index === 0"
                                    class="material-symbols-rounded icon-btn-secondary icon-btn-sm icon-btn-br-infinity">arrow_drop_up</button>
                                <button @click="change(index, 'behind')"
                                    :disabled="index === filteredCheckLists.length - 1"
                                    class="material-symbols-rounded icon-btn-secondary icon-btn-sm icon-btn-br-infinity">arrow_drop_down</button>
                            </div>
                        </div>
                        <div class="delete">
                            <button @click="deleteCheckList(checkList.id)"
                                class="material-symbols-rounded icon-btn-danger icon-btn-lg-stretch">delete</button>
                        </div>
                    </li>
                </ListItemTransitionComponent>
            </template>
        </ul>
        <div class="flex-center">
            <button @click="add(currentCategoryId)"
                class="material-symbols-rounded icon-btn-primary icon-btn-lg icon-btn-br-infinity">add</button>
        </div>
    </main>
    <FooterComponent />
</template>

<script setup>
// Vue
import { ref, onMounted, computed } from 'vue'
// Stores
import { storeToRefs } from 'pinia'
// Components
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import CounterChipComponent from '../components/CounterChipComponent.vue'
import ListItemTransitionComponent from '../components/ListItemTransitionComponent.vue'
// ユーザーストア
import { useUserStore } from '../stores/stores'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { setUser } = userStore
// カテゴリストア
import { useCategoriesStore } from '../stores/stores'
const categoriesStore = useCategoriesStore()
const { categories, currentCategoryId } = storeToRefs(categoriesStore)
const { getCategories } = categoriesStore
// チェックリストストア
import { useCheckListsStore } from '../stores/stores'
const checkListsStore = useCheckListsStore()
const { checkLists, checkListsCounts } = storeToRefs(checkListsStore)
const { getCheckListId, addCheckList, registerCheckList, getCheckLists, removeCheckList, changeOrder, adjustHeight } = checkListsStore

// カテゴリボタン
function selectCategory(CategoryId) {
    currentCategoryId.value = CategoryId
}
// 件数
const counts = computed(() => {
    let props = {}
    const obj = checkListsCounts.value[currentCategoryId.value]
    for (const key in obj) {
        props[key] = obj[key]
    }
    return props
})
// すべて/未完了 切替ボタン
const isIncompleteOnly = ref(false)
function toggleList() {
    isIncompleteOnly.value = !isIncompleteOnly.value
}
// フィルタリング済チェックリスト
const filteredCheckLists = computed(() => {
    return checkLists.value.filter(checkList => {
        if (isIncompleteOnly.value) return checkList.category === currentCategoryId.value && !checkList.isDone
        else return checkList.category === currentCategoryId.value
    })
})
// 高さ調整
function adjust(event, id) {
    event.target.style.height = "auto"
    adjustHeight(event, id)
}
// 削除ボタン
function deleteCheckList(id) {
    removeCheckList(id)
    registerCheckList(user.value.uid)
}
// 入替ボタン
function change(index, direction) {
    const a = filteredCheckLists.value[index].id
    const b = direction === 'forward' ? filteredCheckLists.value[index - 1].id : direction === 'behind' ? filteredCheckLists.value[index + 1].id : 0
    changeOrder(a, b)
}
// 追加
function add(currentCategoryId) {
    addCheckList(currentCategoryId)
    registerCheckList(user.value.uid)
}
// マウント
onMounted(async () => {
    await setUser()
    getCategories(user.value.uid)
    getCheckListId(user.value.uid)
    getCheckLists(user.value.uid)
})
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    min-height: calc(100vh - 9.2rem);
}

.tabs {
    overflow-x: auto;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
        display: none;
    }
}

.tab {
    scroll-snap-align: start;
    white-space: nowrap;

    & button {
        max-width: 32rem;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1.6rem;
}

.blank {
    padding: 1.6rem;
    text-align: center;
}

.list-item {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border-bottom: 1px solid var(--color-gray-l2);
    display: flex;

    &::-webkit-scrollbar {
        display: none;
    }
}

.enable {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 1.6rem;
    min-width: calc(100%);
    scroll-snap-align: start;
}

.delete {
    scroll-snap-align: start;
}

textarea {
    width: 100%;

    &.done {
        text-decoration: line-through;
    }
}
</style>