'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('A secure sign in link has been sent to your email! Please check your inbox (and spam folder) to sign in. Be sure to double-check that you typed your email correctly!')
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-container glass-panel">
        <h1 className="login-title">Client Access</h1>
        <p className="login-subtitle">Enter your email below to securely sign in or create an account. No passwords required.</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="login-input"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary login-btn">
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message && <div className="login-message success">{message}</div>}
        {error && <div className="login-message error">{error}</div>}
      </div>
    </div>
  )
}
