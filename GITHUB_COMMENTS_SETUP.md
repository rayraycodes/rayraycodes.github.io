# GitHub Gists Comments Setup Guide

This comment system uses GitHub Gists API to store comments. All comments are stored in a single gist, organized by story ID.

## Setup Steps

### 1. Create a GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Portfolio Comments"
4. Select scope: **`gist`** (check the box)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### 2. Create a Gist to Store Comments

1. Go to: https://gist.github.com
2. Click "Create a new gist"
3. **Filename**: `comments.json`
4. **Initial content**:
   ```json
   {}
   ```
5. Choose **Public** or **Secret** (both work)
6. Click "Create public gist" or "Create secret gist"
7. **Copy the Gist ID** from the URL:
   - URL format: `https://gist.github.com/rayraycodes/{GIST_ID}`
   - Example: If URL is `https://gist.github.com/rayraycodes/abc123def456`, then Gist ID is `abc123def456`

### 3. Update Configuration

1. Open: `src/config/github.config.ts`
2. Update these values:
   ```typescript
   gistId: 'your-gist-id-here',  // Paste your Gist ID
   token: 'your-token-here',     // Paste your Personal Access Token (optional - users can enter their own)
   ```
3. Save the file

### 4. Optional: Set Default Token

You can set a default token in the config file, or users can enter their own token when posting comments. If you set a default token:
- All users can post comments using your token
- Comments will appear under your GitHub account
- **Security Note**: The token will be visible in the client-side code

**Better approach**: Leave token empty and let users enter their own tokens (stored in localStorage).

## How It Works

- **Reading Comments**: Public - anyone can read comments without authentication
- **Posting Comments**: Requires GitHub token with 'gist' scope
- **Storage**: All comments stored in a single gist file (`comments.json`)
- **Organization**: Comments organized by story ID in JSON format:
  ```json
  {
    "story-id-1": [
      { "id": "...", "name": "...", "message": "...", "timestamp": ... }
    ],
    "story-id-2": [...]
  }
  ```

## User Experience

1. **Viewing Comments**: Anyone can view comments without any setup
2. **Posting Comments**: 
   - User enters name and message
   - If no token is configured, user will be prompted to enter their GitHub token
   - Token is stored in localStorage for future use
   - User can post comments using their own GitHub account

## Security Considerations

- **Public Gist**: Comments are publicly visible
- **Token Security**: If you set a default token, it will be visible in client-side code
- **Recommendation**: Use user-provided tokens stored in localStorage, or implement a server-side proxy

## Troubleshooting

**"Gist ID not configured" error:**
- Make sure you've set `gistId` in `src/config/github.config.ts`

**"Failed to load comments" error:**
- Check that the gist exists and is accessible
- Verify the gist ID is correct

**"GitHub token required" error:**
- User needs to provide a GitHub token with 'gist' scope
- Token can be entered when posting a comment
- Token is saved in localStorage for future use

**"Failed to save comment" error:**
- Check that the token has 'gist' scope
- Verify the token is valid and not expired
- Make sure the gist exists and is accessible

## Example Configuration

```typescript
export const githubConfig = {
  username: 'rayraycodes',
  gistId: 'abc123def456',  // Your gist ID
  token: '',                // Leave empty for user-provided tokens
  filename: 'comments.json',
};
```

