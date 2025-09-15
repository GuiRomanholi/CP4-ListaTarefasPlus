import { auth, db } from './firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';

export type Task = {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  createdAt?: any;
  updatedAt?: any;
};

const tasksCol = (uid: string) => collection(db, 'users', uid, 'tasks');

export function listenTasks(cb: (tasks: Task[]) => void) {
  const uid = auth.currentUser?.uid;
  if (!uid) return () => {};
  const q = query(tasksCol(uid), orderBy('createdAt', 'desc'));
  return onSnapshot(q, snap => {
    const items: Task[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Task, 'id'>) }));
    cb(items);
  });
}

export async function addTask(title: string, notes?: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  await addDoc(tasksCol(uid), {
    title,
    notes: notes || '',
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function toggleTask(id: string, completed: boolean) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  await updateDoc(doc(db, 'users', uid, 'tasks', id), { completed, updatedAt: serverTimestamp() });
}

export async function updateTask(id: string, data: Partial<Omit<Task, 'id'>>) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  await updateDoc(doc(db, 'users', uid, 'tasks', id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteTask(id: string) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  await deleteDoc(doc(db, 'users', uid, 'tasks', id));
}
