/**
 * Employee Manager - Handles all employee data operations
 */
class EmployeeManager {
    constructor() {
        this.employees = [...mockEmployees]; // Copy of mock data
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentFilters = {};
        this.currentSort = '';
        this.searchQuery = '';
    }

    /**
     * Get all employees
     * @returns {Array} - Array of employees
     */
    getAllEmployees() {
        return this.employees;
    }

    /**
     * Get employee by ID
     * @param {number} id - Employee ID
     * @returns {Object|null} - Employee object or null if not found
     */
    getEmployeeById(id) {
        return this.employees.find(emp => emp.id === parseInt(id)) || null;
    }

    /**
     * Add new employee
     * @param {Object} employeeData - Employee data
     * @returns {Object} - Added employee with generated ID
     */
    addEmployee(employeeData) {
        const newEmployee = {
            id: nextEmployeeId++,
            firstName: employeeData.firstName.trim(),
            lastName: employeeData.lastName.trim(),
            email: employeeData.email.trim().toLowerCase(),
            department: employeeData.department,
            role: employeeData.role
        };

        this.employees.push(newEmployee);
        this.applyFiltersAndSort();
        return newEmployee;
    }

    /**
     * Update existing employee
     * @param {number} id - Employee ID
     * @param {Object} employeeData - Updated employee data
     * @returns {Object|null} - Updated employee or null if not found
     */
    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === parseInt(id));
        if (index === -1) return null;

        this.employees[index] = {
            ...this.employees[index],
            firstName: employeeData.firstName.trim(),
            lastName: employeeData.lastName.trim(),
            email: employeeData.email.trim().toLowerCase(),
            department: employeeData.department,
            role: employeeData.role
        };

        this.applyFiltersAndSort();
        return this.employees[index];
    }

    /**
     * Delete employee
     * @param {number} id - Employee ID
     * @returns {boolean} - True if deleted, false if not found
     */
    deleteEmployee(id) {
        const index = this.employees.findIndex(emp => emp.id === parseInt(id));
        if (index === -1) return false;

        this.employees.splice(index, 1);
        this.applyFiltersAndSort();
        return true;
    }

    /**
     * Search employees
     * @param {string} query - Search query
     */
    searchEmployees(query) {
        this.searchQuery = query.toLowerCase().trim();
        this.currentPage = 1;
        this.applyFiltersAndSort();
    }

    /**
     * Filter employees
     * @param {Object} filters - Filter criteria
     */
    filterEmployees(filters) {
        this.currentFilters = { ...filters };
        this.currentPage = 1;
        this.applyFiltersAndSort();
    }

    /**
     * Sort employees
     * @param {string} sortBy - Field to sort by
     */
    sortEmployees(sortBy) {
        this.currentSort = sortBy;
        this.applyFiltersAndSort();
    }

    /**
     * Apply filters, search, and sort
     */
    applyFiltersAndSort() {
        let result = [...this.employees];

        // Apply filters
        if (Object.keys(this.currentFilters).length > 0) {
            result = result.filter(employee => {
                return Object.keys(this.currentFilters).every(key => {
                    const filterValue = this.currentFilters[key];
                    if (!filterValue) return true;
                    
                    if (key === 'firstName') {
                        return employee.firstName.toLowerCase().includes(filterValue.toLowerCase());
                    }
                    return employee[key] === filterValue;
                });
            });
        }

        // Apply search
        if (this.searchQuery) {
            result = result.filter(employee => {
                const searchFields = [
                    employee.firstName,
                    employee.lastName,
                    employee.email,
                    employee.department,
                    employee.role
                ];
                return searchFields.some(field => 
                    field.toLowerCase().includes(this.searchQuery)
                );
            });
        }

        // Apply sort
        if (this.currentSort) {
            result.sort((a, b) => {
                const aValue = a[this.currentSort].toLowerCase();
                const bValue = b[this.currentSort].toLowerCase();
                return aValue.localeCompare(bValue);
            });
        }

        this.filteredEmployees = result;
    }

    /**
     * Get paginated employees
     * @returns {Object} - Paginated result with employees and pagination info
     */
    getPaginatedEmployees() {
        const totalItems = this.filteredEmployees.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const employees = this.filteredEmployees.slice(startIndex, endIndex);

        return {
            employees,
            pagination: {
                currentPage: this.currentPage,
                totalPages,
                totalItems,
                itemsPerPage: this.itemsPerPage,
                hasNext: this.currentPage < totalPages,
                hasPrev: this.currentPage > 1
            }
        };
    }

    /**
     * Set items per page
     * @param {number} itemsPerPage - Number of items per page
     */
    setItemsPerPage(itemsPerPage) {
        this.itemsPerPage = parseInt(itemsPerPage);
        this.currentPage = 1;
    }

    /**
     * Go to specific page
     * @param {number} page - Page number
     */
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
        }
    }

    /**
     * Go to next page
     */
    nextPage() {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
        }
    }

    /**
     * Go to previous page
     */
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.currentFilters = {};
        this.searchQuery = '';
        this.currentSort = '';
        this.currentPage = 1;
        this.applyFiltersAndSort();
    }
}
