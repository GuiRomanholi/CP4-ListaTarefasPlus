import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { addTask, deleteTask, listenTasks, toggleTask, type Task } from '../services/tasks';
import { useAuth } from '../auth/AuthContext';

export default function Home() {
  const { colors, mode, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const unsub = listenTasks(setTasks);
    return unsub;
  }, []);

  const handleAdd = async () => {
    const t = title.trim();
    if (!t) return;
    await addTask(t);
    setTitle('');
  };

  const handleToggle = async (item: Task) => {
    await toggleTask(item.id, !item.completed);
  };

  const handleDelete = async (item: Task) => {
    Alert.alert('Excluir', 'Deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => await deleteTask(item.id) }
    ]);
  };

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Minhas tarefas</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
            <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={colors.link} />
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} style={styles.iconBtn}>
            <Ionicons name="log-out-outline" size={22} color={colors.link} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputRow}>
        <Ionicons name="add-outline" size={20} color={colors.muted} style={styles.leftIcon} />
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44 }]}
          placeholder="Nova tarefa"
          placeholderTextColor={colors.muted}
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAdd} style={[styles.addBtn, { backgroundColor: colors.primary }]}>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
        ItemSeparatorComponent={() => <View style={[styles.sep, { borderColor: colors.inputBorder }]} />}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
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
            <Text style={{ color: colors.muted, marginTop: 6 }}>Sem tarefas por aqui</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    safe: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
    title: { fontSize: 22, fontWeight: '700' },
    headerActions: { flexDirection: 'row', gap: 8 },
    iconBtn: { padding: 6 },
    inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 12, gap: 8 },
    input: { flex: 1, borderWidth: 1, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, fontSize: 16 },
    leftIcon: { position: 'absolute', left: 28, zIndex: 2 },
    addBtn: { paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    sep: { borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 20 },
    item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, marginHorizontal: 20, borderRadius: 12, borderWidth: 1, marginVertical: 6 },
    checkBtn: { paddingRight: 10 },
    itemText: { flex: 1, fontSize: 16 },
    deleteBtn: { paddingLeft: 10 },
    empty: { alignItems: 'center', marginTop: 40 }
  });
