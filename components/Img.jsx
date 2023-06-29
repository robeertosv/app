import { StyleSheet, View, Image } from 'react-native'
import React from 'react'

const Img = ({imgUrl, selectedImage}) => {
  const imageSource = selectedImage !== null ? {uri: selectedImage} : imgUrl
  return (
    <Image source={imageSource} style={styles.image} />
  )
}

export default Img

const styles = StyleSheet.create({
  image: {
      width: 220,
      height: 440,
      borderRadius: 18
    }
})

