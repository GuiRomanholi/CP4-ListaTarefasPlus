import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const { colors, toggleTheme, mode } = useTheme();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={colors.link} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={[styles.titulo, { color: colors.text }]}>Entrar</Text>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.inputBg,
                  borderColor: colors.inputBorder,
                  paddingLeft: 44
                }
              ]}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={colors.muted}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Ionicons
              name="mail-outline"
              size={18}
              color={colors.muted}
              style={styles.leftIcon}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.inputBg,
                  borderColor: colors.inputBorder,
                  paddingLeft: 44,
                  paddingRight: 44
                }
              ]}
              placeholder="••••••••"
              placeholderTextColor={colors.muted}
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color={colors.muted}
              style={styles.leftIcon}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(s => !s)} style={styles.rightIconBtn}>
              <Ionicons name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.link} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.btnPrimario, { backgroundColor: colors.primary }]} onPress={() => {}}>
          <Text style={styles.btnPrimarioTxt}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <Text style={{ color: colors.muted }}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={[styles.link, { color: colors.link }]}> Criar conta</Text>
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
    themeToggle: { position: 'absolute', right: 16, top: 44, zIndex: 3 }
  });
