import React, { useState } from 'react';
import { LOGO_COLOR } from '../assets/imagePaths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Footer from '../common/Footer';

const mockApplications = [
    {
        personalInfo: {
            id: 1,
            full_name: 'أحمد محمد الخليفي',
            first_name: 'Ahmed',
            middle_name: 'Mohamed',
            last_name: 'Al-Khulaifi',
            passport_number: 'L1234567',
            passport_issue_date: '2022-01-15',
            passport_expiry_date: '2032-01-14',
            birth_place: 'Benghazi',
            dob: '1990-05-20',
            gender: 'male',
            nationality: 'Libyan',
            national_id: '119900123456',
            phone: '+218912345678',
            email: 'ahmed.k@example.com',
            service_type: 'Personal',
            created_at: '2025-07-10T10:00:00Z',
            reference_number: 'REF-20250710-1A2B3C4D'
        },
        addressInfo: {
            country: 'Libya',
            city: 'Benghazi',
            area: 'Al-Sabri',
            residential_address: '123 Jamal Abdulnasser St.'
        },
        workInfo: {
            employment_status: 'Employed',
            job_title: 'Software Engineer',
            employer: 'Tech Solutions Inc.',
            employer_address: '456 Tripoli Road, Benghazi',
            source_of_income: 'Salary',
            monthly_income: '3,500 LYD'
        },
        uploadedDocuments: [
            { doc_type: 'passport', file_name: 'https://placehold.co/600x400/a0aec0/ffffff?text=Passport' },
            { doc_type: 'nationalId', file_name: 'https://placehold.co/600x400/a0aec0/ffffff?text=National+ID' },
            { doc_type: 'letter', file_name: 'https://placehold.co/600x400/a0aec0/ffffff?text=Employer+Letter' },
            { doc_type: 'photo', file_name: 'https://placehold.co/400x400/a0aec0/ffffff?text=Personal+Photo' }
        ],
        status: 'Pending'
    },
    {
        personalInfo: {
            id: 2,
            full_name: 'فاطمة علي المنصوري',
            first_name: 'Fatima',
            middle_name: 'Ali',
            last_name: 'Al-Mansouri',
            passport_number: 'L8765432',
            passport_issue_date: '2021-11-01',
            passport_expiry_date: '2031-10-31',
            birth_place: 'Tripoli',
            dob: '1985-08-12',
            gender: 'female',
            nationality: 'Libyan',
            national_id: '219850987654',
            phone: '+218923456789',
            email: 'fatima.m@example.com',
            service_type: 'Businessmen',
            created_at: '2025-07-11T14:30:00Z',
            reference_number: 'REF-20250711-5E6F7G8H'
        },
        addressInfo: {
            country: 'Libya',
            city: 'Tripoli',
            area: 'Hay Al-Andalus',
            residential_address: '789 Omar Al-Mukhtar St.'
        },
        workInfo: {
            employment_status: 'Self-Employed',
            job_title: 'Business Owner',
            employer: 'Al-Mansouri Imports',
            employer_address: '101 Souq Al-Thulatha, Tripoli',
            source_of_income: 'Business',
            monthly_income: '15,000 LYD'
        },
        uploadedDocuments: [
            { doc_type: 'passport', file_name: 'https://placehold.co/600x400/a0aec0/ffffff?text=Passport' },
            { doc_type: 'nationalId', file_name: 'https://placehold.co/600x400/a0aec0/ffffff?text=National+ID' }
        ],
        status: 'Pending'
    },
    {
        personalInfo: {
            id: 3,
            full_name: 'خالد عبد الله',
            first_name: 'Khalid',
            middle_name: 'Abdullah',
            last_name: '',
            passport_number: 'T123987',
            passport_issue_date: '2023-02-20',
            passport_expiry_date: '2028-02-19',
            birth_place: 'Tunis',
            dob: '1995-03-10',
            gender: 'male',
            nationality: 'Tunisian',
            national_id: null,
            phone: '+21622334455',
            email: 'khalid.a@example.com',
            service_type: 'Expat',
            created_at: '2025-07-12T09:15:00Z',
            reference_number: 'REF-20250712-9I0J1K2L'
        },
        addressInfo: {
            country: 'Libya',
            city: 'Benghazi',
            area: 'Fuwayhat',
            residential_address: 'Apartment 5, Building 10'
        },
        workInfo: {
            employment_status: 'Employed',
            job_title: 'Civil Engineer',
            employer: 'Libyan Construction Co.',
            employer_address: 'Airport Road, Benghazi',
            source_of_income: 'Salary',
            monthly_income: '5,000 LYD'
        },
        uploadedDocuments: [
            { doc_type: 'passport', file_name: 'https://placehold.co/600x400/a0aec0/ffffff?text=Passport' },
            { doc_type: 'photo', file_name: 'https://placehold.co/400x400/a0aec0/ffffff?text=Personal+Photo' }
        ],
        status: 'Approved'
    }
];

const LookupPage_EN = () => {
    const [apps, setApps] = useState(mockApplications);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const filtered = apps.filter(a => {
        const term = search.toLowerCase();
        return (
            a.personalInfo.full_name.toLowerCase().includes(term) ||
            a.personalInfo.first_name.toLowerCase().includes(term) ||
            a.personalInfo.last_name.toLowerCase().includes(term) ||
            a.personalInfo.reference_number.toLowerCase().includes(term)
        );
    });

    const infoSection = (title, data) => {
        if (!data) return null;
        return (
            <div className="confirmation-document" style={{marginBottom:'20px'}}>
                <div className="confirmation-header">{title}</div>
                <ul className="confirmation-list">
                    {Object.entries(data).map(([k,v]) => (
                        (v !== null && typeof v !== 'object') && (
                            <li key={k}><strong>{k.replace(/_/g,' ')}:</strong> {v}</li>
                        )
                    ))}
                </ul>
            </div>
        );
    };

    const docsSection = (docs) => {
        if (!docs || docs.length === 0) return null;
        return (
            <div className="confirmation-document" style={{marginBottom:'20px'}}>
                <div className="confirmation-header">Uploaded Documents</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'15px'}}>
                    {docs.map(doc => (
                        <div key={doc.file_name} style={{textAlign:'center'}}>
                            <img src={doc.file_name} alt={doc.doc_type} style={{width:'100%',height:'120px',objectFit:'cover',borderRadius:'8px',marginBottom:'5px'}} />
                            <p style={{fontSize:'0.9rem',fontWeight:'600'}}>{doc.doc_type}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const updateStatus = (id, status) => {
        setApps(a => a.map(app => app.personalInfo.id === id ? {...app, status} : app));
        setSelected(null);
    };

    return (
        <div className="form-page">
            <header className="header docs-header">
                <img src={LOGO_COLOR} alt="Bank Logo" className="logo" />
                <div className="header-switchers">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </header>
            <main className="form-main" style={{width:'100%',maxWidth:'1000px',margin:'0 auto'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',width:'100%'}}>
                    <h2 style={{fontSize:'1.5rem',fontWeight:'700'}}>Pending Applications</h2>
                    <input className="form-input" style={{maxWidth:'250px'}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
                </div>
                <table className="confirmation-table" style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Reference No.</th>
                            <th>Service Type</th>
                            <th>Submission Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(app => (
                            <tr key={app.personalInfo.id} className="hover-row">
                                <td>
                                    <div style={{fontWeight:'600'}}>{app.personalInfo.first_name} {app.personalInfo.last_name}</div>
                                    <div style={{fontSize:'0.9rem',opacity:0.7}}>{app.personalInfo.full_name}</div>
                                </td>
                                <td>{app.personalInfo.reference_number}</td>
                                <td>{app.personalInfo.service_type}</td>
                                <td>{new Date(app.personalInfo.created_at).toLocaleDateString()}</td>
                                <td><span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span></td>
                                <td><button onClick={() => setSelected(app)}>Review</button></td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan="6" style={{textAlign:'center',padding:'20px'}}>No applications found.</td></tr>
                        )}
                    </tbody>
                </table>
            </main>
            <Footer />
            {selected && (
                <div className="modal-backdrop open" onClick={e=>{if(e.target.classList.contains('modal-backdrop')) setSelected(null);}}>
                    <div className="modal-content" style={{width:'90%',maxWidth:'800px',padding:'20px'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                            <div>
                                <h2 style={{margin:'0'}}>{selected.personalInfo.first_name} {selected.personalInfo.last_name}</h2>
                                <p style={{margin:'0',opacity:0.7}}>{selected.personalInfo.reference_number}</p>
                            </div>
                            <button onClick={()=>setSelected(null)} style={{background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer'}}>&times;</button>
                        </div>
                        {infoSection('Personal Information', selected.personalInfo)}
                        {infoSection('Address Information', selected.addressInfo)}
                        {infoSection('Work & Income', selected.workInfo)}
                        {docsSection(selected.uploadedDocuments)}
                        <div style={{display:'flex',justifyContent:'flex-end',gap:'10px',marginTop:'20px'}}>
                            <button onClick={()=>updateStatus(selected.personalInfo.id,'Rejected')} className="btn-next" style={{backgroundColor:'#ef4444'}}>
                                Reject
                            </button>
                            <button onClick={()=>updateStatus(selected.personalInfo.id,'Approved')} className="btn-next" style={{backgroundColor:'#22c55e'}}>
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LookupPage_EN;
