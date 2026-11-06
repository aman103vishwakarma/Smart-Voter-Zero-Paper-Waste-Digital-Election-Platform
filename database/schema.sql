-- ==============================================================================
-- SMART VOTER PLATFORM - POSTGRESQL + POSTGIS PRODUCTION SCHEMA
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM (
    'CITIZEN',
    'CANDIDATE',
    'PARTY_ADMIN',
    'ELECTION_OFFICIAL',
    'SUPER_ADMIN'
);

CREATE TYPE election_type AS ENUM (
    'PARLIAMENTARY',
    'STATE_ASSEMBLY',
    'MUNICIPAL',
    'PANCHAYAT'
);

CREATE TYPE verification_status AS ENUM (
    'DRAFT',
    'PENDING_VERIFICATION',
    'VERIFIED',
    'REJECTED'
);

-- 2. USERS & AUTHENTICATION
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'CITIZEN' NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. POLITICAL PARTIES
CREATE TABLE IF NOT EXISTS parties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(50) NOT NULL UNIQUE,
    symbol_url TEXT NOT NULL,
    color_hex VARCHAR(10) DEFAULT '#2563eb',
    headquarters TEXT,
    founded_year INT,
    website_url TEXT,
    national_manifesto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 4. CONSTITUENCIES (GEOSPATIAL POSTGIS ENGINE)
CREATE TABLE IF NOT EXISTS constituencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    type election_type NOT NULL,
    total_registered_voters INT DEFAULT 0,
    -- PostGIS MultiPolygon for exact regional boundaries
    boundary GEOMETRY(MultiPolygon, 4326),
    centroid GEOMETRY(Point, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_constituencies_boundary ON constituencies USING GIST(boundary);
CREATE INDEX IF NOT EXISTS idx_constituencies_state ON constituencies(state);

-- 5. PINCODE TO CONSTITUENCY MAPPING (FAST FALLBACK LOOKUP)
CREATE TABLE IF NOT EXISTS pincode_constituency_mappings (
    id SERIAL PRIMARY KEY,
    pincode VARCHAR(10) NOT NULL,
    constituency_id UUID NOT NULL REFERENCES constituencies(id) ON DELETE CASCADE,
    locality_name VARCHAR(255),
    CONSTRAINT uq_pincode_constituency UNIQUE (pincode, constituency_id)
);

CREATE INDEX IF NOT EXISTS idx_pincode_lookup ON pincode_constituency_mappings(pincode);

-- 6. ELECTIONS
CREATE TABLE IF NOT EXISTS elections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    type election_type NOT NULL,
    voting_date DATE NOT NULL,
    state VARCHAR(100),
    year INT NOT NULL,
    is_active BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 7. CANDIDATES
CREATE TABLE IF NOT EXISTS candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL,
    party_id UUID REFERENCES parties(id) ON DELETE SET NULL,
    constituency_id UUID NOT NULL REFERENCES constituencies(id) ON DELETE CASCADE,
    election_id UUID NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    education VARCHAR(255),
    age INT,
    criminal_cases INT DEFAULT 0 NOT NULL,
    criminal_cases_details TEXT,
    assets_declared NUMERIC(15, 2) DEFAULT 0.00,
    liabilities_declared NUMERIC(15, 2) DEFAULT 0.00,
    affidavit_url TEXT,
    profile_photo_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    verification_status verification_status DEFAULT 'PENDING_VERIFICATION' NOT NULL,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_candidates_constituency ON candidates(constituency_id);
CREATE INDEX IF NOT EXISTS idx_candidates_party ON candidates(party_id);
CREATE INDEX IF NOT EXISTS idx_candidates_verification ON candidates(verification_status);

-- 8. MANIFESTOS & AI SUMMARIES
CREATE TABLE IF NOT EXISTS manifestos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    party_id UUID REFERENCES parties(id) ON DELETE CASCADE,
    election_id UUID NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    pdf_url TEXT NOT NULL,
    page_count INT DEFAULT 1,
    ai_summary TEXT,
    key_promises JSONB DEFAULT '[]'::jsonb,
    category_breakdown JSONB DEFAULT '{}'::jsonb,
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT chk_candidate_or_party CHECK (
        (candidate_id IS NOT NULL AND party_id IS NULL) OR
        (candidate_id IS NULL AND party_id IS NOT NULL)
    )
);

-- 9. ECO-FRIENDLY POSTER QR CODES
CREATE TABLE IF NOT EXISTS campaign_qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code_hash VARCHAR(64) UNIQUE NOT NULL,
    candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    location_label VARCHAR(255),
    geo_point GEOMETRY(Point, 4326),
    scan_count INT DEFAULT 0 NOT NULL,
    paper_posters_saved INT DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_qr_code_hash ON campaign_qr_codes(code_hash);

-- 10. AUDIT LOGS FOR ELECTION TAMPER-RESISTANCE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    target_entity VARCHAR(100) NOT NULL,
    target_id UUID NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
