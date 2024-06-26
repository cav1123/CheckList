<template>
    <main>
        <span class="title">CheckList</span>
        <div class="form">
            <div class="form-item">
                <label for="email">アカウント</label>
                <div class="input-wrapper email">
                    <input type="email" id="email" v-model="email" placeholder="ID または メールアドレス">
                </div>
            </div>
            <div class="form-item">
                <label for="password">パスワード</label>
                <div class="input-wrapper password">
                    <input type="password" id="password" v-model="password" placeholder="6文字以上のパスワード">
                </div>
            </div>
            <span v-if="errorMessage" class="errorMessage"><span class="material-symbols-rounded">error</span> {{
                errorMessage }}</span>
            <div class="buttons">
                <button type="submit" @click="logIn" :disabled="!email || !password"
                    class="btn-primary btn-lg btn-br-4"><span class="material-symbols-rounded">login</span>ログイン</button>
                <button type="submit" @click="signUp" :disabled="!email || !password"
                    class="btn-secondary btn-lg btn-br-4"><span
                        class="material-symbols-rounded">edit</span>新規登録</button>
            </div>
        </div>
    </main>
</template>

<script setup>
// Vue
import { onMounted, ref } from 'vue'
// Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Firebase from "../firebase_settings/index.js"
const auth = Firebase.auth
// Router
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
import { useChangeRoute } from '../composable/composable.js'
// Stores
import { storeToRefs } from 'pinia'

// ユーザーストア
import { useUserStore } from '../stores/stores.js'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const email = ref('')
const password = ref('')
const errorMessage = ref('')
// 新規登録
function signUp() {
    if (existBlanks()) return
    errorMessage.value = ""
    const myEmail = email.value
    const myPassword = password.value
    password.value = ""
    createUserWithEmailAndPassword(auth, myEmail, myPassword)
        .then((userCredential) => {
            user.value = userCredential.user;
            useChangeRoute(route, router, '/')
        })
        .catch(error => {
            console.log(error.code)
            judgeErrorCode(error.code)
        })
}
// ログイン
function logIn() {
    if (existBlanks()) return
    errorMessage.value = ""
    const myEmail = email.value
    const myPassword = password.value
    password.value = ""
    signInWithEmailAndPassword(auth, myEmail, myPassword)
        .then(userCredential => {
            user.value = userCredential.user
            useChangeRoute(route, router, '/')
        })
        .catch(error => {
            console.log(error.code)
            judgeErrorCode(error.code)
        })
}
// 未入力チェック
function existBlanks() {
    if (email.value === undefined || email.value === "" || password.value === undefined || password.value === "") {
        errorMessage.value = 'IDまたはパスワードが未入力です'
        return true
    }
    return false
}
// エラー判定
function judgeErrorCode(errorCode) {
    switch (String(errorCode)) {
        case 'auth/email-already-in-use':
            errorMessage.value = "アカウントは既に使用されています。"
            break;
        case 'auth/invalid-email':
        case 'auth/user-disabled':
            errorMessage.value = "無効なメールアドレスです。"
            break;
        case 'auth/operation-not-allowed':
            errorMessage.value = "無効なアカウントです。"
            break;
        case 'auth/weak-password':
            errorMessage.value = "パスワードは6文字以上で設定してください。"
            break;
        case 'auth/user-not-found':
            errorMessage.value = "アカウントが存在しません。"
            break;
        case 'auth/wrong-password':
            errorMessage.value = "パスワードが違います。"
            break;
        case 'auth/too-many-requests':
            errorMessage.value = "リクエスト数が最大数を超えています。"
            break;
        default:
            errorMessage.value = "認証に失敗しました。"
            break;
    }
}
onMounted(() => {
    console.log("ninomiya.takuya.860514@gmail.com")
    console.log("nino860514")
}
)
</script>

<style scoped>
main {
    height: 100vh;
    background: url(/src/assets/image.jpg) center / cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.title {
    font-family: var(--font-english);
    font-weight: bold;
    font-size: 2.2rem;
    color: var(--color-white);
    text-align: center;
    padding: 4rem;
}

.form {
    padding: 2.4rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    justify-content: flex-end;
}

.form-item {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

label {
    color: var(--color-white);
}

.input-wrapper {
    position: relative;

    &::before {
        font-family: "Material Symbols Rounded";
        font-size: 2.4rem;
        position: absolute;
        top: 50%;
        left: 1.6rem;
        translate: 0 -50%;
    }
}

.email {
    &:before {
        content: "\e158";
    }
}

.password {
    &:before {
        content: "\e73c";
    }
}

input {
    padding: 1.6rem 4.8rem;
    width: 100%;
}

.errorMessage {
    color: var(--color-white);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background-color: var(--color-deep-orange);
    padding: 0.8rem;
    border-radius: 0.4rem;

    & .material-symbols-rounded {
        color: var(--color-white);
    }
}

.buttons {
    display: flex;
    gap: 0.8rem;
    margin-top: 0.8rem;
}

.btn-primary {
    & span {
        color: var(--color-white);
    }
}

.btn-lg {
    flex-grow: 1;
}
</style>