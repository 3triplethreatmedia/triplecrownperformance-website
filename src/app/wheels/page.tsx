import { createClient } from '@/utils/supabase/server'
import CheckoutButton from '@/components/CheckoutButton'

export default async function WheelsPage() {
  const supabase = await createClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <div className="wheels-page container">
      <div className="wheels-header">
        <h1 className="page-title">The Collection</h1>
        <p className="page-subtitle">Premium forged and off-road wheels engineered for ultimate performance.</p>
      </div>

      {!products || products.length === 0 ? (
        <div className="empty-state glass-panel">
          <h2>Inventory Loading...</h2>
          <p>We are currently updating our collection with brand new models. Check back soon!</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card glass-panel">
              <div className="product-image-wrapper">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <div className="product-title-row">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${Number(product.base_price).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                </div>
                <p className="product-description">{product.description}</p>
                <CheckoutButton 
                  productId={product.id} 
                  price={product.base_price} 
                  name={product.name} 
                  image={product.image_url} 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
