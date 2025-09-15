import { TouchableOpacity, Text, StyleSheet } from 'react-native';
export default function ButtonGoogle() {
  return (
    <TouchableOpacity style={styles.btn} disabled>
      <Text style={styles.txt}>Entrar com Google</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn:{opacity:0.6,padding:12,borderRadius:10,alignItems:'center',borderWidth:1,borderColor:'#ccc',marginTop:8},
  txt:{fontWeight:'600'}
});
