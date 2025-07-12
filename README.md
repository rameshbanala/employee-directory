# 👥 Employee Directory Web Interface

A responsive, feature-rich employee directory application built with **HTML**, **CSS**, **vanilla JavaScript**, and **Freemarker** templates. This project demonstrates modern front-end development practices and provides a complete CRUD interface for managing employee data.

---

## 🚀 Features

* ✅ **Complete CRUD Operations**: Add, view, edit, and delete employees
* 🔍 **Advanced Search**: Real-time search across all employee fields
* 🎯 **Multi-criteria Filtering**: Filter by name, department, and role
* ↕️ **Dynamic Sorting**: Sort by any employee attribute
* 📄 **Pagination**: Configurable items per page (10, 25, 50, 100)
* 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
* 🛡️ **Form Validation**: Client-side validation with real-time feedback
* 🎨 **Modern UI/UX**: Clean, intuitive interface with loading states and notifications
* ♿ **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

---

## 🛠 Technologies Used

* **HTML5** – Semantic markup and modern standards
* **CSS3** – Flexbox, Grid, custom properties, and responsive design
* **Vanilla JavaScript (ES6+)** – Modular and efficient
* **Freemarker** – Server-side templating
* **BEM Methodology** – Scalable and maintainable CSS architecture

---

## 📁 Project Structure

```
employee-directory/
├── src/
│   └── main/
│       └── resources/
│           ├── templates/
│           │   └── index.ftlh          # Freemarker template
│           └── static/
│               ├── css/
│               │   ├── base.css        # Base styles and reset
│               │   ├── layout.css      # Layout and grid system
│               │   ├── components.css  # Component styles
│               │   └── responsive.css  # Responsive design
│               └── js/
│                   ├── data.js             # Mock employee data
│                   ├── validation.js       # Form validation utilities
│                   ├── employeeManager.js  # Employee data management
│                   ├── uiController.js     # UI interactions and updates
│                   └── app.js              # Main application logic
├── index.html        # Standalone browser testing
├── README.md         # Project documentation
├── package.json      # Optional dev tools setup
└── screenshots/      # UI snapshots
```

---

## 🚀 Quick Start

### 🔹 Option 1: Direct Browser Testing (Dev Mode)

```bash
git clone <repository-url>
cd employee-directory
```

Open the `index.html` in your browser:

```bash
# macOS
open index.html

# Or run a simple server:
python -m http.server 8000
```

Access:

* `file:///path/to/employee-directory/index.html`
* `http://localhost:8000` (if using local server)

---

### 🔹 Option 2: Freemarker Integration (Production Mode)

#### ✅ Prerequisites:

* Java 8+
* Maven or Gradle
* Spring Boot (preferred)

#### ✅ Sample Spring Boot Setup:

```java
@Controller
public class EmployeeController {
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("employees", mockEmployees);
        return "index";
    }
}
```

Run the application:

```bash
mvn spring-boot:run
# or
gradle bootRun
```

---

## 📱 Usage Guide

### ➕ Adding Employees

* Click **"Add Employee"**
* Fill all required fields (marked with `*`)
* Click **"Save Employee"**

### ✏️ Editing Employees

* Click **"Edit"** on any employee card
* Update fields in the modal
* Click **"Save Employee"**

### ❌ Deleting Employees

* Click **"Delete"**
* Confirm the deletion
* Employee is removed from directory

### 🔍 Searching & Filtering

* Use the search bar to find by name, email, department, or role
* Use **"Filter"** for advanced criteria
* Use **"Sort"** to reorder by attributes

### 📄 Pagination

* Navigate pages using controls at the bottom
* Choose how many items per page (10, 25, 50, 100)

---

## 🎨 Design & Accessibility

### 📱 Responsive Design:

* **Desktop**: Multi-column grid
* **Tablet**: Adjusted columns
* **Mobile**: Single column layout

### ♿ Accessibility:

* Semantic HTML structure
* Proper ARIA roles & labels
* Full keyboard navigation
* High contrast and screen reader compatibility

---

## 🧪 Manual Testing Checklist

* [x] Add employee (valid/invalid data)
* [x] Edit employee details
* [x] Delete with confirmation
* [x] Real-time search and filtering
* [x] Sorting by multiple fields
* [x] Pagination working correctly
* [x] Fully responsive on all screen sizes
* [x] Form validation and error display
* [x] Modal open/close behavior

---



## 👍 Contributing

1. Fork this repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---


## 👥 Authors

* **Ramesh** – Initial work – [rameshbanala](https://github.com/rameshbanala)

---

## 🙏 Acknowledgments

* AJACKUS – for assignment structure
* Modern web best practices
* WCAG accessibility guidelines
* Responsive UI/UX inspiration
