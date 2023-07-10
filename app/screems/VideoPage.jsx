import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import { getFirestore, collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function VideoPage({ route }) {
  const [videos, setVideos] = useState([]);
  const { title, personId } = route.params;
  const [personName, setPersonName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [parentalControlEnabled, setParentalControlEnabled] = useState(false);
  const [passwordInputVisible, setPasswordInputVisible] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPersonName = async () => {
      try {
        const docRef = doc(FIREBASE_DB, 'pessoa', personId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPersonName(data.name);
          setPassword(data.password);
          setProfileImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.log('Error fetching person name:', error);
      }
    };

    fetchPersonName();
  }, [personId]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(collection(FIREBASE_DB, title));
        const querySnapshot = await getDocs(q);

        const videosData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            videoUrl: data.videoUrl,
            thumbnail: data.thumbnail,
          };
        });

        setVideos(videosData);
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [title]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (parentalControlEnabled) {
          return true; // Prevent going back if parental control is enabled
        }
        return false; // Allow going back if parental control is disabled
      };

      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        if (onBackPress()) {
          // Prevent leaving the page if parental control is enabled
          e.preventDefault();
        }
      });

      return unsubscribe;
    }, [navigation, parentalControlEnabled])
  );

  const handleThumbnailPress = (video) => {
    setSelectedVideo(video);
  };

  const toggleParentalControl = () => {
    if (parentalControlEnabled) {
      // Disable parental control
      setParentalControlEnabled(false);
      setPasswordInputVisible(false);
      setEnteredPassword('');
    } else {
      // Enable parental control - Prompt for password
      setPasswordInputVisible(true);
    }
  };

  const validatePassword = () => {
    if (enteredPassword === password) {
      setParentalControlEnabled(true);
      setPasswordInputVisible(false);
    } else {
      Alert.alert('Password incorrecta', 'Por favor digite a password correcta.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <Switch
          trackColor={{ false: '#767577', true: 'white' }}
          thumbColor={parentalControlEnabled ? 'red' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleParentalControl}
          value={parentalControlEnabled}
          style={styles.switch}
        />
      </View>

      {passwordInputVisible && (
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite a password"
            secureTextEntry
            value={enteredPassword}
            onChangeText={setEnteredPassword}
          />
          <TouchableOpacity style={styles.submitButton} onPress={validatePassword}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.container}>
        {videos.map((video) => (
          <View key={video.id} style={styles.videoContainer}>
            <TouchableOpacity onPress={() => handleThumbnailPress(video)}>
              <View style={styles.thumbnailContainer}>
                {selectedVideo && selectedVideo.id === video.id ? null : (
                  <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                )}
                {selectedVideo && selectedVideo.id === video.id ? null : (
                  <Ionicons name="play" size={50} color="white" style={styles.playIcon} />
                )}
              </View>
              <Text style={styles.videoTitle}>{video.title}</Text>
            </TouchableOpacity>
            {selectedVideo && selectedVideo.id === video.id && (
              <>
                <Video
                  source={{ uri: video.videoUrl }}
                  style={styles.video}
                  useNativeControls
                  resizeMode="contain"
                />
              </>
            )}
          </View>
        ))}
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    marginTop: '15%',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    paddingTop: 15,
    paddingLeft: 10,
  },
  switch: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  videoContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'red',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  video: {
    width: '100%',
    height: 200,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },
  passwordInputContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  passwordInput: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});  