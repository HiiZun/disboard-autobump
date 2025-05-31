# FORK of [appu1232/Discord-Selfbot](https://github.com/appu1232/Discord-Selfbot)
Added support for custom slashcommand id, dockerization and multitoken support

# Discord Auto Bump Selfbot
[<img src="https://img.shields.io/github/license/appu1232/Discord-Selfbot.svg">](https://github.com/MonkoTubeYT/Disboard-Auto-Bump-Selfbot/blob/main/LICENSE)
![Docker Image CI](https://github.com/hiizun/disboard-autobump/actions/workflows/docker-build.yml/badge.svg)
[![Docker Image](https://img.shields.io/badge/Docker-ghcr.io-blue?logo=docker)](https://github.com/users/hiizun/packages/container/package/disboard-autobump)

A selfbot that automatically bumps on Disboard.
# WARNING
Selfbots are against Discord's Terms of Service.
Which can be found at https://discord.com/guidelines and https://discord.com/terms

This code is strictly educational.

I am not liable for any accounts that get moderated by Discord due to the use of this selfbot.

# Setup
Open **.env**:
```
# Multiple tokens separated by commas (e.g., token1,token2,token3)
TOKEN=

# Multiple bump channels separated by commas (e.g., channel1,channel2,channel3)
# Must match the number of tokens
BUMP_CHANNEL=

# Custom slash command ID (optional, defaults to Disboard's ID)
SLASH_ID=302050872383242240
```

## Multi-Token Support
You can now run multiple bots simultaneously by providing multiple tokens and channels:
- Separate tokens with commas in the `TOKEN` field
- Separate channel IDs with commas in the `BUMP_CHANNEL` field  
- The number of tokens must match the number of channels
- Each bot will have a random delay to avoid detection

Example:
```
TOKEN=token1,token2,token3
BUMP_CHANNEL=channel1,channel2,channel3
```

## Custom Slash Command ID
You can now specify a custom slash command ID in the `SLASH_ID` field. If not specified, it defaults to Disboard's ID (`302050872383242240`).

## Docker Support
This bot supports Docker deployment with automatic builds via GitHub Container Registry (GHCR).

### Using Pre-built Images from GHCR:
Images are automatically built and published to GHCR on every push to the main branch.

**Quick Start:**
```bash
# Create your .env file first (copy from .env.example)
cp .env.example .env
# Edit .env with your tokens and channels

# Pull and run the latest image
docker pull ghcr.io/hiizun/disboard-autobump:latest
docker run -d --name discord-autobump --env-file .env ghcr.io/hiizun/disboard-autobump:latest
```

**Using Docker Compose (Recommended):**
```bash
# For production deployment with GHCR image
docker-compose -f docker-compose.prod.yml up -d

# For local development with auto-build
docker-compose up -d
```

### Manual Docker Build:
```bash
# Build locally
docker build -t disboard-autobump .

# Run locally built image
docker run -d --name discord-autobump --env-file .env disboard-autobump
```

### Container Management:
```bash
# Check logs
docker logs discord-autobump

# Follow logs in real-time
docker logs -f discord-autobump

# Stop and remove container
docker stop discord-autobump && docker rm discord-autobump

# Check container health
docker inspect --format='{{json .State.Health}}' discord-autobump

# Access health endpoint
curl http://localhost:3000/health
```

## GitHub Actions & Automatic Builds

This project includes a GitHub Actions workflow that automatically:
- Builds Docker images on every push to main branch
- Publishes images to GitHub Container Registry (GHCR)
- Supports multiple architectures (linux/amd64, linux/arm64)

The Docker image is available at: `ghcr.io/hiizun/disboard-autobump:latest`

## Testing & Monitoring

### Health Monitoring
The bot includes built-in health monitoring at `http://localhost:3000/health`

### Quick Test
```bash
# Test if container is running properly
docker ps | grep discord-autobump

# Check health endpoint
curl http://localhost:3000/health

# View recent logs
docker logs --tail 20 discord-autobump
```

# How to get user token
1. Open Discord
2. Press `CTRL+SHIFT+I` to open the Developer Console
3. Copy and paste the code below into the console to automatically copy your user token to the clipboard.
```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    if (!req.c) {
      console.error('req.c is undefined or null');
      return;
    }

    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```
