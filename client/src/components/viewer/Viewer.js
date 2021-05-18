import WebViewer from '@pdftron/webviewer';
import { initializeHTMLViewer } from '@pdftron/webviewer-html';
import { useEffect, useRef, useState } from 'react';
import './Viewer.css';

const Viewer = ({ res, loadURL }) => {
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
      // disable some incompatible tools
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

      loadURL(
        `https://www.pdftron.com/`,
        1800,
        1100
      );
    });
  }, []);

  useEffect(() => {
    if (HTMLModule && Object.keys(res).length > 0) {
      const { url, width, height, thumb } = res;
      HTMLModule.loadHTMLPage({url, width, height, thumb});
    }
  }, [HTMLModule, res]);

  return <div ref={viewer} className="HTMLViewer"></div>;
};

export default Viewer;
