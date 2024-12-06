App Store

-This app allows the users to select from the apps available(added by the admin) and download them using the link provided after which the user can screenshot the downloading process and upload that screenshot to earn points.

This project is a web-based application with two main interfaces:

1. Admin Interface: Allows the admin to manage Android apps, define tasks, and assign points for completing them.
2. User Interface: Enables users to view available apps, complete tasks, upload screenshots as proof, and track their progress.

- Features:

Admin Dashboard-
Add new apps with details like:
Name of the app.
Category (e.g., Social, Gaming, Finance).
Points users can earn for completing tasks (e.g., downloading the app).
View a list of all apps and their details.

User Dashboard-
Signup/Login: Secure authentication for users (e.g., JWT-based or any package).
Dashboard: Displays available apps and their details (e.g., WhatsApp, Facebook, Instagram).
Profile:View personal information (e.g., name, profile details).Track points earned from tasks.
Tasks: Upload a screenshot via drag-and-drop functionality to confirm task completion. Track completed tasks.

- Tech Stack:

Backend
Django: For managing the server-side logic.
Django REST Framework (DRF): To expose APIs for the frontend.
django-rest-framework-simplejwt: For token-based authentication.
Pillow: For handling image uploads.

Frontend
React: For creating a user-friendly interface.
React Router DOM: For seamless navigation.
Axios: For API communication.
React-Bootstrap: For styling components.
Drag and Drop Library: For handling screenshot uploads.



- Prerequisites

1. > Python (>= 3.8)`
1. > Node.js (>= 14.x) and npm
1. > Virtual environment


- Backend Setup
- [ ] Clone the repository: cd backend
- [ ] Create a virtual environment: python -m venv venv
- [ ] Activate the venv: source venv/bin/activate   # On Windows: venv\Scripts\activate
- [ ] Install the required Python packages: pip install -r requirements.txt
- [ ] Apply migrations to set up the database: python manage.py makemigrations  python manage.py migrate
- [ ] Run the development server: python manage.py runserver


- Frontend Setup
- [ ] Navigate to the frontend folder: cd frontend
- [ ] Install the required Node.js dependencies: npm install
- [ ] Start the frontend development server: npm start




- Admin Workflow
Log in as an admin.
Navigate to the Admin Dashboard to add apps.
Specify the app name, category, and points, then save it.
View the list of added apps on the dashboard.
<img width="1290" alt="Admin_Dashboard" src="https://github.com/user-attachments/assets/b270aae1-4439-4487-a6bf-741e334f72e9">
<img width="1289" alt="AddApp_Admin" src="https://github.com/user-attachments/assets/c8940767-0874-4a06-9858-bbcfa0e4ff39">


- User Workflow
Sign up and log in as a user.
View available apps and details from the User Dashboard.
Download an app, then complete the associated task.
Upload a screenshot as proof via drag-and-drop functionality.
Track earned points and completed tasks in the Points and Tasks sections.
<img width="1152" alt="User_Signup" src="https://github.com/user-attachments/assets/bc0a7e4a-0989-4131-96e6-6bfab233fb72">
<img width="1319" alt="User_Dashboard" src="https://github.com/user-attachments/assets/c9007ae1-ac9d-4b9a-9a07-a25220d4f3c3">

```
File Path:
APP_STORE/
├── backend/                 # Backend (Django) folder
│   ├── media/               # Media files storage (e.g., app logos)
│   ├── users/               # App-specific user management
│   │   ├── migrations/      # Database migrations for the 'users' app
│   │   ├── admin.py         # Django admin configuration
│   │   ├── models.py        # Database models
│   │   ├── serializers.py   # API serializers
│   │   ├── views.py         # API views
│   │   ├── urls.py          # URL routing
│   │   ├── tests.py         # Unit tests for the 'users' app
│   ├── settings.py          # Django project settings
│   ├── urls.py              # Project-level URL routing
│   ├──...        
│   ├── manage.py            # Django management script
├── frontend/                # Frontend (React) folder
│   ├── public/              # Static files like index.html
│   ├── src/                 # React source files
│   │   ├── components/      # React components
│   │   ├── styles/          # CSS and styling files
│   │   ├── api.js           # API interaction functions
│   │   ├── App.js           # Main React component
│   ├── package.json         # Dependencies and scripts
├── venv/                    # Virtual environment for Python
├── README.md                # Project documentation
├── requirements.txt         # Python dependencies
```

Future Enhancements:
Add email notifications for task verification.
Include analytics for the admin to track user activities.
Add functionality for users to redeem earned points.


 








