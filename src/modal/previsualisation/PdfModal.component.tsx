import { Document, Page, pdfjs } from "react-pdf";
import { useEffect } from "react";
import Modal from "../Modal";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface FormData {
  datetime: any;
  lieux: string;
  sexe: string;
  competition: string;
  niveau: string;
}

interface PdfModalProps {
  open: boolean;
  onClose: () => void;
  file: string;
  formData?: FormData;
}

export default function PdfModal({ open, onClose, file, formData }: PdfModalProps) {
  useEffect(() => {
    if (open && formData) {
      console.log("=== Données du formulaire GlobalInfo ===");
      console.log("Date/Heure:", formData.datetime?.format ? formData.datetime.format("YYYY-MM-DD HH:mm") : formData.datetime);
      console.log("Lieux:", formData.lieux);
      console.log("Sexe:", formData.sexe);
      console.log("Compétition:", formData.competition);
      console.log("Niveau:", formData.niveau);
      console.log("=====================================");
    }
  }, [open, formData]);

  return (
    <Modal open={open} onClose={onClose} title="Prévisualisation PDF">
      <div className="pdf-container">
        <Document 
          file={file} 
          loading={
            <div className="pdf-loading">
              <div className="spinner"></div>
              <p>Chargement du PDF…</p>
            </div>
          }
          error={
            <div className="pdf-error">
              <p>❌ Erreur lors du chargement du PDF</p>
            </div>
          }
        >
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-page"
          />
        </Document>
      </div>
    </Modal>
  );
}
