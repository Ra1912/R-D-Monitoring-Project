This is a readme file here is the proper procedure to implement our project
1. Project Setup

Created the main project directory with subfolders:

frontend/ → HTML/JS/CSS user interface

backend/ → Node.js + Express REST API

ai-service/ → Python Flask service for PDF parsing + AI extraction

database/ → PostgreSQL schema and initialization scripts

uploads/ → Stores uploaded PDF files

2. Database (PostgreSQL)

Designed and implemented schema (database/schema.sql) with the following tables:

projects (project metadata)

submissions (progress reports)

documents (uploaded files + extracted data)

discrepancies (mismatches between AI extraction and submissions)

audit_log (records every change for accountability)

notifications (automated alerts and reminders)

Loaded schema into PostgreSQL and inserted a demo project.

3. Backend (Node.js + Express)

Built REST APIs (backend/server.js):

POST /api/projects/:projectId/submissions → Save new progress reports

POST /api/submissions/:submissionId/documents → Handle file uploads, call AI service, and log results

GET /api/projects/:projectId/dashboard → Fetch latest submissions, discrepancies, and metrics

GET /api/projects/:projectId/audit → Retrieve audit trail

Added:

Audit logging for every submission/change

Discrepancy detection between submitted vs. extracted values

Automated email alerts (via Nodemailer)

Daily deadline reminders (via node-cron)

4. Frontend (HTML + Chart.js)

Created form for project progress submissions.

Implemented file upload (PDFs).

Designed dashboard with charts (Chart.js) and dynamic data loading.

Connected UI to backend APIs (fetch() calls instead of dummy data).

5. AI Service (Python Flask)

Developed PDF processing pipeline (ai-service/app.py + helpers):

Extracts text from PDFs (using pdfplumber/PyMuPDF)

Calls AI model (OpenAI API if available, regex fallback otherwise)

Returns structured JSON with extracted progress data

Runs independently on port 3002, communicates with Node.js backend.

6. Testing Workflow

Submit a progress report (frontend or via API).

Upload a supporting PDF → AI service processes it → results saved in DB.

View the dashboard (/dashboard) with submissions + discrepancies.

Check the audit log (/audit) for history.

PostgreSQL verified via direct queries (using psql).

7. Next Steps

Package everything with Docker Compose (DB, backend, AI service, frontend).

Polish UI with Bootstrap/Tailwind for production use.

Extend AI prompts for more robust data extraction.

In summary, we now have a functioning end-to-end stack:
Frontend → Backend → Database → AI Service → Dashboard with charts + audit trail

Best regards,
[Your Name]
