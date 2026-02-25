# Axion Project

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/) and [Redis](https://redis.io/) (if running locally without Docker)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd axion
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running Locally (without Docker)

> **Note:** You must have both Redis and MongoDB servers running locally before starting the app.
> - Default Redis port: **6379**
> - Default MongoDB port: **27017**

```sh
npm run dev
```

The server will start on the port specified in your `.env` (default: 5111).

### Running with Docker

1. **Build and start all services:**
   ```sh
   docker-compose up --build
   ```
   This will start the Node.js app, MongoDB, and Redis containers.

2. **Stop services:**
   ```sh
   docker-compose down
   ```

---

## Docs

- [Postman Collection](Is in root directory: postman.postman_collection)

### Users

| Endpoints                      | Method | Description                                                                                              |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------   |
| /api/user/login                | POST   | Login                    - body: {password: "", email: ""}                                               |
| /api/user/create               | POST   | Creates a user           - body: {username: "", password: "", email: "", role: "superadmin or admin" }   |
| /api/user/assign               | POST   | Assign schools to admins - body: {"admins": ["id"], "schools": ["id"]}                                   |

### School
#### Only super admin has access
| Endpoints                | Method | Description                                                                                                    |
| ------------------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| /api/school/get          | GET    | Gets a school. Pass ID as a query param.                                                                       |
| /api/school/getAll       | GET    | Gets all schools.                                                                                              |
| /api/school/create       | POST   | Creates a school. Bbody: {schoolname: ""}                                                                      |
| /api/school/update       | PATCH  | Updates a school. Bbody: {id: "", schoolname: ""}                                                              |
| /api/school/delete       | DELETE | Deletes a school. Bbody: {id: ""}                                                                              |

### Student
####  admin and super admin has access

| Endpoints                | Method | Description                                                                                                    |
| ------------------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| /api/student/get       | GET    | Gets a student. Pass ID as a query param.                                                                        |
| /api/student/getAll    | GET    | Gets all students.                                                                                               |
| /api/student/create    | POST   | Creates a student. Body: {studentname: "", schoolid: "", classroomid: ""}                                        |
| /api/student/update    | PATCH  | Updates a student. Body: {id: "", schoolid: "", classroomid: "", studentname: ""}                                |
| /api/student/delete    | DELETE | Deletes a student. Body: {id: ""}                                                                                |

### Classroom
####  admin and super admin has access

| Endpoints                | Method | Description                                                                                                    |
| ------------------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| /api/classrrom/get       | GET    | Gets a classroom. Pass ID as a query param.                                                                    |
| /api/classrrom/getAll    | GET    | Gets all classrooms.                                                                                           |
| /api/classrrom/create    | POST   | Creates a classroom. Body: {schoolid: "", classroomname: ""}                                                   |
| /api/classrrom/update    | PATCH  | Updates a classroom. Body: {id: "", schoolid: "", classroomname: ""}                                           |
| /api/classrrom/delete    | DELETE | Deletes a classroom. Body: {id: ""}                                                                            |
