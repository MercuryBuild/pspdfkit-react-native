import { BaseExampleAutoHidingHeaderComponent } from '../helpers/BaseExampleAutoHidingHeaderComponent';
import { CustomPdfView, formDocumentPath } from '../configuration/Constants';
import {
  Button,
  findNodeHandle,
  NativeModules,
  Platform,
  SafeAreaView,
  UIManager,
  View,
} from 'react-native';
import React from 'react';

export class ManualSigning extends BaseExampleAutoHidingHeaderComponent {
  constructor(props) {
    super(props);
    this.state = {
      documentPath: formDocumentPath,
    };
  }

  render() {
    return (
      <View style={styles.flex}>
        <CustomPdfView
          ref="pdfView"
          document={this.state.documentPath}
          style={styles.flex}
          onDocumentDigitallySigned={event => {
            this.setState({
              documentPath: event.nativeEvent.signedDocumentPath,
            });
          }}
        />
        <SafeAreaView style={styles.row}>
          <View>
            <Button
              onPress={() => {
                // This will open the native signature dialog.
                if (Platform.OS === 'android') {
                  UIManager.dispatchViewManagerCommand(
                    findNodeHandle(this.refs.pdfView),
                    'startSigning',
                    [],
                  );
                } else {
                  NativeModules.CustomPdfViewManager.startSigning(
                    findNodeHandle(this.refs.pdfView),
                  );
                }
              }}
              title="Start Signing"
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = {
  flex: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};
