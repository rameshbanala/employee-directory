/**
 * Main Application Entry Point
 * Initializes the Employee Directory application
 */
class EmployeeDirectoryApp {
    constructor() {
        this.employeeManager = null;
        this.uiController = null;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    /**
     * Initialize application components
     */
    initializeApp() {
        try {
            // Initialize employee manager
            this.employeeManager = new EmployeeManager();

            // Initialize UI controller
            this.uiController = new UIController(this.employeeManager);

            // Initialize the UI
            this.uiController.init();

            // Set up global error handling
            this.setupErrorHandling();

            console.log('Employee Directory App initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Employee Directory App:', error);
            this.showFatalError();
        }
    }

    /**
     * Set up global error handling
     */
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.uiController.showNotification('An unexpected error occurred.', 'error');
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.uiController.showNotification('An unexpected error occurred.', 'error');
        });
    }

    /**
     * Show fatal error message
     */
    showFatalError() {
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.innerHTML = `
                <div class="error-container">
                    <h1>Application Error</h1>
                    <p>Sorry, the application failed to load. Please refresh the page and try again.</p>
                    <button onclick="window.location.reload()" class="btn btn--primary">Refresh Page</button>
                </div>
            `;
        }
    }
}

// Initialize the application
const app = new EmployeeDirectoryApp();
