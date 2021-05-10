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

      htmlModule.loadHTMLPages({
        htmlPages: [
          {
            url:
              'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d41656.714956835!2d-123.0850416!3d49.26607539999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.  1!5e0!3m2!1sen!2sca!4v1591640645684!5m2!1sen!2sca',
            width: 1800,
            height: 1100,
          }
        ],
      });
    });
  }, []);

  useEffect(() => {
    if (HTMLModule && res.length > 0) {
      HTMLModule.loadHTMLPage({url: res[0].url, width: res[1], height: res[2], thumb: res[0].thumb});
    }
  }, [HTMLModule, res]);

  return <div ref={viewer} className="HTMLViewer"></div>;
};

export default Viewer;
