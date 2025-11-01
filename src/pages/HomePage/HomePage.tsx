import "./HomePage.scss";
import { useState } from "react";
import HeaderBar from "../../components/HeaderBar/HeaderBar.component";
import GlobalInfo from "../../components/GlobalInfo/GlobalInfo.component";
import type { FormData } from "../../types";

const HomePage = () => {
  const [formData, setFormData] = useState<FormData>({
    datetime: null,
    lieux: "",
    sexe: "",
    competition: "",
    niveau: "",
  });

  const handleFormDataChange = (data: FormData) => {
    setFormData(data);
  };

  return (
    <>
      <div className="header">
        <HeaderBar formData={formData} />
      </div>
      <main className="content">
        <div className="center">
          <GlobalInfo onFormDataChange={handleFormDataChange} />
        </div>
      </main>
    </>
  );
};

export default HomePage;
