<template>
  <HeaderComponent />
  <main>
    <ul class="list">
      <template v-if="categories.length === 0">
        <li class="blank">リストがありません。</li>
      </template>
      <template v-else>
        <ListItemTransitionComponent>
          <li v-for="(category, index) in categories" :key="category.id" class="list-item">
            <div class="enable">
              <div class="flex-col">
                <button @click="change(index, 'forward')" :disabled="index === 0"
                  class="material-symbols-rounded icon-btn-secondary icon-btn-sm icon-btn-br-infinity">arrow_drop_up</button>
                <button @click="change(index, 'behind')" :disabled="index === categories.length - 1"
                  class="material-symbols-rounded icon-btn-secondary icon-btn-sm icon-btn-br-infinity">arrow_drop_down</button>
              </div>
              <textarea v-model="category.name" @change="registerCategory(user.uid)" @input="adjust($event, index)"
                rows="1" :style="{ height: category.height }" placeholder="無題"></textarea>
              <CounterChipComponent :done="doneCounts[category.id]" separator="/" :total="totalCounts[category.id]" />
              <button @click="showCheckLists(category.id)"
                class="material-symbols-rounded icon-btn-secondary icon-btn-md icon-btn-br-infinity">chevron_right</button>
            </div>
            <div v-if="category.id in checkListsCounts" class="delete">
              <button :popovertarget="`delete-dialog-${category.id}`" popovertargetaction="show"
                class="material-symbols-rounded icon-btn-danger icon-btn-lg-stretch">delete</button>
              <PopoverComponent :id="`delete-dialog-${category.id}`" :category="category" class="delete-dialog">
                <div class="inner">
                  <div class="instruction">
                    <span class="title">リスト削除</span>
                    <span class="text">【 {{ category.name || "無題" }} 】 に登録されているリストもすべて削除されます。削除しますか？</span>
                  </div>
                  <div class="buttons">
                    <button :popovertarget="`delete-dialog-${category.id}`" popovertargetaction="hide"
                      class="btn-secondary btn-lg btn-br-4">キャンセル</button>
                    <button @click="deleteCategory(category)" class="btn-danger btn-lg btn-br-4">削除</button>
                  </div>
                </div>
              </PopoverComponent>
            </div>
            <div v-else class="delete">
              <button @click="deleteCategory(category)"
                class="material-symbols-rounded icon-btn-danger icon-btn-lg-stretch">delete</button>
            </div>
          </li>
        </ListItemTransitionComponent>
      </template>
    </ul>
    <div class="flex-center">
      <button @click="add"
        class="material-symbols-rounded icon-btn-primary icon-btn-lg icon-btn-br-infinity">add</button>
    </div>
  </main>
  <FooterComponent />
</template>

<script setup>
// Vue
import { onMounted, computed } from 'vue'
// router
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { useChangeRoute } from '../composable/composable'
// Stores
import { storeToRefs } from 'pinia'
// Components
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import PopoverComponent from '../components/PopoverComponent.vue'
import CounterChipComponent from '../components/CounterChipComponent.vue'
import ListItemTransitionComponent from '../components/ListItemTransitionComponent.vue'
// ユーザーストア
import { useUserStore } from '../stores/stores.js'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { setUser } = userStore
// カテゴリストア
import { useCategoriesStore } from '../stores/stores.js'
const categoriesStore = useCategoriesStore()
const { categories, currentCategoryId } = storeToRefs(categoriesStore)
const { addCategory, registerCategory, getCategories, getCategoryId, removeCategory, changeOrder, adjustHeight } = categoriesStore
// チェックリストストア
import { useCheckListsStore } from '../stores/stores'
const checkListsStore = useCheckListsStore()
const { checkListsCounts } = storeToRefs(checkListsStore)
const { getCheckListId, registerCheckList, getCheckLists, bulkRemoveCheckList } = checkListsStore

// チェックリストの全件数
const totalCounts = computed(() => {
  let props = {}
  const obj = checkListsCounts.value
  for (const key in obj) {
    props[key] = obj[key].total
  }
  return props
})
// チェックリストの完了件数
const doneCounts = computed(() => {
  let props = {}
  const obj = checkListsCounts.value
  for (const key in obj) {
    props[key] = obj[key].isDone
  }
  return props
})
// 高さ調整
function adjust(event, index) {
  event.target.style.height = "auto"
  adjustHeight(event, index)
}
// 詳細ボタン
function showCheckLists(categoryId) {
  currentCategoryId.value = categoryId
  useChangeRoute(route, router, 'checkList')
}
// 入替ボタン
function change(index, direction) {
  changeOrder(index, direction)
  registerCategory(user.value.uid)
}
// 削除ボタン
function deleteCategory(category) {
  removeCategory(category.id)
  bulkRemoveCheckList(category.id)
  registerCategory(user.value.uid)
  registerCheckList(user.value.uid)
}
// 追加
function add() {
  addCategory()
  registerCategory(user.value.uid)
}
// マウント
onMounted(async () => {
  await setUser()
  getCategoryId(user.value.uid)
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
  min-height: calc(100svh - 9.2rem);
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
}

.delete-dialog {
  .inner {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin: 2.4rem 0;
    width: 100%;
  }

  .instruction {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;

    & .title {
      font-weight: bold;
      font-size: 2.2rem;
    }

    & .text {
      line-height: 1.43;
      word-break: break-all;
    }
  }

  .buttons {
    display: flex;
    gap: 0.8rem;
    justify-content: center;

    & button {
      min-width: 10.4rem;
    }
  }
}
</style>