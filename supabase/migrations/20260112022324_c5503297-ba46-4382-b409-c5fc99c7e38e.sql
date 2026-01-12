-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table (roles MUST be in separate table, not on profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create security definer function to check roles (prevents recursive RLS issues)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop existing overly permissive portfolio policies
DROP POLICY IF EXISTS "Authenticated users can insert portfolio" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Authenticated users can update portfolio" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Authenticated users can delete portfolio" ON public.portfolio_projects;

-- Create new admin-only policies for portfolio_projects using the has_role function
CREATE POLICY "Admins can insert portfolio projects"
ON public.portfolio_projects
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update portfolio projects"
ON public.portfolio_projects
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete portfolio projects"
ON public.portfolio_projects
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Remove the role column from profiles table (roles should be in user_roles table)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;