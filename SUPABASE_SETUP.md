# Supabase Authentication Setup

This guide will help you set up Supabase authentication for your SkillSync project.

## Prerequisites

1. A Supabase account at [supabase.com](https://supabase.com)
2. A new or existing Supabase project

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter a project name (e.g., "skillsync")
5. Enter a database password (save this securely)
6. Choose a region close to your users
7. Click "Create new project"

## Step 2: Get Your Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## Step 3: Set Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Configure Authentication Providers (Optional)

### Google OAuth
1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google provider
3. Add your Google OAuth credentials (Client ID and Secret)
4. Set redirect URL: `https://your-domain.com/auth/callback`

### GitHub OAuth
1. Go to **Authentication** → **Providers** → **GitHub**
2. Enable GitHub provider
3. Add your GitHub OAuth credentials (Client ID and Secret)
4. Set redirect URL: `https://your-domain.com/auth/callback`

## Step 5: Test the Setup

1. Start your development server: `pnpm dev`
2. Navigate to `/signup` and try creating an account
3. Check your Supabase dashboard under **Authentication** → **Users** to see the new user
4. Try logging in with the created account

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**: Check that your environment variables are correct
2. **OAuth redirect errors**: Ensure redirect URLs are properly configured
3. **CORS errors**: Check that your domain is allowed in Supabase settings

### Environment Variable Issues

- Make sure `.env.local` is in your project root
- Restart your development server after adding environment variables
- Check that variable names start with `NEXT_PUBLIC_` for client-side access

## Security Notes

- Never commit `.env.local` to version control
- The anon key is safe to use in client-side code
- Use Row Level Security (RLS) in Supabase for data protection
- Consider implementing additional security measures for production

## Next Steps

After setting up authentication, you can:
1. Customize user profiles and metadata
2. Implement role-based access control
3. Add email verification workflows
4. Set up password reset functionality
5. Configure advanced authentication policies
