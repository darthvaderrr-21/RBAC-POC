Assumptions & Notes

In-memory storage
User data is stored in RAM using a simple in-memory array. This is done only for this assignment and testing purposes to avoid database setup.

JWT-based authentication
The application uses stateless authentication with JWT. No server-side sessions are maintained.

Role-based access control
Access to APIs is controlled using roles (Admin, Manager, User). Permissions are derived from roles and shared during login mainly for client-side usage.

Single server instance
The system assumes a single running instance of the application. This is acceptable since no persistent storage.

Simplified forgot-password flow
Password reset is implemented using a token-based approach

Minimal dependencies
Only essential libraries are used to keep the implementation clean, readable.
