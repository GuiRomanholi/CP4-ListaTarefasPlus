import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  createdAt?: number;
  updatedAt?: number;
};

const KEY = '@tasks';
const listeners: Array<(tasks: Task[]) => void> = [];

async function load(): Promise<Task[]> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

async function save(tasks: Task[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  listeners.forEach(l => l(tasks));
}

export async function addTask(title: string, notes?: string) {
  const tasks = await load();
  const now = Date.now();
  tasks.unshift({ id: String(now), title, notes: notes || '', completed: false, createdAt: now, updatedAt: now });
  await save(tasks);
}

export async function toggleTask(id: string, completed: boolean) {
  const tasks = await load();
  const now = Date.now();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) tasks[idx] = { ...tasks[idx], completed, updatedAt: now };
  await save(tasks);
}

export async function updateTask(id: string, data: Partial<Omit<Task, 'id'>>) {
  const tasks = await load();
  const now = Date.now();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx !== -1) tasks[idx] = { ...tasks[idx], ...data, updatedAt: now };
  await save(tasks);
}

export async function deleteTask(id: string) {
  const tasks = await load();
  await save(tasks.filter(t => t.id !== id));
}

export function listenTasks(cb: (tasks: Task[]) => void) {
  let active = true;
  load().then(t => active && cb(t));
  listeners.push(cb);
  return () => {
    const i = listeners.indexOf(cb);
    if (i >= 0) listeners.splice(i, 1);
  };
}
