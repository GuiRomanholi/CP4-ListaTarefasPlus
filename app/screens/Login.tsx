import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { useTranslation } from 'react-i18next';
import { FirebaseError } from 'firebase/app';
import GoogleSignInButton from '../components/ButtonGoogle';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const { colors, toggleTheme, mode } = useTheme();
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const styles = getStyles(colors);

  const handleEntrar = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) { Alert.alert(t('alerts.error'), t('alerts.invalidEmail')); return; }
    if (!senha) return;
    try {
      await signIn(email, senha);
    } catch (e: any) {
        if (e instanceof FirebaseError && (e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password')) {
            Alert.alert(t('alerts.error'), t('alerts.invalidCredentials'));
        } else {
            Alert.alert(t('alerts.error'), e?.message || 'Falha no login');
        }
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={colors.link} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={[styles.titulo, { color: colors.text }]}>{t('auth.login')}</Text>

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
              returnKeyType="next"
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
              returnKeyType="done"
              onSubmitEditing={handleEntrar}
            />
            <Ionicons name="lock-closed-outline" size={18} color={colors.muted} style={styles.leftIcon} />
            <TouchableOpacity onPress={() => setMostrarSenha(s => !s)} style={styles.rightIconBtn} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Ionicons name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.link} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.btnPrimario, { backgroundColor: colors.primary }]} onPress={handleEntrar} activeOpacity={0.8}>
          <Text style={styles.btnPrimarioTxt}>{t('auth.login')}</Text>
        </TouchableOpacity>

        <GoogleSignInButton />

        <View style={styles.rodape}>
          <Text style={{ color: colors.muted }}>{t('auth.noAccount')}</Text>
          <Text onPress={() => navigation.navigate('Cadastro')} style={[styles.link, { color: colors.link }]} accessibilityRole="button">
             {t('auth.createAccount')}
          </Text>
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
    btnPrimario: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    btnPrimarioTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
    rodape: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8, gap: 4 },
    link: { fontWeight: '700' },
    themeToggle: { position: 'absolute', right: 16, top: 44, zIndex: 3 }
  });