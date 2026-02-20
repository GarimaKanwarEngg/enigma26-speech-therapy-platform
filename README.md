# Speech Therapy Material Platform  
ENIGMA’26 – Inter College Hackathon  
Domain: Healthcare  
Team: TEAM ZERO  

---

## Overview

The Speech Therapy Material Platform is a full-stack web application designed to digitize and structure speech therapy sessions. The system enables therapists to manage patients, assign therapy modules, track performance, and generate reports, while providing children with real-time pronunciation feedback and parents with transparent progress monitoring.

The platform integrates AI-driven pronunciation analysis to improve therapy effectiveness and ensure measurable outcomes.

---

## Problem Statement

Speech therapy management in many institutions remains partially manual and inconsistent. Common challenges include:

- Lack of structured digital tracking  
- Limited real-time pronunciation correction  
- Manual progress monitoring  
- Inconsistent home practice guidance  
- Limited parent visibility into therapy progress  

There is a need for a structured, scalable, and intelligent system that ensures consistency, measurable improvement, and improved collaboration between therapists and parents.

---

## Proposed Solution

This platform provides:

- Structured therapy module management  
- Real-time speech-to-text integration  
- AI-based pronunciation feedback  
- Phoneme-level accuracy analysis  
- Role-based dashboards  
- Performance analytics and reporting  
- Secure authentication and access control  

The system ensures organized therapy delivery, continuous progress tracking, and improved learning outcomes.

---

## Technology Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt password hashing
- Role-based access control

### AI & Speech Integration
- Web Speech API (Real-time speech recognition)
- OpenAI API (Pronunciation feedback and suggestions)
- Custom phoneme analysis logic

---

## User Roles

### Therapist (Admin)
- Manage patients  
- Assign therapy modules  
- Create goals and milestones  
- Schedule sessions  
- Add session notes  
- Track performance metrics  
- View analytics dashboards  
- Generate reports  
- Communicate with parents  

### Child/User
- Access assigned therapy modules  
- Participate in therapy sessions  
- Receive real-time pronunciation feedback  
- View scores and progress  
- Track performance history  

### Parent
- Monitor child progress  
- View performance graphs  
- Access home practice guidance  
- Receive therapist updates  
- Review session summaries  

---

## Core Features

### Authentication & Security
- Secure signup and login  
- JWT-based authentication  
- Role-based dashboard access  
- Password encryption  
- Protected API routes  
- Input validation and sanitization  

### Analytics
- Accuracy score tracking  
- Weekly performance graphs  
- Session completion tracking  
- AI-generated improvement insights  
- Downloadable performance reports  

### System Capabilities
- RESTful API architecture  
- MVC folder structure  
- Environment-based configuration  
- Error handling middleware  
- Offline support (basic caching)  
- Responsive UI (mobile and desktop)  
- Dark mode support  

---

## Database Collections

- Users  
- Patients  
- TherapyModules  
- Sessions  
- Progress  
- Reports  

---

## Folder Structure

### Frontend
