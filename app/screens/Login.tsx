import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../navigation'
import { useTheme } from '../theme/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../auth/AuthContext'
import { useTranslation } from 'react-i18next'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export default function Login({ navigation }: Props) {
  const { colors, toggleTheme, mode } = useTheme()
  const { signIn } = useAuth()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [show, setShow] = useState(false)
  const styles = getStyles(colors)

  async function handleSignIn() {
    await signIn(email, senha)
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={24} color={colors.text} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: colors.text }]}>{t('login')}</Text>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>{t('email')}</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color={colors.muted} style={styles.leftIcon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder={t('email')}
              placeholderTextColor={colors.muted}
              style={[styles.input, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg, color: colors.text, paddingLeft: 36 }]}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>{t('password')}</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.muted} style={styles.leftIcon} />
            <TextInput
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!show}
              placeholder={t('password')}
              placeholderTextColor={colors.muted}
              style={[styles.input, { borderColor: colors.inputBorder, backgroundColor: colors.inputBg, color: colors.text, paddingLeft: 36, paddingRight: 40 }]}
            />
            <TouchableOpacity style={styles.rightIconBtn} onPress={() => setShow(s => !s)}>
              <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleSignIn} style={[styles.btnPrimario, { backgroundColor: colors.primary }]} accessibilityRole="button">
          <Text style={styles.btnPrimarioTxt}>{t('signIn')}</Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <Text style={{ color: colors.muted }}>{t('noAccount')}</Text>
          <Text onPress={() => navigation.navigate('Cadastro')} style={[styles.link, { color: colors.link }]} accessibilityRole="button">
            {t('createAccount')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
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
    rodape: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8, gap: 4 },
    link: { fontWeight: '700' },
    themeToggle: { position: 'absolute', right: 16, top: 44, zIndex: 3 }
  })
