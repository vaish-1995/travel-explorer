# 🧳 SPA for a Travel Agency

> A responsive Single Page Application (SPA) for managing tour packages using Vue.js and Node.js.

## 1. 📌 Student Information
- **Student Name**: Vaisnavi Muthiah  
- **Course**: CEWD 430  
- **Submission Date**: June 9, 2025  

---

## 2. 📖 Project Description

This project is a responsive Single Page Application (SPA) for a travel agency that enables users to:

- Create, Read, Update, and Delete (CRUD) tour packages.
- Seamlessly interact with a backend via RESTful APIs using Axios.
- Navigate dynamically between views using Vue Router.

---

## 3. 🛠️ Technologies Used

| Technology    | Purpose                                  |
|---------------|-------------------------------------------|
| Vue.js        | Frontend SPA framework                    |
| Vue Router    | Page navigation within SPA                |
| Axios         | HTTP communication between frontend/backend |
| Tailwind CSS  | Responsive UI styling                     |
| Node.js       | Backend runtime                           |
| Express.js    | RESTful API backend                       |
| MySQL         | Relational database                       |
| CORS, body-parser | API middleware configuration         |

---

## 4. 🚀 Installation & Setup

### 4.1 Backend Setup

```bash
npm init -y
npm install express cors mysql2 body-parser nodemon
```

### 4.2 Frontend Setup

```bash
npm install -g @vue/cli
vue create travel-agency-frontend
cd travel-agency-frontend
npm install axios vue-router
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4.3 Tailwind Config (`tailwind.config.js`)

```js
content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
]
```

### 4.4 Tailwind Imports (`main.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4.5 MySQL Table Schema

```sql
CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    image VARCHAR(255),
    category VARCHAR(50)
);
```

### 4.6 Project Structure

```
project-root/
├── backend/
│   ├── server.js
│   └── routes/packageRoutes.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   ├── App.vue
│   │   └── main.js
```

### 4.7 GitHub Repository

[https://github.com/vaish-1995/travel-agency-spa](https://github.com/vaish-1995/travel-explorer)

---

## 5. 🗣️ Oral Presentation Topics

1. SPA structure and component hierarchy
2. Vue Router and state management
3. Styling using Tailwind CSS
4. CRUD operations via RESTful API
5. Use of Axios for asynchronous communication
6. Reasons for choosing Express and MySQL
# 🧳 SPA for a Travel Agency

> A responsive Single Page Application (SPA) for managing tour packages using Vue.js and Node.js.

