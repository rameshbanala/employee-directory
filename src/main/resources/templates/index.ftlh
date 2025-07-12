<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory - AJACKUS</title>
    <link rel="stylesheet" href="/static/css/base.css">
    <link rel="stylesheet" href="/static/css/layout.css">
    <link rel="stylesheet" href="/static/css/components.css">
    <link rel="stylesheet" href="/static/css/responsive.css">
</head>
<body>
    <div id="app">
        <header class="header">
            <div class="header__container">
                <h1 class="header__title">Employee Directory</h1>
                <button class="btn btn--primary" id="add-employee-btn">Add Employee</button>
            </div>
        </header>

        <main class="main">
            <!-- Search and Filter Controls -->
            <section class="controls">
                <div class="controls__search">
                    <input type="text" id="search-input" class="input input--search" placeholder="Search employees...">
                </div>
                <div class="controls__actions">
                    <button class="btn btn--secondary" id="filter-btn">Filter</button>
                    <select id="sort-select" class="select">
                        <option value="">Sort by...</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="department">Department</option>
                        <option value="role">Role</option>
                    </select>
                </div>
            </section>

            <!-- Filter Panel (Hidden by default) -->
            <section class="filter-panel" id="filter-panel">
                <div class="filter-panel__content">
                    <h3>Filter Employees</h3>
                    <div class="filter-panel__form">
                        <input type="text" id="filter-firstName" class="input" placeholder="First Name">
                        <select id="filter-department" class="select">
                            <option value="">All Departments</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Operations">Operations</option>
                        </select>
                        <select id="filter-role" class="select">
                            <option value="">All Roles</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Specialist">Specialist</option>
                        </select>
                        <div class="filter-panel__actions">
                            <button class="btn btn--primary" id="apply-filter-btn">Apply Filter</button>
                            <button class="btn btn--secondary" id="clear-filter-btn">Clear</button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Employee List Container -->
            <section class="employee-list" id="employee-list-container">
                <#-- Initial server-side rendering with Freemarker -->
                <#if employees??>
                    <#list employees as employee>
                        <div class="employee-card" data-employee-id="${employee.id}">
                            <div class="employee-card__header">
                                <h3 class="employee-card__name">${employee.firstName} ${employee.lastName}</h3>
                                <span class="employee-card__id">ID: ${employee.id}</span>
                            </div>
                            <div class="employee-card__details">
                                <p class="employee-card__email">${employee.email}</p>
                                <p class="employee-card__department">${employee.department}</p>
                                <p class="employee-card__role">${employee.role}</p>
                            </div>
                            <div class="employee-card__actions">
                                <button class="btn btn--small btn--secondary edit-btn" data-id="${employee.id}">Edit</button>
                                <button class="btn btn--small btn--danger delete-btn" data-id="${employee.id}">Delete</button>
                            </div>
                        </div>
                    </#list>
                </#if>
            </section>

            <!-- Pagination Controls -->
            <section class="pagination" id="pagination-container">
                <div class="pagination__info">
                    <select id="items-per-page" class="select select--small">
                        <option value="10">10 per page</option>
                        <option value="25">25 per page</option>
                        <option value="50">50 per page</option>
                        <option value="100">100 per page</option>
                    </select>
                </div>
                <div class="pagination__controls">
                    <button class="btn btn--small" id="prev-page-btn">Previous</button>
                    <span id="page-info">Page 1 of 1</span>
                    <button class="btn btn--small" id="next-page-btn">Next</button>
                </div>
            </section>
        </main>

        <!-- Add/Edit Employee Modal -->
        <div class="modal" id="employee-modal">
            <div class="modal__content">
                <div class="modal__header">
                    <h2 id="modal-title">Add Employee</h2>
                    <button class="modal__close" id="close-modal-btn">&times;</button>
                </div>
                <form class="form" id="employee-form">
                    <div class="form__group">
                        <label for="firstName" class="form__label">First Name *</label>
                        <input type="text" id="firstName" name="firstName" class="input" required>
                        <span class="form__error" id="firstName-error"></span>
                    </div>
                    <div class="form__group">
                        <label for="lastName" class="form__label">Last Name *</label>
                        <input type="text" id="lastName" name="lastName" class="input" required>
                        <span class="form__error" id="lastName-error"></span>
                    </div>
                    <div class="form__group">
                        <label for="email" class="form__label">Email *</label>
                        <input type="email" id="email" name="email" class="input" required>
                        <span class="form__error" id="email-error"></span>
                    </div>
                    <div class="form__group">
                        <label for="department" class="form__label">Department *</label>
                        <select id="department" name="department" class="select" required>
                            <option value="">Select Department</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Operations">Operations</option>
                        </select>
                        <span class="form__error" id="department-error"></span>
                    </div>
                    <div class="form__group">
                        <label for="role" class="form__label">Role *</label>
                        <select id="role" name="role" class="select" required>
                            <option value="">Select Role</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Specialist">Specialist</option>
                        </select>
                        <span class="form__error" id="role-error"></span>
                    </div>
                    <div class="form__actions">
                        <button type="submit" class="btn btn--primary">Save Employee</button>
                        <button type="button" class="btn btn--secondary" id="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Loading Indicator -->
    <div class="loading" id="loading-indicator">
        <div class="loading__spinner"></div>
    </div>

    <!-- Scripts -->
    <script src="/static/js/data.js"></script>
    <script src="/static/js/validation.js"></script>
    <script src="/static/js/employeeManager.js"></script>
    <script src="/static/js/uiController.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>
