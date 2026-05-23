'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const emailsMatch = email.length > 0 && confirmEmail.length > 0 && email === confirmEmail
  const emailsMismatch = confirmEmail.length > 0 && email !== confirmEmail

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!emailsMatch) {
      setError('Please ensure both email addresses match.')
      return
    }

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
      setMessage('A secure sign in link has been sent to your email! Please check your inbox (and spam folder) to sign in.')
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-container glass-panel">
        <h1 className="login-title">Client Access</h1>
        <p className="login-subtitle">Enter your email twice below to securely sign in or create an account. No passwords required.</p>
        
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
          
          <div className="input-group" style={{ position: 'relative' }}>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Confirm email address"
              required
              className="login-input"
              style={{
                borderColor: emailsMatch ? '#4ade80' : emailsMismatch ? '#f87171' : '',
                transition: 'border-color 0.2s ease',
                paddingRight: '2.5rem' // Make room for the emoji icon
              }}
            />
            {confirmEmail.length > 0 && (
              <span style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                fontSize: '1.2rem',
                pointerEvents: 'none' // Ensures clicking the icon doesn't block the input
              }}>
                {emailsMatch ? '✅' : '❌'}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading || (confirmEmail.length > 0 && !emailsMatch)} 
            className="btn-primary login-btn"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message && <div className="login-message success">{message}</div>}
        {error && <div className="login-message error">{error}</div>}
      </div>
    </div>
  )
}
