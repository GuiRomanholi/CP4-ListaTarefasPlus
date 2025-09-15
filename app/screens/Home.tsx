import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../theme/ThemeContext'
import { addTask, deleteTask, listenTasks, toggleTask, type Task } from '../services/tasks'
import { useAuth } from '../auth/AuthContext'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { colors, mode, toggleTheme } = useTheme()
  const { signOut } = useAuth()
  const { t } = useTranslation()
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const styles = getStyles(colors)

  useEffect(() => {
    const unsub = listenTasks(setTasks)
    return () => unsub()
  }, [])

  async function handleAdd() {
    const v = title.trim()
    if (!v) return
    await addTask(v)
    setTitle('')
  }

  async function handleToggle(item: Task) {
    await toggleTask(item.id, !item.completed)
  }

  async function handleDelete(item: Task) {
    Alert.alert(t('delete'), item.title, [
      { text: t('cancel'), style: 'cancel' },
      { text: t('delete'), style: 'destructive', onPress: () => deleteTask(item.id) }
    ])
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{t('tasks')}</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity onPress={toggleTheme} accessibilityLabel="theme">
            <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} accessibilityLabel="logout">
            <Ionicons name="log-out-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={t('placeholderTask')}
          placeholderTextColor={colors.muted}
          style={[styles.input, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg, color: colors.text }]}
        />
        <TouchableOpacity onPress={handleAdd} style={[styles.addBtn, { backgroundColor: colors.primary }]} accessibilityRole="button">
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={i => i.id}
        contentContainerStyle={tasks.length === 0 ? { flex: 1 } : undefined}
        renderItem={({ item }) => (
          <View style={[styles.item, { borderColor: colors.inputBorder }]}>
            <TouchableOpacity onPress={() => handleToggle(item)} style={styles.checkBtn}>
              <Ionicons name={item.completed ? 'checkbox' : 'square-outline'} size={22} color={item.completed ? colors.primary : colors.muted} />
            </TouchableOpacity>
            <Text style={[styles.itemText, { color: colors.text, textDecorationLine: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1 }]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={20} color={colors.link} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="checkmark-done-outline" size={36} color={colors.muted} />
            <Text style={{ color: colors.muted, marginTop: 6 }}>{t('emptyList')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    safe: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
    title: { fontSize: 22, fontWeight: '700' },
    inputRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginTop: 12, marginBottom: 8 },
    input: { flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16 },
    addBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
    item: { marginHorizontal: 20, marginVertical: 6, padding: 12, borderRadius: 10, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    itemText: { flex: 1, fontSize: 16 },
    checkBtn: { padding: 4 },
    deleteBtn: { padding: 4 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' }
  })
