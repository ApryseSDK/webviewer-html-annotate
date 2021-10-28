import WebViewer from '@pdftron/webviewer';
import { initializeHTMLViewer } from '@pdftron/webviewer-html';
import { useEffect, useRef, useState } from 'react';
import './Viewer.css';

const Viewer = ({ res, loadURL, pdf }) => {
  const viewer = useRef(null);
  const [HTMLModule, setHTMLModule] = useState(null);
  const [instance, setInstance] = useState(null);

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
      console.log(htmlModule)

      loadURL(`https://www.pdftron.com/`);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (HTMLModule && Object.keys(res).length > 0) {
      const { url, width, height, thumb, origUrl } = res;
      HTMLModule.loadHTMLPage({ url, width, height, thumb, origUrl });
    }
  }, [HTMLModule, res]);

  useEffect(() => {
    const loadDocAndAnnots = async () => {
      const doc = await instance.CoreControls.createDocument(pdf);
      const xfdf = await instance.docViewer
        .getAnnotationManager()
        .exportAnnotations();
      const data = await doc.getFileData({ xfdfString: xfdf });
      const arr = new Uint8Array(data);
      const blob = new Blob([arr], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'annotated';
      a.click();
      a.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(url), 7000);
    };

    if (instance && pdf) {
      loadDocAndAnnots();
    }
  }, [instance, pdf]);

  return <div ref={viewer} className="HTMLViewer"></div>;
};

export default Viewer;
