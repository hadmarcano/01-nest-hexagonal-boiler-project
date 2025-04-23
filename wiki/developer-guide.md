# Developer Guide

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- PostgreSQL
- Docker (optional, for containerized development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nest-appcouse-00
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
yarn start:dev
```

## Project Structure

```
src/
├── modules/           # Feature modules
│   ├── auth/         # Authentication module
│   ├── user/         # User management
│   ├── course/       # Course management
│   ├── schedule/     # Schedule management
│   ├── appointment/  # Appointment system
│   ├── student/      # Student management
│   └── role/         # Role management
├── core/             # Core functionality
│   ├── decorators/   # Custom decorators
│   ├── filters/      # Exception filters
│   ├── guards/       # Authentication guards
│   ├── interceptors/ # Request/Response interceptors
│   └── pipes/        # Validation pipes
└── main.ts           # Application entry point
```

## Code Organization

### Module Structure

Each module follows this structure:
```
module-name/
├── controllers/      # HTTP controllers
├── services/         # Business logic
├── dto/             # Data Transfer Objects
├── entities/         # Database entities
├── interfaces/       # TypeScript interfaces
├── repositories/     # Database repositories
└── module.ts         # Module definition
```

### Naming Conventions

- Files: kebab-case (e.g., `user.service.ts`)
- Classes: PascalCase (e.g., `UserService`)
- Methods: camelCase (e.g., `getUserById`)
- Variables: camelCase (e.g., `userData`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

## Development Workflow

### 1. Creating a New Feature

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Implement the feature following the module structure
3. Write tests
4. Create a pull request

### 2. Code Style

The project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript strict mode

Run linting:
```bash
yarn lint
```

Format code:
```bash
yarn format
```

### 3. Testing

Run tests:
```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## API Development

### Creating a New Endpoint

1. Define the route in the controller:
```typescript
@Controller('users')
export class UserController {
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
```

2. Implement the service method:
```typescript
@Injectable()
export class UserService {
  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
```

3. Add validation using DTOs:
```typescript
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
```

## Database Operations

### Using TypeORM

1. Define an entity:
```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
```

2. Create a repository:
```typescript
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
}
```

## Authentication & Authorization

### Implementing Protected Routes

1. Use the `@UseGuards()` decorator:
```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
async getProfile(@Request() req) {
  return req.user;
}
```

2. Implement role-based access:
```typescript
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Post()
async createUser(@Body() createUserDto: CreateUserDto) {
  return this.userService.create(createUserDto);
}
```

## Error Handling

### Custom Exceptions

```typescript
export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}
```

### Global Exception Filter

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Handle exception
  }
}
```

## Logging

### Using the Logger

```typescript
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async createUser(userData: CreateUserDto) {
    this.logger.log(`Creating user: ${userData.email}`);
    // Implementation
  }
}
```

## Deployment

### Building for Production

```bash
yarn build
```

### Running in Production

```bash
yarn start:prod
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Troubleshooting

### Common Issues

1. Database Connection
   - Check PostgreSQL is running
   - Verify connection string in .env
   - Ensure database exists

2. Authentication
   - Verify JWT secret
   - Check token expiration
   - Validate user roles

3. API Errors
   - Check request format
   - Verify required fields
   - Validate data types

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 