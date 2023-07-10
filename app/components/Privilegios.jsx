import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Price from '../components/Price';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function Privilegios({ price, description }) {

  function goToChannel() {

  }

  const navigation = useNavigation();


  let privileges = [];

  const privileges1 = [
    { description: 'Acesso a todos os canais infantis e de filmes.' },
    { description: 'Acesso parcial ao catálogo de séries.' },
    { description: 'Controlo parental para as suas crianças.' },
  ];

  const privileges2 = [
    { description: 'Acesso a todos os canais infantis e de filmes.' },
    { description: 'Acesso parcial ao catálogo de séries.' },
    { description: 'Controlo parental para as suas crianças.' },
    { description: 'Possibilidade de fazer download e assistir quando quiser.' },
    { description: '+5 canais da ZAP OU DSTV' },
  ];

  if (description == 'O pacote Starter inclui:') {
    privileges = privileges1;

  } else {
    privileges = privileges2;

  }


  return (
    <View>

      <Price preco={price}></Price>
      <Text style={styles.informationText}>{description}</Text>

      <View style={styles.privilege}>
        {privileges.map((privilege) => (
          <View style={styles.privilegios} key={privilege.description}>
            <Ionicons name="checkmark-sharp" size={24} color="red" />
            <Text style={styles.informationText2}> {privilege.description}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={goToChannel()}>
        <Text style={styles.loginButtonText}>SUBSCREVER</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  privilegios: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 15,

  },

  informationText: {
    color: 'grey',
    fontSize: 15,
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
    marginVertical: 30,
    marginHorizontal: 30,
    alignSelf: 'center',

  },
  informationText2: {

    color: 'grey',
    fontSize: 15,
    fontWeight: '400',

  },
  priceText2: {
    color: 'grey',
    fontSize: 20,
    paddingTop: 10,
  },

  loginButton: {
    width: 160,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'black',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
