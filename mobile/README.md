# GoYeCRM Mobile

Mobile application for GoYeCRM - A Christian CRM for discipleship management.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase account with a project set up

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your Firebase configuration and other environment variables.

## Running the App

### Development

```bash
# Start the development server
npm start
# or
yarn start
```

### Building for Production

```bash
# Build for production
npm run build
# or
yarn build
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── config/        # App configuration
  ├── constants/     # Constants and enums
  ├── hooks/         # Custom React hooks
  ├── navigation/    # Navigation configuration
  ├── screens/       # App screens
  ├── services/      # API and service layer
  ├── store/         # Redux store and slices
  ├── theme/         # Styling and theming
  └── utils/         # Utility functions
```

## Contributing

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Write tests if applicable
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
