import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function Cadastro({ navigation }: Props) {
  const { colors, toggleTheme, mode } = useTheme();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const styles = getStyles(colors);

  const handleCadastrar = async () => {
    if (!nome.trim()) { Alert.alert('Nome obrigatório', 'Informe seu nome.'); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { Alert.alert('E-mail inválido', 'Digite um e-mail válido.'); return; }
    if (senha.length < 6) { Alert.alert('Senha fraca', 'Use pelo menos 6 caracteres.'); return; }
    if (senha !== confirmar) { Alert.alert('Senhas diferentes', 'A confirmação precisa ser igual.'); return; }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(cred.user, { displayName: nome });
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Falha ao criar conta.');
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={colors.link} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={[styles.titulo, { color: colors.text }]}>Criar conta</Text>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>Nome</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44 }]}
              placeholder="Seu nome"
              placeholderTextColor={colors.muted}
              value={nome}
              onChangeText={setNome}
            />
            <Ionicons name="person-outline" size={18} color={colors.muted} style={styles.leftIcon} />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44 }]}
              placeholder="seuemail@exemplo.com"
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
          <Text style={[styles.label, { color: colors.label }]}>Senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44, paddingRight: 44 }]}
              placeholder="••••••••"
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

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.label }]}>Confirmar senha</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, paddingLeft: 44 }]}
              placeholder="••••••••"
              placeholderTextColor={colors.muted}
              secureTextEntry={!mostrarSenha}
              value={confirmar}
              onChangeText={setConfirmar}
            />
            <Ionicons name="lock-closed-outline" size={18} color={colors.muted} style={styles.leftIcon} />
          </View>
        </View>

        <TouchableOpacity style={[styles.btnPrimario, { backgroundColor: colors.primary }]} onPress={handleCadastrar}>
          <Text style={styles.btnPrimarioTxt}>Criar conta</Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <Text style={{ color: colors.muted }}>Já tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.link, { color: colors.link }]}> Entrar</Text>
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
