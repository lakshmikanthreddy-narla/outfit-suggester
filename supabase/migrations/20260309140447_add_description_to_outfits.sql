/*
  # Add description field to outfits table

  1. Changes
    - Add optional `description` field to store style notes
    - Field allows storing optional brief style descriptions for outfits
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'outfits' AND column_name = 'description'
  ) THEN
    ALTER TABLE outfits ADD COLUMN description text DEFAULT '';
  END IF;
END $$;