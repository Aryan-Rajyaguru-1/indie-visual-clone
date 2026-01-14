import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory rate limit store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3 // Max 3 submissions per hour per IP/email

function isRateLimited(key: string): { limited: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return { limited: false, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS }
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { 
      limited: true, 
      remaining: 0, 
      resetIn: record.resetTime - now 
    }
  }

  record.count++
  return { 
    limited: false, 
    remaining: MAX_REQUESTS_PER_WINDOW - record.count, 
    resetIn: record.resetTime - now 
  }
}

async function sendNotificationEmail(resend: Resend, submission: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
}) {
  const adminEmail = 'hello@apcreation.com' // Change to your admin email
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'AP Creation <onboarding@resend.dev>', // Update when domain is verified
      to: [adminEmail],
      subject: `New Contact Form Submission from ${submission.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #f97316; margin-bottom: 24px;">New Contact Form Submission</h1>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h2 style="margin-top: 0; color: #1e293b;">Contact Details</h2>
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
            ${submission.phone ? `<p><strong>Phone:</strong> ${submission.phone}</p>` : ''}
            ${submission.company ? `<p><strong>Company:</strong> ${submission.company}</p>` : ''}
            ${submission.projectType ? `<p><strong>Project Type:</strong> ${submission.projectType}</p>` : ''}
            ${submission.budgetRange ? `<p><strong>Budget Range:</strong> ${submission.budgetRange}</p>` : ''}
          </div>
          
          <div style="background: #fef3c7; border-radius: 8px; padding: 20px;">
            <h2 style="margin-top: 0; color: #1e293b;">Message</h2>
            <p style="white-space: pre-wrap;">${submission.message}</p>
          </div>
          
          <p style="margin-top: 24px; color: #64748b; font-size: 14px;">
            This email was sent from the AP Creation website contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Failed to send notification email:', error)
    } else {
      console.log('Notification email sent successfully:', data)
    }
  } catch (err) {
    console.error('Error sending notification email:', err)
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown'

    const body = await req.json()
    const { name, email, phone, company, projectType, budgetRange, message, userId } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Name must be between 2 and 100 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Message must be between 10 and 1000 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Rate limit by IP and email combination
    const rateLimitKey = `${clientIP}:${email.toLowerCase()}`
    const { limited, remaining, resetIn } = isRateLimited(rateLimitKey)

    if (limited) {
      const resetInMinutes = Math.ceil(resetIn / 60000)
      console.log(`Rate limited: ${rateLimitKey}`)
      return new Response(
        JSON.stringify({ 
          error: `Too many submissions. Please try again in ${resetInMinutes} minutes.`,
          retryAfter: resetIn
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(resetIn / 1000).toString()
          } 
        }
      )
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert the contact submission
    const { data, error } = await supabase.from('contact_submissions').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      company: company?.trim() || null,
      project_type: projectType || null,
      budget_range: budgetRange || null,
      message: message.trim(),
      user_id: userId || null,
    }).select().single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to submit your message. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Contact submission successful: ${email}, remaining: ${remaining}`)

    // Send notification email
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      await sendNotificationEmail(resend, {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim(),
        company: company?.trim(),
        projectType,
        budgetRange,
        message: message.trim(),
      })
    } else {
      console.warn('RESEND_API_KEY not configured, skipping email notification')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your message has been sent successfully!',
        remaining 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
