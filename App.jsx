import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Img from './components/Img'
import Button from './components/Button'
import * as ImagePicker from 'expo-image-picker'
import { useState, useRef } from 'react'
import CircleButton from './components/CircleButton'
import IconButton from './components/IconButton'
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from './components/EmojiList'
import EmojiSticker from './components/EmojiSticker'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'

const imgUrl = require('./assets/images/background-image.png')
const App = () => {
  const [status, requesPermission] = MediaLibrary.usePermissions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const imageRef = useRef();

  if (status === null) { requesPermission() }

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1
      })

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!")
      }
    } catch (e) {
      console.log(e)
    }
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert('No has elegido ninguna imagen');
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>


      <View style={styles.imgContainer}>
        <View ref={imageRef} collapsable={false}>
          <Img imgUrl={imgUrl} selectedImage={selectedImage} />
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>

      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a picture" theme="primary" onPress={pickImage} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style='light' />
    </GestureHandlerRootView>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default App

