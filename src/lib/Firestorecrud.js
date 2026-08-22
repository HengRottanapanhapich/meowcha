import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore"
import { db } from "./firebaseClient"

export function subscribeToCollection(collectionName, onChange, orderByField) {
    const colRef = collection(db, collectionName)
    const q = orderByField ? query(colRef, orderBy(orderByField)) : colRef

    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        onChange(items)
    })
}

export function subscribeToDocument(collectionName, id, onChange) {
    const docRef = doc(db, collectionName, id)
    return onSnapshot(docRef, (snapshot) => {
        onChange(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null)
    })
}

export async function addDocument(collectionName, data) {
    return addDoc(collection(db, collectionName), data)
}

export async function updateDocument(collectionName, id, data) {
    return updateDoc(doc(db, collectionName, id), data)
}

export async function deleteDocument(collectionName, id) {
    return deleteDoc(doc(db, collectionName, id))
}