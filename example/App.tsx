import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import ImageSelect, {useImageSelect} from '../src';

export default function App() {
  const {
    callback,
    imageSelectRef,
    isImageSelectVisible,
    openImageSelect,
    onCancel,
    selectedImages,
    clearSelectedImages,
    onRemoveSelectedImage,
    onDone,
  } = useImageSelect();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>react-native-image-select</Text>
          <View style={styles.button}>
            <Button title="Open ImagePicker" onPress={openImageSelect} />
          </View>

          <View>
            {selectedImages?.map(i => (
              <View key={i.uri}>
                <Image source={{uri: i.uri}} style={styles.image} />
                <Button
                  title="Remove image"
                  onPress={() => onRemoveSelectedImage(i.uri)}
                />
              </View>
            ))}
          </View>
          <Button title="Clear selected images" onPress={clearSelectedImages} />
          <ImageSelect
            ref={imageSelectRef}
            isVisible={isImageSelectVisible}
            onCancel={onCancel}
            onDone={onDone}
            callback={callback}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
  image: {
    width: Dimensions.get('screen').width,
    height: 600,
    marginBottom: 48,
  },
});
