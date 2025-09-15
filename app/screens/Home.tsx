import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { addTask, deleteTask, listenTasks, toggleTask, type Task } from '../services/tasks';
import { useAuth } from '../auth/AuthContext';
import { useHolidays } from '../hooks/useHolidays';
import { useTranslation } from 'react-i18next'; // Importe o hook

export default function Home() {
  const { colors, mode, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const { t, i18n } = useTranslation(); // Use o hook
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const { data: holidays, isLoading: isLoadingHolidays, error: holidaysError } = useHolidays();

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
    Alert.alert(t('alerts.deleteTaskTitle'), t('alerts.deleteTaskMessage'), [
      { text: t('alerts.cancel'), style: 'cancel' },
      { text: t('alerts.delete'), style: 'destructive', onPress: async () => await deleteTask(item.id) }
    ]);
  };

  const styles = getStyles(colors);
  const currentLanguage = i18n.language;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{t('home.title')}</Text>
        <View style={styles.headerActions}>
          {/* Botões de Idioma */}
          <TouchableOpacity onPress={() => i18n.changeLanguage('pt')} style={[styles.langButton, currentLanguage === 'pt' && styles.langButtonActive]}>
            <Text style={[styles.langText, { color: colors.text }, currentLanguage === 'pt' && styles.langTextActive]}>PT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => i18n.changeLanguage('en')} style={[styles.langButton, currentLanguage === 'en' && styles.langButtonActive]}>
            <Text style={[styles.langText, { color: colors.text }, currentLanguage === 'en' && styles.langTextActive]}>EN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleTheme} style={styles.iconBtn}>
            <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={colors.link} />
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} style={styles.iconBtn}>
            <Ionicons name="log-out-outline" size={22} color={colors.link} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.holidaysContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('home.holidaysTitle')}</Text>
        {isLoadingHolidays && <ActivityIndicator color={colors.primary} />}
        {holidaysError && <Text style={{ color: 'red' }}>{t('alerts.errorLoadingHolidays')}</Text>}
        {holidays && (
          <FlatList
            data={holidays.slice(0, 5)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name + item.date.iso}
            renderItem={({ item }) => (
              <View style={[styles.holidayItem, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
                <Text style={[styles.holidayName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.holidayDate, { color: colors.muted }]}>{new Date(item.date.iso).toLocaleDateString()}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        )}
      </View>

      <View style={styles.inputRow}>
        <Ionicons name="add-outline" size={20} color={colors.muted} style={styles.leftIcon} />
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44 }]}
          placeholder={t('home.newTaskPlaceholder')}
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
            <Text style={{ color: colors.muted, marginTop: 6 }}>{t('home.emptyList')}</Text>
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
    headerActions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
    iconBtn: { padding: 6 },
    langButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.inputBorder },
    langButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    langText: { fontWeight: '600' },
    langTextActive: { color: '#fff' },
    inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 12, gap: 8 },
    input: { flex: 1, borderWidth: 1, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, fontSize: 16 },
    leftIcon: { position: 'absolute', left: 28, zIndex: 2 },
    addBtn: { paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    sep: { borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 20 },
    item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, marginHorizontal: 20, borderRadius: 12, borderWidth: 1, marginVertical: 6 },
    checkBtn: { paddingRight: 10 },
    itemText: { flex: 1, fontSize: 16 },
    deleteBtn: { paddingLeft: 10 },
    empty: { alignItems: 'center', marginTop: 40 },
    holidaysContainer: { paddingVertical: 12 },
    sectionTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 20, marginBottom: 8 },
    holidayItem: { borderRadius: 12, padding: 12, marginRight: 10, minWidth: 150, borderWidth: 1 },
    holidayName: { fontSize: 14, fontWeight: '600' },
    holidayDate: { fontSize: 12, marginTop: 4 },
  });