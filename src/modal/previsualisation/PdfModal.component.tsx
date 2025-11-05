// src/components/PdfModal/index.tsx
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "../Modal";
import type { FormData } from "../../types";
import { getPdfTemplate } from "../../config/pdfTemplateMap";
import type { CSSProperties } from "react";
import { useMemo } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfModalProps {
  open: boolean;
  onClose: () => void;
  file: string;
  formData?: FormData;
}

export default function PdfModal({
  open,
  onClose,
  file,
  formData,
}: PdfModalProps) {
  const template = useMemo(
    () => (formData ? getPdfTemplate(formData) : null),
    [formData],
  );

  return (
    <Modal open={open} onClose={onClose} title="Prévisualisation PDF">
      <div className="pdf-container relative">
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

        {template && (
          <div className="relative top-0 left-0 w-full h-full pointer-events-none">
            {Object.entries(template)
              .filter(([, field]) => field.active !== false)
              .map(([name, field]) => {
                const style: CSSProperties = {
                  position: "absolute",
                  top: `${800 - field.y}px`,
                  left: `${field.x}px`,
                  fontSize: field.fontSize,
                  color: field.color ?? "black",
                };

                if (field.type === "circle") {
                  style.width = field.circleWidth;
                  style.height = 14;
                  style.borderRadius = "9999px";
                  style.border = "1px solid black";
                  style.display = "flex";
                  style.alignItems = "center";
                  style.justifyContent = "center";
                  return <div key={name} style={style}></div>;
                }

                return (
                  <div key={field.text} style={style}>
                    {field.text ?? ""}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </Modal>
  );
}
