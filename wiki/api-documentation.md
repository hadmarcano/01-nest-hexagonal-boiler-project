# API Documentation

## Overview

This document provides detailed information about the available API endpoints in the NestJS Course Management System. All endpoints require authentication unless otherwise specified.

## Authentication

### Login

```http
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

## User Management

### Get User Profile

```http
GET /users/profile
```

Response:
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "user@example.com",
  "role": "USER",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### Update User Profile

```http
PATCH /users/profile
```

Request body:
```json
{
  "name": "John Updated",
  "email": "updated@example.com"
}
```

## Course Management

### Get All Courses

```http
GET /courses
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term
- `sort`: Sort field
- `order`: Sort order (asc/desc)

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Course Title",
      "description": "Course Description",
      "instructor": {
        "id": "uuid",
        "name": "Instructor Name"
      },
      "schedule": {
        "startDate": "2023-01-01",
        "endDate": "2023-12-31"
      }
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

### Create Course

```http
POST /courses
```

Request body:
```json
{
  "title": "New Course",
  "description": "Course Description",
  "instructorId": "uuid",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31"
}
```

## Schedule Management

### Get Course Schedule

```http
GET /courses/:courseId/schedule
```

Response:
```json
{
  "id": "uuid",
  "courseId": "uuid",
  "sessions": [
    {
      "id": "uuid",
      "date": "2023-01-01",
      "startTime": "09:00",
      "endTime": "11:00",
      "location": "Room 101"
    }
  ]
}
```

### Update Schedule

```http
PATCH /courses/:courseId/schedule
```

Request body:
```json
{
  "sessions": [
    {
      "date": "2023-01-01",
      "startTime": "09:00",
      "endTime": "11:00",
      "location": "Room 101"
    }
  ]
}
```

## Appointment System

### Book Appointment

```http
POST /appointments
```

Request body:
```json
{
  "courseId": "uuid",
  "studentId": "uuid",
  "date": "2023-01-01",
  "time": "14:00",
  "duration": 30
}
```

### Get Student Appointments

```http
GET /students/:studentId/appointments
```

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "course": {
        "id": "uuid",
        "title": "Course Title"
      },
      "date": "2023-01-01",
      "time": "14:00",
      "duration": 30,
      "status": "CONFIRMED"
    }
  ]
}
```

## Error Responses

### Validation Error

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Not Found Error

```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### Unauthorized Error

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

## Rate Limiting

- All endpoints are rate-limited to 100 requests per minute per IP address
- Authentication endpoints have a lower limit of 10 requests per minute

## Pagination

All list endpoints support pagination with the following query parameters:
- `page`: Page number (1-based)
- `limit`: Items per page (default: 10)
- `sort`: Field to sort by
- `order`: Sort direction (asc/desc)

## Filtering

List endpoints support filtering using query parameters:
- `search`: Text search across relevant fields
- `status`: Filter by status
- `dateFrom`: Filter by start date
- `dateTo`: Filter by end date

## Response Format

All successful responses follow this format:
```json
{
  "data": {}, // or [] for list responses
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

## WebSocket Events

The system also provides real-time updates via WebSocket:

```typescript
// Connect to WebSocket
const ws = new WebSocket('ws://api.example.com/ws');

// Listen for events
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'APPOINTMENT_CREATED':
      // Handle new appointment
      break;
    case 'SCHEDULE_UPDATED':
      // Handle schedule update
      break;
  }
};
```

Available WebSocket events:
- `APPOINTMENT_CREATED`
- `APPOINTMENT_UPDATED`
- `APPOINTMENT_CANCELLED`
- `SCHEDULE_UPDATED`
- `COURSE_CREATED`
- `COURSE_UPDATED` 