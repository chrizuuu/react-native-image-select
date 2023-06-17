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
import {ImageSelector} from '../src';

export default function App() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState<string[]>();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>react-native-image-select</Text>
          <View style={styles.button}>
            <Button
              title="Open ImagePicker"
              onPress={() => setIsVisible(true)}
            />
          </View>

          <View>
            {selectedImages?.map(i => (
              <Image key={i} source={{uri: i}} style={styles.image} />
            ))}
          </View>
          <ImageSelector
            isVisible={isVisible}
            onCancel={() => setIsVisible(false)}
            onDone={() => setIsVisible(false)}
            callback={_selectedImages =>
              setSelectedImages(_selectedImages.map(s => s!.uri))
            }
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
