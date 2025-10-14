import './HomePage.scss';
import { useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar.component';
import GlobalInfo from '../../components/GlobalInfo/GlobalInfo.component';

interface FormData {
    datetime: any;
    lieux: string;
    sexe: string;
    competition: string;
    niveau: string;
}

const HomePage = () => {
    const [formData, setFormData] = useState<FormData>({
        datetime: null,
        lieux: '',
        sexe: '',
        competition: '',
        niveau: ''
    });

    const handleFormDataChange = (data: FormData) => {
        setFormData(data);
    };

    return (
        <>
        <div className='header'>
            <HeaderBar formData={formData} />
        </div>
        <main className="content">
            <div className = "center">
                <GlobalInfo onFormDataChange={handleFormDataChange} />
            </div>
        </main>
        </>
    );
};

export default HomePage;