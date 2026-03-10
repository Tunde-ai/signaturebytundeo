# Signature By Tunde O - Roadmap

## Milestone: v1.0 Production

### Phase 1: Database Integration ⬜
**Goal:** Replace demo data with real PostgreSQL database
- Set up Prisma schema (users, transactions, documents, notes)
- Migrate FinClear portal to use real data
- User registration and authentication flow
- **Requirements:** REQ-01, REQ-02

### Phase 2: Document Vault & Storage ⬜
**Goal:** Persistent file storage for client documents
- Supabase or S3 file storage
- Upload, download, delete documents
- Document categorization
- **Requirements:** REQ-03

### Phase 3: Booking & Payments ⬜
**Goal:** Enable consultation booking and notary service payments
- Cal.com integration for scheduling
- Stripe payment for notary services
- Booking confirmation emails via Resend
- **Requirements:** REQ-04, REQ-05

### Phase 4: Client Onboarding ⬜
**Goal:** Self-service client registration and onboarding
- Client signup flow
- Accountant invitation system
- Welcome email sequence
- **Requirements:** REQ-06
