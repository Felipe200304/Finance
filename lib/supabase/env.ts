type SupabaseEnvName = 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY'

function readEnv(name: SupabaseEnvName) {
  if (name === 'NEXT_PUBLIC_SUPABASE_URL') {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
  }

  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

function getRequiredEnv(name: SupabaseEnvName) {
  const value = readEnv(name)

  if (!value || !value.trim()) {
    throw new Error(
      `[Supabase] Missing environment variable: ${name}. Configure it in .env.local and restart the dev server.`,
    )
  }

  return value.trim()
}

function getValidatedSupabaseUrl() {
  const url = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL')

  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error('invalid protocol')
    }
  } catch {
    throw new Error(
      `[Supabase] Invalid NEXT_PUBLIC_SUPABASE_URL: "${url}". Use a full HTTP/HTTPS URL from Supabase Dashboard > Settings > API > Project URL.`,
    )
  }

  return url
}

export function getSupabaseEnv() {
  return {
    url: getValidatedSupabaseUrl(),
    anonKey: getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  }
}