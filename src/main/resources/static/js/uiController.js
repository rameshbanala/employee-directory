/**
 * UI Controller - Handles all UI interactions and updates
 */
class UIController {
    constructor(employeeManager) {
        this.employeeManager = employeeManager;
        this.currentEditingId = null;
        this.initializeElements();
        this.bindEvents();
    }

    /**
     * Initialize DOM elements
     */
    initializeElements() {
        // Main containers
        this.employeeListContainer = document.getElementById('employee-list-container');
        this.employeeModal = document.getElementById('employee-modal');
        this.employeeForm = document.getElementById('employee-form');
        this.filterPanel = document.getElementById('filter-panel');
        this.paginationContainer = document.getElementById('pagination-container');
        this.loadingIndicator = document.getElementById('loading-indicator');

        // Form elements
        this.modalTitle = document.getElementById('modal-title');
        this.firstNameInput = document.getElementById('firstName');
        this.lastNameInput = document.getElementById('lastName');
        this.emailInput = document.getElementById('email');
        this.departmentSelect = document.getElementById('department');
        this.roleSelect = document.getElementById('role');

        // Control elements
        this.searchInput = document.getElementById('search-input');
        this.sortSelect = document.getElementById('sort-select');
        this.itemsPerPageSelect = document.getElementById('items-per-page');
        this.filterFirstNameInput = document.getElementById('filter-firstName');
        this.filterDepartmentSelect = document.getElementById('filter-department');
        this.filterRoleSelect = document.getElementById('filter-role');

        // Buttons
        this.addEmployeeBtn = document.getElementById('add-employee-btn');
        this.filterBtn = document.getElementById('filter-btn');
        this.applyFilterBtn = document.getElementById('apply-filter-btn');
        this.clearFilterBtn = document.getElementById('clear-filter-btn');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.cancelBtn = document.getElementById('cancel-btn');
        this.prevPageBtn = document.getElementById('prev-page-btn');
        this.nextPageBtn = document.getElementById('next-page-btn');
        this.pageInfo = document.getElementById('page-info');
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Modal events
        this.addEmployeeBtn.addEventListener('click', () => this.showAddEmployeeModal());
        this.closeModalBtn.addEventListener('click', () => this.hideModal());
        this.cancelBtn.addEventListener('click', () => this.hideModal());
        this.employeeForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Search and filter events
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
        this.sortSelect.addEventListener('change', (e) => this.handleSort(e));
        this.filterBtn.addEventListener('click', () => this.toggleFilterPanel());
        this.applyFilterBtn.addEventListener('click', () => this.applyFilters());
        this.clearFilterBtn.addEventListener('click', () => this.clearFilters());

        // Pagination events
        this.itemsPerPageSelect.addEventListener('change', (e) => this.handleItemsPerPageChange(e));
        this.prevPageBtn.addEventListener('click', () => this.handlePrevPage());
        this.nextPageBtn.addEventListener('click', () => this.handleNextPage());

        // Click outside modal to close
        this.employeeModal.addEventListener('click', (e) => {
            if (e.target === this.employeeModal) {
                this.hideModal();
            }
        });

        // Click outside filter panel to close
        document.addEventListener('click', (e) => {
            if (!this.filterPanel.contains(e.target) && !this.filterBtn.contains(e.target)) {
                this.hideFilterPanel();
            }
        });
    }

    /**
     * Render employee list
     */
    renderEmployeeList() {
        const result = this.employeeManager.getPaginatedEmployees();
        const { employees, pagination } = result;

        // Clear existing content
        this.employeeListContainer.innerHTML = '';

        if (employees.length === 0) {
            this.employeeListContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No employees found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            this.updatePaginationControls(pagination);
            return;
        }

        // Render employee cards
        employees.forEach(employee => {
            const employeeCard = this.createEmployeeCard(employee);
            this.employeeListContainer.appendChild(employeeCard);
        });

        // Update pagination
        this.updatePaginationControls(pagination);

        // Bind card events
        this.bindCardEvents();
    }

    /**
     * Create employee card element
     * @param {Object} employee - Employee data
     * @returns {HTMLElement} - Employee card element
     */
    createEmployeeCard(employee) {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.setAttribute('data-employee-id', employee.id);

        card.innerHTML = `
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
        `;

        return card;
    }

    /**
     * Bind events to employee cards
     */
    bindCardEvents() {
        // Edit buttons
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const employeeId = e.target.getAttribute('data-id');
                this.showEditEmployeeModal(employeeId);
            });
        });

        // Delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const employeeId = e.target.getAttribute('data-id');
                this.handleDeleteEmployee(employeeId);
            });
        });
    }

    /**
     * Show add employee modal
     */
    showAddEmployeeModal() {
        this.currentEditingId = null;
        this.modalTitle.textContent = 'Add Employee';
        this.clearForm();
        this.showModal();
    }

    /**
     * Show edit employee modal
     * @param {number} employeeId - Employee ID to edit
     */
    showEditEmployeeModal(employeeId) {
        const employee = this.employeeManager.getEmployeeById(employeeId);
        if (!employee) return;

        this.currentEditingId = employeeId;
        this.modalTitle.textContent = 'Edit Employee';
        this.populateForm(employee);
        this.showModal();
    }

    /**
     * Show modal
     */
    showModal() {
        this.employeeModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.firstNameInput.focus();
    }

    /**
     * Hide modal
     */
    hideModal() {
        this.employeeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.clearForm();
        Validation.clearErrors();
    }

    /**
     * Clear form
     */
    clearForm() {
        this.employeeForm.reset();
        Validation.clearErrors();
    }

    /**
     * Populate form with employee data
     * @param {Object} employee - Employee data
     */
    populateForm(employee) {
        this.firstNameInput.value = employee.firstName;
        this.lastNameInput.value = employee.lastName;
        this.emailInput.value = employee.email;
        this.departmentSelect.value = employee.department;
        this.roleSelect.value = employee.role;
    }

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    handleFormSubmit(e) {
        e.preventDefault();

        const formData = {
            firstName: this.firstNameInput.value,
            lastName: this.lastNameInput.value,
            email: this.emailInput.value,
            department: this.departmentSelect.value,
            role: this.roleSelect.value
        };

        // Validate form
        const validation = Validation.validateForm(formData);
        if (!validation.isValid) {
            Validation.displayErrors(validation.errors);
            return;
        }

        // Show loading
        this.showLoading();

        // Simulate API delay
        setTimeout(() => {
            try {
                if (this.currentEditingId) {
                    // Update existing employee
                    this.employeeManager.updateEmployee(this.currentEditingId, formData);
                } else {
                    // Add new employee
                    this.employeeManager.addEmployee(formData);
                }

                this.hideLoading();
                this.hideModal();
                this.renderEmployeeList();
                this.showNotification(
                    this.currentEditingId ? 'Employee updated successfully!' : 'Employee added successfully!',
                    'success'
                );
            } catch (error) {
                this.hideLoading();
                this.showNotification('An error occurred. Please try again.', 'error');
            }
        }, 500);
    }

    /**
     * Handle employee deletion
     * @param {number} employeeId - Employee ID to delete
     */
    handleDeleteEmployee(employeeId) {
        const employee = this.employeeManager.getEmployeeById(employeeId);
        if (!employee) return;

        const confirmed = confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`);
        if (!confirmed) return;

        this.showLoading();

        // Simulate API delay
        setTimeout(() => {
            const success = this.employeeManager.deleteEmployee(employeeId);
            this.hideLoading();

            if (success) {
                this.renderEmployeeList();
                this.showNotification('Employee deleted successfully!', 'success');
            } else {
                this.showNotification('Failed to delete employee.', 'error');
            }
        }, 300);
    }

    /**
     * Handle search input
     * @param {Event} e - Input event
     */
    handleSearch(e) {
        const query = e.target.value;
        this.employeeManager.searchEmployees(query);
        this.renderEmployeeList();
    }

    /**
     * Handle sort selection
     * @param {Event} e - Change event
     */
    handleSort(e) {
        const sortBy = e.target.value;
        this.employeeManager.sortEmployees(sortBy);
        this.renderEmployeeList();
    }

    /**
     * Toggle filter panel
     */
    toggleFilterPanel() {
        const isVisible = this.filterPanel.style.display === 'block';
        if (isVisible) {
            this.hideFilterPanel();
        } else {
            this.showFilterPanel();
        }
    }

    /**
     * Show filter panel
     */
    showFilterPanel() {
        this.filterPanel.style.display = 'block';
        this.filterFirstNameInput.focus();
    }

    /**
     * Hide filter panel
     */
    hideFilterPanel() {
        this.filterPanel.style.display = 'none';
    }

    /**
     * Apply filters
     */
    applyFilters() {
        const filters = {
            firstName: this.filterFirstNameInput.value,
            department: this.filterDepartmentSelect.value,
            role: this.filterRoleSelect.value
        };

        this.employeeManager.filterEmployees(filters);
        this.renderEmployeeList();
        this.hideFilterPanel();
    }

    /**
     * Clear filters
     */
    clearFilters() {
        this.filterFirstNameInput.value = '';
        this.filterDepartmentSelect.value = '';
        this.filterRoleSelect.value = '';
        this.searchInput.value = '';
        this.sortSelect.value = '';

        this.employeeManager.clearFilters();
        this.renderEmployeeList();
        this.hideFilterPanel();
    }

    /**
     * Handle items per page change
     * @param {Event} e - Change event
     */
    handleItemsPerPageChange(e) {
        const itemsPerPage = parseInt(e.target.value);
        this.employeeManager.setItemsPerPage(itemsPerPage);
        this.renderEmployeeList();
    }

    /**
     * Handle previous page
     */
    handlePrevPage() {
        this.employeeManager.prevPage();
        this.renderEmployeeList();
    }

    /**
     * Handle next page
     */
    handleNextPage() {
        this.employeeManager.nextPage();
        this.renderEmployeeList();
    }

    /**
     * Update pagination controls
     * @param {Object} pagination - Pagination info
     */
    updatePaginationControls(pagination) {
        this.pageInfo.textContent = `Page ${pagination.currentPage} of ${pagination.totalPages}`;
        this.prevPageBtn.disabled = !pagination.hasPrev;
        this.nextPageBtn.disabled = !pagination.hasNext;

        // Update items per page display
        this.itemsPerPageSelect.value = pagination.itemsPerPage;
    }

    /**
     * Show loading indicator
     */
    showLoading() {
        this.loadingIndicator.style.display = 'flex';
    }

    /**
     * Hide loading indicator
     */
    hideLoading() {
        this.loadingIndicator.style.display = 'none';
    }

    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('notification--show');
        }, 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('notification--show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Initialize the UI
     */
    init() {
        this.renderEmployeeList();
    }
}
