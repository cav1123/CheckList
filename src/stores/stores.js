// Vue
import { computed, ref } from 'vue'
// Firebase
import { onAuthStateChanged } from "firebase/auth"
import Firebase from "../firebase_settings/index.js"
const auth = Firebase.auth
// Pinia
import { defineStore } from 'pinia'
// composable
import { useRegisterDb, useGetDb } from '../composable/composable'

// ユーザー
export const useUserStore = defineStore('user', () => {
    const user = ref({
        email: '',
        uid: '',
    })
    function setUser() {
        return new Promise(resolve => {
            resolve(onAuthStateChanged(auth, (u) => {
                if (u) {
                    user.value.email = u.email
                    user.value.uid = u.uid
                } else {
                    user.value.email = ''
                    user.value.uid = ''
                }
            }))
        })
    }
    return { user, setUser }
})

// カテゴリ
export const useCategoriesStore = defineStore('categories', () => {
    const categoryId = ref(0)
    const categories = ref([])
    const currentCategoryId = ref(0)
    // カテゴリID取得
    async function getCategoryId(uid) {
        return useGetDb(uid, 'categories')
            .then(resolve => {
                if (resolve.length !== 0) {
                    const idsArray = resolve.map(val => val.id)
                    categoryId.value = Math.max(...idsArray)
                } else {
                    categoryId.value = 0
                }
            })
            .catch(reject => {
                alert('取得失敗')
                console.error(reject)
            })
    }
    // 高さ調整
    function adjustHeight(event, index) {
        categories.value[index].height = "auto"
        categories.value[index].height = `${event.target.scrollHeight / 10}rem`
    }
    // 入替
    function changeOrder(index, direction) {
        const x = index
        const y = direction === 'forward' ? index - 1 : direction === 'behind' ? index + 1 : 0
        change(x, y)
    }
    function change(x, y) {
        [categories.value[x], categories.value[y]] = [categories.value[y], categories.value[x]]
    }
    // 削除
    function removeCategory(id) {
        categories.value = categories.value.filter(category => category.id !== id)
    }
    // 追加
    function addCategory() {
        categoryId.value++
        categories.value.push({
            id: categoryId.value, name: "", createAt: new Date(), height: "auto"
        })
    }
    // DB登録
    async function registerCategory(uid) {
        useRegisterDb(uid, 'categories', categories.value)
    }
    // DB取得
    async function getCategories(uid) {
        categories.value = []
        useGetDb(uid, 'categories')
            .then(resolve => categories.value = resolve)
            .catch(reject => {
                alert('取得失敗')
                console.error(reject)
            })
    }
    return { categories, currentCategoryId, getCategoryId, addCategory, registerCategory, getCategories, removeCategory, changeOrder, adjustHeight }
})

// チェックリスト
export const useCheckListsStore = defineStore('checkLists', () => {
    const checkListsId = ref(0)
    const checkLists = ref([])
    // チェックリストID取得
    async function getCheckListId(uid) {
        return useGetDb(uid, 'checkLists')
            .then(resolve => {
                if (resolve.length !== 0) {
                    const idsArray = resolve.map(val => val.id)
                    checkListsId.value = Math.max(...idsArray)
                } else checkListsId.value = 0
            })
            .catch(reject => {
                alert('取得失敗')
                console.error(reject)
            })
    }
    // 完了件数/全件数
    const checkListsCounts = computed(() => {
        let obj = {}
        for (const checkList of checkLists.value) {
            const key = checkList.category
            // 全件数
            if (!obj[key]) obj[key] = { total: 1, isDone: 0 }
            else obj[key].total += 1
            // 完了件数
            if (checkList.isDone) obj[key].isDone += 1
        }
        return obj
    })
    // 高さ調整
    function adjustHeight(event, id) {
        const array = checkLists.value.filter(checkList => checkList.id === id)
        array[0].height = "auto"
        array[0].height = `${event.target.scrollHeight / 10}rem`
    }
    // 入替
    function changeOrder(a, b) {
        let x = 0
        let y = 0
        checkLists.value.map((obj, index) => {
            if (obj.id === a) x = index
            if (obj.id === b) y = index
        })
        change(x, y)
    }
    function change(x, y) {
        [checkLists.value[x], checkLists.value[y]] = [checkLists.value[y], checkLists.value[x]]
    }
    // 削除
    function removeCheckList(id) {
        checkLists.value = checkLists.value.filter(checkList => checkList.id !== id)
    }
    // 一括削除
    function bulkRemoveCheckList(id) {
        checkLists.value = checkLists.value.filter(checkList => checkList.category !== id)
    }
    // 追加
    function addCheckList(currentCategoryId) {
        checkListsId.value++
        checkLists.value.push({
            id: checkListsId.value, name: "", createAt: new Date(), isDone: false, category: currentCategoryId, height: "auto"
        })
    }
    // DB登録
    async function registerCheckList(uid) {
        useRegisterDb(uid, 'checkLists', checkLists.value)
    }
    // DB取得
    async function getCheckLists(uid) {
        checkLists.value = []
        useGetDb(uid, 'checkLists')
            .then(resolve => checkLists.value = resolve)
            .catch(reject => {
                alert('取得失敗')
                console.error(reject)
            })
    }
    return { checkLists, checkListsCounts, getCheckListId, addCheckList, registerCheckList, getCheckLists, removeCheckList, bulkRemoveCheckList, changeOrder, adjustHeight }
})
