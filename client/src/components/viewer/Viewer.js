import WebViewer from '@pdftron/webviewer';
import { initializeHTMLViewer } from '@pdftron/webviewer-html';
import { useEffect, useRef, useState } from 'react';
import './Viewer.css';

const Viewer = ({ res, loadURL, buffer, loading }) => {
  const viewer = useRef(null);
  const [HTMLModule, setHTMLModule] = useState(null);
  const [instance, setInstance] = useState(null);
  const [size, setSize] = useState({});

  useEffect(() => {
    WebViewer(
      {
        path: 'lib',
      },
      viewer.current
    ).then(async (instance) => {
      const { FitMode, docViewer } = instance;
      setInstance(instance);
      instance.setFitMode(FitMode.FitWidth);
      // disable some incompatible tools
      instance.disableElements([
        'highlightToolGroupButton',
        'underlineToolGroupButton',
        'strikeoutToolGroupButton',
        'squigglyToolGroupButton',
        'viewControlsButton',
        'downloadButton',
        'printButton',
        'fileAttachmentToolGroupButton',
        'toolbarGroup-Edit',
      ]);
      // Extends WebViewer to allow loading HTML5 files from URL or static folder.
      const htmlModule = await initializeHTMLViewer(instance);

      docViewer.on('documentLoaded', () => {
        setTimeout(() => {
          if (instance.getFitMode() !== FitMode.FitWidth) {
            instance.setFitMode(FitMode.FitWidth);
          }
        }, 1500);
      });

      setHTMLModule(htmlModule);

      loadURL(`https://www.pdftron.com/`);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (HTMLModule && Object.keys(res).length > 0) {
      const { url, width, height, thumb, origUrl } = res;
      setSize({width, height});
      HTMLModule.loadHTMLPage({ url, width, height, thumb, origUrl });
    }
  }, [HTMLModule, res]);

  useEffect(() => {
    const loadDocAndAnnots = async () => {
      loading(true);
      const doc = await instance.Core.createDocument(buffer, { 
        extension: 'png',
        pageSizes: [size],
      });

      // exportAnnotations as xfdfString seem to misplace annotations
      const xfdf = await instance.docViewer
        .getAnnotationManager()
        .exportAnnotations();
      const data = await doc.getFileData({ xfdfString: xfdf });
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'annotated';
      a.click();
      a.remove();
      loading(false);
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    };

    if (instance && buffer) {
      loadDocAndAnnots();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, buffer]);

  return <div ref={viewer} className="HTMLViewer"></div>;
};

export default Viewer;
