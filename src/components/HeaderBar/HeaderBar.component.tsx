import { useState } from "react";
import { Layout, Typography } from "antd";
import "./HeaderBar.component.scss";
import PdfModal from "../../modal/previsualisation/PdfModal.component";
import type { FormData } from "../../types";

const { Header } = Layout;

interface HeaderBarProps {
  formData?: FormData;
}

const HeaderBar = ({ formData }: HeaderBarProps) => {
  const [open, setOpen] = useState(false);
  const pdfFile = `${import.meta.env.BASE_URL}feuille_de_match.pdf`;

  return (
    <Header className="header-bar">
      <div className="header-brand">
        <Typography.Title level={4} className="header-title">
          FDM Hockey
        </Typography.Title>
        <Typography.Text type="secondary" className="header-subtitle">
          Creation de Feuille de match
        </Typography.Text>
      </div>

      <button onClick={() => setOpen(true)} className="pdf-button">
        Voir le PDF
      </button>
      <PdfModal
        open={open}
        onClose={() => setOpen(false)}
        file={pdfFile}
        formData={formData}
      />
    </Header>
  );
};

export default HeaderBar;
