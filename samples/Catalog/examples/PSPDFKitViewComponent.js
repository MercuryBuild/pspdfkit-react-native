import { BaseExampleAutoHidingHeaderComponent } from '../helpers/BaseExampleAutoHidingHeaderComponent';
import { processColor, View } from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';
import React from 'react';
import { exampleDocumentPath, pspdfkitColor } from '../configuration/Constants';

export class PSPDFKitViewComponent extends BaseExampleAutoHidingHeaderComponent {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.flex}>
        <PSPDFKitView
          ref="pdfView"
          document={exampleDocumentPath}
          configuration={{
            allowToolbarTitleChange: false,
            toolbarTitle: 'My Awesome Report',
            backgroundColor: processColor('lightgrey'),
            useParentNavigationBar: false,
          }}
          fragmentTag="PDF1"
          showNavigationButtonInToolbar={true}
          onNavigationButtonClicked={() => navigation.goBack()}
          menuItemGrouping={[
            'freetext',
            { key: 'markup', items: ['highlight', 'underline'] },
            'ink',
            'image',
          ]}
          style={styles.pdfColor}
        />
      </View>
    );
  }
}
const styles = {
  flex: { flex: 1 },
  pdfColor: { flex: 1, color: pspdfkitColor },
};
