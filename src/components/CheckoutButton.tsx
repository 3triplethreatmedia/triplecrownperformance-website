'use client'

import { useState } from 'react'

interface CheckoutButtonProps {
  productId: string
  price: number
  name: string
  image: string
}

export default function CheckoutButton({ productId, price, name, image }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          price,
          name,
          image,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Teleport the user to the secure Stripe Checkout page
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout is currently unavailable. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading}
      className="btn-secondary add-to-cart-btn"
    >
      {loading ? 'Processing...' : 'Secure Checkout'}
    </button>
  )
}
