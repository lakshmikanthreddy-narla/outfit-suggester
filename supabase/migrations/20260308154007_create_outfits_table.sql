/*
  # Create outfits table

  1. New Tables
    - `outfits`
      - `id` (uuid, primary key)
      - `title` (text) - Outfit title like "Black Mode"
      - `occasion` (text) - Casual, Formal, Traditional, Party Wear
      - `color` (text) - black, white, blue, green, red, yellow
      - `image_url` (text) - URL to outfit image
      - `shirt_link` (text) - Link to shirt product
      - `pants_link` (text) - Link to pants product
      - `shoes_link` (text) - Link to shoes product
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `outfits` table
    - Add policy for public read access (anyone can view outfits)
*/

CREATE TABLE IF NOT EXISTS outfits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  occasion text NOT NULL,
  color text NOT NULL,
  image_url text NOT NULL,
  shirt_link text DEFAULT '',
  pants_link text DEFAULT '',
  shoes_link text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE outfits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view outfits"
  ON outfits
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert outfits"
  ON outfits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can delete outfits"
  ON outfits
  FOR DELETE
  TO anon, authenticated
  USING (true);