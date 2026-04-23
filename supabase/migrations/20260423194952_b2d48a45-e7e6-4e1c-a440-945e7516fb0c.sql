-- Harden RLS on storage.objects for the nexa-uploads bucket.
-- Product requirement: anonymous visitors must be able to upload files
-- through the Nexa chat (lead capture) WITHOUT signing in.
-- Security model:
--   * INSERT: allowed for anon + authenticated, but ONLY into the 'chat/' prefix,
--     and ONLY for the 'nexa-uploads' bucket. No path traversal possible because
--     storage.foldername() is used.
--   * SELECT / UPDATE / DELETE: NO public policies. The bucket is private and
--     RLS default-denies. Files are read server-side via the service role key
--     (see src/routes/api/send-lead.ts) which bypasses RLS, then delivered to
--     the team via signed URLs in the email. Visitors can never list, read,
--     overwrite, or delete files — even their own — through the public API.

-- Drop any previous permissive policies on this bucket so we start clean.
DROP POLICY IF EXISTS "Nexa anon uploads" ON storage.objects;
DROP POLICY IF EXISTS "Nexa uploads insert" ON storage.objects;
DROP POLICY IF EXISTS "Nexa uploads select" ON storage.objects;
DROP POLICY IF EXISTS "Nexa uploads update" ON storage.objects;
DROP POLICY IF EXISTS "Nexa uploads delete" ON storage.objects;

-- Single INSERT policy: scoped to bucket + 'chat/' folder only.
CREATE POLICY "Nexa uploads insert chat folder only"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'nexa-uploads'
  AND (storage.foldername(name))[1] = 'chat'
);

-- Intentionally NO SELECT / UPDATE / DELETE policies.
-- RLS denies by default, so only the service role (server-side) can access files.