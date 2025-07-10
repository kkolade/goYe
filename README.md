# GoYeCRM

A comprehensive multi-tenant CRM solution for Christian discipleship management, featuring contact management, growth tracking, and prayer coordination across mobile and web platforms.

## Features

- **Multi-tenant Architecture**: Isolated data and settings for different organizations
- **Contact Management**: Track disciples, prospects, and their spiritual journeys
- **Growth Plans**: Create and monitor spiritual growth plans
- **Prayer Coordination**: Real-time prayer request sharing and updates
- **Offline Support**: Full functionality without an internet connection
- **Role-based Access Control**: Granular permissions for different user roles

## Tech Stack

### Mobile App
- React Native with Expo
- Redux for state management
- React Navigation
- SQLite for local storage
- Firebase for authentication and real-time sync

### Web Dashboard
- Next.js
- React
- Redux
- Material-UI
- Firebase Web SDK

### Backend
- Node.js with Express
- PostgreSQL (primary database)
- Firebase Cloud Functions
- Redis (caching & pub/sub)

## Project Structure

```
goYe/
├── mobile/             # React Native mobile app
├── server/             # Node.js backend server
├── shared/             # Shared utilities and components
└── infra/              # Infrastructure as Code
```

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 7.0.0 (for workspaces support)
- Expo CLI (for mobile development)
- PostgreSQL (for local development)
- Firebase CLI (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kkolade/goYe.git
   cd goYe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development servers:
   ```bash
   # Start mobile app
   npm run start:mobile
   
   # Start web dashboard
   npm run start:web
   
   # Start backend server
   npm run start:server
   ```

## Development

### Scripts

- `npm run start:mobile` - Start mobile app in development mode
- `npm run start:web` - Start web dashboard
- `npm run start:server` - Start backend server
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## License

ISC

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## Support

For support, please open an issue in the [issue tracker](https://github.com/kkolade/goYe/issues).