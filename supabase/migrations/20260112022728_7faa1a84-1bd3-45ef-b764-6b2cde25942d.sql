-- =====================================================
-- FIX 1: contact_submissions - Protect sensitive customer data
-- =====================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Authenticated users can view their submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can submit contact forms" ON public.contact_submissions;

-- Allow anyone (including anonymous) to submit contact forms
CREATE POLICY "Anyone can submit contact forms"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view all contact submissions (contains sensitive PII)
CREATE POLICY "Admins can view all contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own submissions if they were logged in when submitting
CREATE POLICY "Users can view their own submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id AND user_id IS NOT NULL);

-- =====================================================
-- FIX 2: blog_posts - Fix overly permissive policies
-- =====================================================

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authors can update their posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authors can delete their posts" ON public.blog_posts;

-- Only admins can create blog posts
CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Authors can only update their OWN posts (check author_id)
CREATE POLICY "Authors can update their own posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (auth.uid() = author_id);

-- Authors can only delete their OWN posts (check author_id)
CREATE POLICY "Authors can delete their own posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (auth.uid() = author_id);

-- Admins can update any post
CREATE POLICY "Admins can update any blog post"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete any post
CREATE POLICY "Admins can delete any blog post"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- FIX 3: Storage bucket - Make private and restrict access
-- =====================================================

-- Make the images bucket private
UPDATE storage.buckets
SET public = false
WHERE id = 'images';

-- Drop existing overly permissive storage policies
DROP POLICY IF EXISTS "Anyone can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Only admins can upload images
CREATE POLICY "Admins can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Only admins can update images
CREATE POLICY "Admins can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete images
CREATE POLICY "Admins can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Authenticated users can view images (for portfolio display)
CREATE POLICY "Authenticated users can view images"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'images');

-- =====================================================
-- FIX 4: handle_new_user - Add input validation
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  safe_full_name TEXT;
BEGIN
  -- Validate and sanitize full_name
  safe_full_name := TRIM(COALESCE(new.raw_user_meta_data ->> 'full_name', ''));
  
  -- Enforce length limits (prevent storage abuse)
  IF LENGTH(safe_full_name) > 100 THEN
    safe_full_name := LEFT(safe_full_name, 100);
  END IF;
  
  -- Insert with validated data
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, NULLIF(safe_full_name, ''));
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail user signup
    RAISE WARNING 'Failed to create profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$;