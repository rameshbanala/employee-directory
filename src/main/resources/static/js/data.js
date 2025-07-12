/**
 * Mock Employee Data
 * This serves as our in-memory database for the application
 */
const mockEmployees = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@ajackus.com', department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@ajackus.com', department: 'IT', role: 'Developer' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@ajackus.com', department: 'Finance', role: 'Analyst' },
    { id: 4, firstName: 'Sarah', lastName: 'Williams', email: 'sarah.williams@ajackus.com', department: 'Marketing', role: 'Coordinator' },
    { id: 5, firstName: 'David', lastName: 'Brown', email: 'david.brown@ajackus.com', department: 'IT', role: 'Developer' },
    { id: 6, firstName: 'Lisa', lastName: 'Davis', email: 'lisa.davis@ajackus.com', department: 'HR', role: 'Specialist' },
    { id: 7, firstName: 'Robert', lastName: 'Miller', email: 'robert.miller@ajackus.com', department: 'Operations', role: 'Manager' },
    { id: 8, firstName: 'Emily', lastName: 'Wilson', email: 'emily.wilson@ajackus.com', department: 'Finance', role: 'Analyst' },
    { id: 9, firstName: 'James', lastName: 'Moore', email: 'james.moore@ajackus.com', department: 'IT', role: 'Developer' },
    { id: 10, firstName: 'Amanda', lastName: 'Taylor', email: 'amanda.taylor@ajackus.com', department: 'Marketing', role: 'Specialist' },
    { id: 11, firstName: 'Christopher', lastName: 'Anderson', email: 'christopher.anderson@ajackus.com', department: 'Operations', role: 'Coordinator' },
    { id: 12, firstName: 'Jessica', lastName: 'Thomas', email: 'jessica.thomas@ajackus.com', department: 'HR', role: 'Manager' },
    { id: 13, firstName: 'Daniel', lastName: 'Jackson', email: 'daniel.jackson@ajackus.com', department: 'IT', role: 'Developer' },
    { id: 14, firstName: 'Michelle', lastName: 'White', email: 'michelle.white@ajackus.com', department: 'Finance', role: 'Specialist' },
    { id: 15, firstName: 'Kevin', lastName: 'Harris', email: 'kevin.harris@ajackus.com', department: 'Marketing', role: 'Manager' },
    { id: 16, firstName: 'Rachel', lastName: 'Martin', email: 'rachel.martin@ajackus.com', department: 'Operations', role: 'Analyst' },
    { id: 17, firstName: 'Steven', lastName: 'Thompson', email: 'steven.thompson@ajackus.com', department: 'IT', role: 'Developer' },
    { id: 18, firstName: 'Nicole', lastName: 'Garcia', email: 'nicole.garcia@ajackus.com', department: 'HR', role: 'Coordinator' },
    { id: 19, firstName: 'Brian', lastName: 'Martinez', email: 'brian.martinez@ajackus.com', department: 'Finance', role: 'Manager' },
    { id: 20, firstName: 'Stephanie', lastName: 'Robinson', email: 'stephanie.robinson@ajackus.com', department: 'Marketing', role: 'Specialist' }
];

// Global variable to track the next available ID
let nextEmployeeId = Math.max(...mockEmployees.map(emp => emp.id)) + 1;

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mockEmployees, nextEmployeeId };
}
