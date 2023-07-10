import { React, useState, useEffect } from 'react';
import { View, ImageBackground, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';


export default function Pagamento({ route }) {

    const { personId } = route.params;
    const navigation = useNavigation();
    const [profileImageUrl, setProfileImageUrl] = useState('');


    useEffect(() => {
        const fetchPersonName = async () => {
            try {
                const docRef = doc(FIREBASE_DB, 'pessoa', personId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setProfileImageUrl(data.imageUrl);
                    console.log(profileImageUrl)
                }
            } catch (error) {
                console.log('Error fetching person name:', error);
            }
        };

        fetchPersonName();
    }, [personId]);

    function Next() {

        const registeredPersonId = personId;
        navigation.navigate('Pacotes', { personId: registeredPersonId });
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>

            <View style={styles.container}>

                <Text style={styles.title}>Adira já a um pacote para ter acesso a mais conteúdo no conforto da sua casa.</Text>

                <View style={styles.community}>

                    <Image source={profileImageUrl ? { uri: profileImageUrl } : require('../assets/loading.jpg')}
                        style={styles.circle2} />

                    <View style={styles.iconContainer}>
                        <Ionicons name="arrow-forward" size={30} color="black" />
                    </View>

                    <View style={styles.circle}>
                        <Image source={profileImageUrl ? { uri: profileImageUrl } : require('../assets/loading.jpg')}
                            style={styles.circle2} />

                    </View>

                </View>


                <Text style={styles.title}>Tenha acesso a todas as notícias, nacionais e internacionais, documentários, séries e muito mais.</Text>

                <TouchableOpacity style={styles.loginButton} onPress={Next}>
                    <Text style={styles.loginButtonText}>ADERIR</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>


    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    community: {
        flexDirection: 'row',

    },
    container: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 20,
        borderRadius: 10,
        marginLeft: 75,
        marginRight: 75,
    },
    title: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFD700',
        position: 'relative',

    },
    circle2: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: 'red',
        borderWidth: 3,
        borderColor: 'red',
        border: 1,
        border: 'solid',
        margin: 10,
        borderStyle: 'double',
        left: -5,
        top: -5
    },
    close: {
        left: -170,
        top: -25
    },
    loginButton: {
        width: 100,
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
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

