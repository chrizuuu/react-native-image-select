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
    isImageSelectVisible,
    openImageSelect,
    onCancel,
    selectedImages,
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
              <Image key={i.uri} source={{uri: i.uri}} style={styles.image} />
            ))}
          </View>
          <ImageSelect
            isVisible={isImageSelectVisible}
            onCancel={onCancel}
            onDone={onDone}
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
