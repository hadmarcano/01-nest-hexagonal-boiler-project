# NestJS Course Management System

A comprehensive course management system built with NestJS, featuring user management, course scheduling, and appointment booking capabilities.

## Table of Contents

- [Project Overview](wiki/project-overview.md)
- [System Architecture](wiki/architecture.md)
- [Developer Guide](wiki/developer-guide.md)
- [API Documentation](wiki/api-documentation.md)

## Quick Start

```bash
# Install dependencies
yarn install

# Start the development server
yarn start:dev

# Build for production
yarn build

# Start in production mode
yarn start:prod
```

## Project Structure

The project follows a modular architecture with the following main components:

- `src/modules/` - Contains the main application modules
  - `auth/` - Authentication and authorization
  - `user/` - User management
  - `course/` - Course management
  - `schedule/` - Scheduling system
  - `appointment/` - Appointment booking
  - `student/` - Student management
  - `role/` - Role-based access control

## Documentation

For detailed documentation, please refer to the [wiki](wiki/) directory:

- [Project Overview](wiki/project-overview.md) - High-level overview of the project
- [System Architecture](wiki/architecture.md) - Technical architecture and design decisions
- [Developer Guide](wiki/developer-guide.md) - Guide for developers working on the project
- [API Documentation](wiki/api-documentation.md) - Detailed API documentation

## License

This project is licensed under the MIT License - see the LICENSE file for details.
