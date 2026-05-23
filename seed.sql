-- TRIPLE CROWN PERFORMANCE - DUMMY SEED DATA

INSERT INTO public.products (id, name, description, base_price, image_url, is_active)
VALUES
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'The Apex Forged', 'A lightweight, fully forged sports car wheel designed for maximum track performance without sacrificing street aesthetics.', 1200.00, 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?q=80&w=600&auto=format&fit=crop', true),
  ('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'The Titan Off-Road', 'A rugged, beadlock-capable truck wheel built to withstand the harshest terrains on earth. Extremely durable and aggressive.', 850.00, 'https://images.unsplash.com/photo-1590400582260-84c9ec189914?q=80&w=600&auto=format&fit=crop', true),
  ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'The Crown Jewel', 'Our signature luxury wheel. Featuring a deep dish design and mirror-polished finish, this wheel commands attention on any vehicle.', 1500.00, 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=600&auto=format&fit=crop', true);

INSERT INTO public.product_variants (product_id, sku, size, bolt_pattern, offset_value, finish, price_adjustment, stock_quantity)
VALUES
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'APEX-209-5114-MB', '20x9', '5x114.3', '+35', 'Matte Black', 0.00, 20),
  ('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'TITAN-179-6139-BZM', '17x9', '6x139.7', '-12', 'Bronze Machined', 0.00, 40),
  ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'CROWN-2210-5120-POL', '22x10', '5x120', '+20', 'High Polish', 200.00, 12);
