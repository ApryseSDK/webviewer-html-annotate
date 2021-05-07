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
      const { FitMode, docViewer } = instance;
      instance.setFitMode(FitMode.FitPage);
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
