import WebViewer from '@pdftron/webviewer';
import { initializeHTMLViewer } from '@pdftron/webviewer-html';
import { useEffect, useRef, useState } from 'react';
import './Viewer.css';

const Viewer = ({ res }) => {
  const viewer = useRef(null);
  const [HTMLModule, setHTMLModule] = useState(null);

  useEffect(() => {
    WebViewer(
      {
        path: 'lib',
      },
      viewer.current
    ).then(async (instance) => {
      const { FitMode, docViewer, Feature } = instance;
      instance.setFitMode(FitMode.FitPage);
      // disable built-in search since there is no text layer
      instance.disableFeatures([Feature.Search]);
      // disable text based annotations tools since there is no text layer
      instance.disableElements([
        'viewControlsButton',
        'downloadButton',
        'printButton',
        'highlightToolGroupButton',
        'underlineToolGroupButton',
        'strikeoutToolGroupButton',
        'squigglyToolGroupButton',
        'fileAttachmentToolGroupButton',
        'toolbarGroup-Edit',
      ]);
      // Extends WebViewer to allow loading HTML5 files from URL or static folder.
      const htmlModule = await initializeHTMLViewer(instance);

      docViewer.on('documentLoaded', () => {
        setTimeout(() => {
          instance.setFitMode(FitMode.FitPage);
        }, 1500);
      });

      setHTMLModule(htmlModule);

      htmlModule.loadHTMLPage(
        'https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik',
        500,
        500
      );

      // Add a button that toggles annotation layer to interact with web content underneath
      instance.setHeaderItems((header) => {
        header.push({
          type: 'actionButton',
          img:
            '<svg id="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.cls-1{fill:#8c8c8c;}</style></defs><title>icon - lin- header - annotations</title><path class="cls-1" d="M19.5,12.6l1.9-2.2v9.4A2.2,2.2,0,0,1,19.3,22H4.3A2.24,2.24,0,0,1,2,19.8V4.7A2.2,2.2,0,0,1,1,2.5h9.5L11.7,4.4H3.8V20.1H19.4V12.6ZM22,5.9a2.2,2.2,0,0,1-.6,1.5L11,17.7H6.3V12.9L16.7,2.6a2.17,2.17,0,0,1,3,0l1.7,1.7A2.27,2.27,0,0,1,22,9ZM16.9,9.2,14.7,7,8,13.8V16h2.1ZM20.2,6,18,3.8,16.1,5.7l2.2,2.2Z"></path></svg>',
          onClick: () => {
            htmlModule.toggleAnnotations();
          },
        });
      });
    });
  }, []);

  useEffect(() => {
    if (HTMLModule && res.length > 0) {
      HTMLModule.loadHTMLPage(res[0].url, res[1], res[2], res[0].thumb);
    }
  }, [HTMLModule, res]);

  return <div ref={viewer} className="HTMLViewer"></div>;
};

export default Viewer;
