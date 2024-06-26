<template>
    <header class="header">
        <div class="container">
            <h1 @click="useChangeRoute(route, router, '/')">CheckList</h1>
            <div class="flex-row">
                <span class="initial">{{ user.email.substring(0, 1).toUpperCase() }}</span>
                <nav class="nav">
                    <ul class="nav-list">
                        <li>
                            <button popovertarget="help-modal" popovertargetaction="show"
                                class="material-symbols-rounded icon-btn-secondary icon-btn-md icon-btn-br-infinity">help</button>
                            <PopoverComponent id="help-modal" class="help-modal">
                                <div class="inner">
                                    <div class="buttons">
                                        <button popovertarget="help-modal" popovertargetaction="hide"
                                            class="material-symbols-rounded icon-btn-secondary icon-btn-lg icon-btn-br-infinity">close</button>
                                    </div>
                                    <dl class="definition">
                                        <dt class="term"><span class="material-symbols-rounded">help</span>リスト削除</dt>
                                        <dd class="description">リストを左にスクロール（スワイプ）すると削除ボタンが表示されます。</dd>
                                    </dl>
                                </div>
                            </PopoverComponent>
                        </li>
                        <li>
                            <button popovertarget="logout-dialog" popovertargetaction="show"
                                class="material-symbols-rounded icon-btn-secondary icon-btn-md icon-btn-br-infinity">logout</button>
                            <PopoverComponent id="logout-dialog" class="logout-dialog">
                                <div class="inner">
                                    <div class="instruction">
                                        <span class="title">ログアウト</span>
                                    </div>
                                    <div class="buttons">
                                        <button popovertarget="logout-dialog" popovertargetaction="hide"
                                            class="btn-secondary btn-lg btn-br-4">戻る</button>
                                        <button @click="logOut()" class="btn-primary btn-lg btn-br-4">ログアウト</button>
                                    </div>
                                </div>
                            </PopoverComponent>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <PopoverComponent id="help-modal">
        <button popovertarget="help-modal" popovertargetaction="hide">閉じる</button>
    </PopoverComponent>
</template>

<script setup>
// Firebase
import { signOut } from "firebase/auth";
import Firebase from "../firebase_settings/index"
const auth = Firebase.auth
// router
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { useChangeRoute } from '../composable/composable'
// Stores
import { storeToRefs } from 'pinia'
// Components
import PopoverComponent from './PopoverComponent.vue'
// ユーザーストア
import { useUserStore } from '../stores/stores'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

// ログアウト処理
function logOut() {
    signOut(auth)
        .then(() => router.push('/login')
        ).catch(error => {
            console.error(error)
            alert('ログアウト失敗')
        })
}
</script>

<style scoped>
.header {
    padding: 0.8rem 1.6rem;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .flex-row {
        gap: 0.4rem;
    }
}

h1 {
    font-family: var(--font-english);
    font-weight: bold;
    font-size: 2.2rem;
    cursor: pointer;
}

.initial {
    font-weight: bold;
    background-color: var(--color-gray-l4);
    height: 3.2rem;
    width: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.nav-list {
    display: flex;
    gap: 0.4rem;
}

.help-modal {
    .inner {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        margin-bottom: 2.4rem;
    }

    .buttons{
        text-align: right;
    }

    .definition {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .term {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-weight: bold;
        line-height: 1.43;
    }

    .description {
        line-height: 1.43;
    }
}

.logout-dialog {
    .inner {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
        margin: 2.4rem 0;
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