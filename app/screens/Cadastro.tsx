import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { FirebaseError } from 'firebase/app';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function Cadastro({ navigation }: Props) {
  const { colors } = useTheme();
  const { signUp } = useAuth();
  const { t } = useTranslation(); 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const styles = getStyles(colors);

  const handleCriarConta = async () => {
    if (!nome.trim()) { Alert.alert(t('alerts.error'), t('alerts.nameRequired')); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { Alert.alert(t('alerts.error'), t('alerts.invalidEmail')); return; }
    if (senha.length < 6) { Alert.alert(t('alerts.error'), t('alerts.passwordTooShort')); return; }

    try {
      await signUp(nome, email, senha);
    } catch (e: any) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/email-already-in-use') {
            Alert.alert(t('alerts.error'), t('alerts.emailInUse'));
        } else {
            Alert.alert(t('alerts.error'), t('alerts.signupError'));
        }
      } else {
        Alert.alert(t('alerts.error'), e?.message || 'Ocorreu um erro desconhecido.');
      }
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: colors.text }]}>{t('auth.createAccount')}</Text>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>{t('auth.name')}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44 }]}
              placeholder={t('auth.namePlaceholder')}
              placeholderTextColor={colors.muted}
              value={nome}
              onChangeText={setNome}
            />
            <Ionicons name="person-outline" size={18} color={colors.muted} style={styles.leftIcon} />
          </View>
        </View>
        
        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>{t('auth.email')}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44 }]}
              placeholder={t('auth.emailPlaceholder')}
              placeholderTextColor={colors.muted}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Ionicons name="mail-outline" size={18} color={colors.muted} style={styles.leftIcon} />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>{t('auth.password')}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44, paddingRight: 44 }]}
              placeholder={t('auth.passwordPlaceholder')}
              placeholderTextColor={colors.muted}
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <Ionicons name="lock-closed-outline" size={18} color={colors.muted} style={styles.leftIcon} />
            <TouchableOpacity onPress={() => setMostrarSenha(s => !s)} style={styles.rightIconBtn}>
              <Ionicons name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.link} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.btnPrimario, { backgroundColor: colors.primary }]} onPress={handleCriarConta}>
          <Text style={styles.btnPrimarioTxt}>{t('auth.createAccount')}</Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <Text style={{ color: colors.muted }}>{t('auth.haveAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.link, { color: colors.link }]}> {t('auth.login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    safe: { flex: 1 },
    container: { flex: 1, padding: 20, gap: 16, justifyContent: 'center' },
    titulo: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
    field: { gap: 6 },
    label: { fontSize: 14 },
    inputWrapper: { position: 'relative' },
    input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16 },
    leftIcon: { position: 'absolute', left: 12, top: 14, zIndex: 2 },
    rightIconBtn: { position: 'absolute', right: 10, top: 10, padding: 6 },
    btnPrimario: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
    btnPrimarioTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
    rodape: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
    link: { fontWeight: '600' },
  });