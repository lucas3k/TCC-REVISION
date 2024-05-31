import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAllPathImages, saveImagePaths } from '../../database/config';

export default function Search() {
  const [images, setImages] = useState([null, null, null, null]);
  const [names, setNames] = useState(['Nome 1', 'Nome 2', 'Nome 3', 'Nome 4']);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchProjectImages = async () => {
      try {
        const allImages = await getAllPathImages()
        allImages.forEach((image) => {
          const index = image.project_id - 1;
          const newImages = [...images];
          newImages[index] = image.path;
          setImages(newImages);
        })
      } catch (error) {
        console.error('Failed to fetch project images:', error);
      }
    };

    fetchProjectImages();
  }, []);

  const selectImage = async (index) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        const newImages = [...images];
        newImages[index] = result.assets[0].uri;
        setImages(newImages);

        // Salvando as imagens no banco de dados
        const projectId = index + 1; // Considerando que os IDs dos projetos são 1, 2, 3, 4
        await saveImagePaths(projectId, [result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Erro ao selecionar imagem', error.message);
    }
  };

  const handleEditName = (index) => setEditingIndex(index);

  const handleNameChange = (index, newName) => {
    const newNames = [...names];
    newNames[index] = newName;
    setNames(newNames);
    if (newName.includes('\n')) {
      setEditingIndex(null);
    }
  };

  const showTips = () => {
    Alert.alert(
      'Dicas',
      'Aqui você pode visualizar os projetos que criou em "Novos Projetos", pode adicionar fotos maravilhosas apenas clicando no circulo e para visualizar o projeto basta clicar no botão visualizar',
      [
        {
          text: 'OK',
          onPress: () => console.log('Dicas exibidas'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const handleViewProject = (index) => {
    console.log(`Visualizando projeto ${index + 1}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.tipsButton} onPress={showTips}>
            <Text style={styles.tipsButtonText}>Dicas</Text>
          </TouchableOpacity>
          <View style={styles.grid}>
            {[0, 1, 2, 3].map((index) => (
              <View key={index} style={styles.gridItem}>
                <TouchableOpacity onPress={() => selectImage(index)}>
                  <View style={styles.photoWrapper}>
                    <View style={styles.circle}>
                      {images[index] ? (
                        <Image source={{ uri: images[index] }} style={styles.image} />
                      ) : (
                        <Text>+</Text>
                      )}
                    </View>
                    <View style={styles.nameWrapper}>
                      {editingIndex === index ? (
                        <TextInput
                          style={[styles.input, { height: 40 }]}
                          value={names[index]}
                          onChangeText={(text) => handleNameChange(index, text)}
                          onBlur={() => setEditingIndex(null)}
                        />
                      ) : (
                        <>
                          <Text style={styles.name}>{names[index]}</Text>
                          <TouchableOpacity onPress={() => handleEditName(index)}>
                            <FontAwesome name="pencil" size={20} color="black" style={styles.editIcon} />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                    <TouchableOpacity onPress={() => handleViewProject(index)}>
                      <Text style={styles.viewProject}>Visualizar</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
  },
  tipsButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  tipsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  photoWrapper: {
    alignItems: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameWrapper: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    marginRight: 5,
  },
  input: {
    fontSize: 16,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 5,
    flex: 1,
  },
  editIcon: {
    marginLeft: 5,
  },
  viewProject: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
