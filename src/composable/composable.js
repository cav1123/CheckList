// Firebase
import { doc, getDoc, setDoc } from "firebase/firestore"
import Firebase from "../firebase_settings/index.js"
const db = Firebase.db

// ルーティング
export function useChangeRoute(route, router, to) {
    const from = route.path
    if (from !== to) {
        router.push(to)
    } else {
        window.location.reload()
    }
}
// Firebase登録
export async function useRegisterDb(uid, fieldName, values) {
    const docRef = doc(db, 'userData', uid)
    try {
        await setDoc(docRef, {
            [fieldName]: values
        }, { merge: true })
    } catch (error) {
        console.error(error)
        alert("エラーが発生しました")
    }
}
// Firebase取得
export async function useGetDb(uid, fieldName) {
    try {
        const docRef = doc(db, 'userData', uid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.get(fieldName)) return new Array(0)
        else return docSnap.get(fieldName)
    } catch (error) {
        alert('取得失敗')
        console.error(error)
    }
}