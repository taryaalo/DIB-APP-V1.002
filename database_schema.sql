-- Database creation
CREATE DATABASE dib_app_data;

-- Connect to the new database
\c dib_app_data;

-- Personal information table
CREATE TABLE personal_info (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    passport_number VARCHAR(50),
    passport_issue_date DATE,
    passport_expiry_date DATE,
    birth_place VARCHAR(100),
    dob DATE,
    gender VARCHAR(10),
    nationality VARCHAR(50),
    family_record_number VARCHAR(50),
    national_id VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(100),
    residence_expiry DATE,
    census_card_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reference_number VARCHAR(100) UNIQUE,
    ai_model VARCHAR(20),
    service_type VARCHAR(50),
    manual_fields TEXT[],
    confirmed_by_admin BOOLEAN DEFAULT FALSE
);

-- Address information linked to personal_info
CREATE TABLE address_info (
    id SERIAL PRIMARY KEY,
    personal_id INT REFERENCES personal_info(id) ON DELETE CASCADE,
    national_id VARCHAR(20),
    reference_number VARCHAR(100),
    country VARCHAR(50),
    city VARCHAR(50),
    area VARCHAR(100),
    residential_address TEXT,
    confirmed_by_admin BOOLEAN DEFAULT FALSE
);

-- Work and income information linked to personal_info
CREATE TABLE work_income_info (
    id SERIAL PRIMARY KEY,
    personal_id INT REFERENCES personal_info(id) ON DELETE CASCADE,
    national_id VARCHAR(20),
    reference_number VARCHAR(100),
    employment_status VARCHAR(50),
    job_title VARCHAR(100),
    employer VARCHAR(100),
    employer_address TEXT,
    employer_phone VARCHAR(20),
    source_of_income VARCHAR(100),
    monthly_income VARCHAR(100),
    confirmed_by_admin BOOLEAN DEFAULT FALSE
);

-- Uploaded documents linked to personal_info
CREATE TABLE uploaded_documents (
    id SERIAL PRIMARY KEY,
    personal_id INT REFERENCES personal_info(id) ON DELETE CASCADE,
    national_id VARCHAR(20),
    doc_type VARCHAR(50),
    file_name TEXT NOT NULL,
    reference_number VARCHAR(100) NOT NULL,
    confirmed_by_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity log table
CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    activity TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Error log table
CREATE TABLE error_log (
    id SERIAL PRIMARY KEY,
    error TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
