import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cadastro({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const validarEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);

  const handleCadastrar = () => {
    if (!nome.trim()) { Alert.alert('Nome obrigatório', 'Informe seu nome.'); return; }
    if (!validarEmail(email)) { Alert.alert('E-mail inválido', 'Digite um e-mail válido.'); return; }
    if (senha.length < 6) { Alert.alert('Senha fraca', 'Use pelo menos 6 caracteres.'); return; }
    if (senha !== confirmar) { Alert.alert('Senhas diferentes', 'A confirmação precisa ser igual.'); return; }
    Alert.alert('Cadastro', `Usuário ${nome} criado.`);
    navigation?.navigate?.('Login');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Criar conta</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} placeholder="Seu nome" value={nome} onChangeText={setNome} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(s => !s)} style={styles.toggleSenha}>
              <Text style={styles.toggleSenhaTxt}>{mostrarSenha ? 'Ocultar' : 'Mostrar'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry={!mostrarSenha}
            value={confirmar}
            onChangeText={setConfirmar}
          />
        </View>

        <TouchableOpacity style={styles.btnPrimario} onPress={handleCadastrar}>
          <Text style={styles.btnPrimarioTxt}>Criar conta</Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <Text style={{ color: '#666' }}>Já tem conta?</Text>
          <TouchableOpacity onPress={() => navigation?.navigate?.('Login')}>
            <Text style={styles.link}> Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20, gap: 16, justifyContent: 'center' },
  titulo: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  field: { gap: 6 },
  label: { fontSize: 14, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, backgroundColor: '#fff' },
  toggleSenha: { position: 'absolute', right: 10, top: 12, padding: 6 },
  toggleSenhaTxt: { color: '#007aff', fontSize: 14 },
  btnPrimario: { backgroundColor: '#007aff', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  btnPrimarioTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
  rodape: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  link: { color: '#007aff', fontWeight: '600' }
});
