import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: number;
  updatedAt: number;
};

const KEY = 'tasks';

function getTasksCollection() {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  return collection(db, 'users', user.uid, KEY);
}

export async function addTask(
  title: string,
  description?: string,
  dueDate?: string,
) {
  const now = Date.now();
  await addDoc(getTasksCollection(), {
    title,
    description: description || '',
    completed: false,
    dueDate: dueDate || null,
    createdAt: now,
    updatedAt: now,
  });
}

export async function toggleTask(id: string, completed: boolean) {
  const now = Date.now();
  await updateDoc(doc(getTasksCollection(), id), { completed, updatedAt: now });
}

export async function updateTask(id: string, data: Partial<Omit<Task, 'id'>>) {
  const now = Date.now();
  await updateDoc(doc(getTasksCollection(), id), { ...data, updatedAt: now });
}

export async function deleteTask(id: string) {
  await deleteDoc(doc(getTasksCollection(), id));
}

export function listenTasks(cb: (tasks: Task[]) => void) {
  const user = auth.currentUser;
  if (!user) return () => {};

  const q = query(
    collection(db, 'users', user.uid, KEY),
    orderBy('createdAt', 'desc'),
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() } as Task);
    });
    cb(tasks);
  });

  return unsubscribe;
}