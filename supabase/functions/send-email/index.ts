
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailPayload {
  recipients: string[];
  subject: string;
  content: string;
  templateId?: string;
}

interface ErrorResponse {
  success: boolean;
  error: string;
  details?: any;
}

// Helper functions for consistent responses
function successResponse(data: any) {
  return new Response(
    JSON.stringify({
      success: true,
      ...data
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    }
  );
}

function errorResponse(error: string, details?: any, status = 500): Response {
  const errorObj: ErrorResponse = {
    success: false,
    error
  };
  
  if (details) {
    errorObj.details = details;
  }
  
  return new Response(
    JSON.stringify(errorObj),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status,
    }
  );
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Supabase connection details from environment
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables");
      return errorResponse(
        "Server configuration error", 
        { message: "Missing required environment variables" },
        500
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse request body
    let payload: EmailPayload;
    try {
      payload = await req.json();
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return errorResponse(
        "Invalid request body", 
        { message: "Could not parse JSON" },
        400
      );
    }
    
    // Validate payload
    const { recipients, subject, content, templateId } = payload;
    
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return errorResponse(
        "Invalid recipients", 
        { message: "Recipients must be a non-empty array" },
        400
      );
    }
    
    if (!subject || typeof subject !== 'string') {
      return errorResponse(
        "Invalid subject", 
        { message: "Subject is required" },
        400
      );
    }
    
    if (!content || typeof content !== 'string') {
      return errorResponse(
        "Invalid content", 
        { message: "Content is required" },
        400
      );
    }

    // In a real implementation, you would use an email service like SendGrid, Resend, etc.
    // For this example, we'll simulate email sending and store in the database
    
    const timestamp = new Date().toISOString();
    
    // Get the current user if available
    let userId = "system";
    try {
      const user = await supabase.auth.getUser();
      if (user.data.user?.id) {
        userId = user.data.user.id;
      }
    } catch (e) {
      console.warn("Could not get user ID, using default:", e);
    }

    // Store the communication record in our table
    let insertData;
    try {
      const { data, error } = await supabase
        .from('communication_history')
        .insert({
          type: 'email',
          subject,
          content,
          recipients,
          sent_at: timestamp,
          sent_by: userId,
          status: 'sent',
          template_id: templateId
        })
        .select();

      if (error) throw error;
      insertData = data;
      
    } catch (error) {
      console.error("Database error:", error);
      return errorResponse(
        "Database error", 
        { message: error.message, code: error.code },
        500
      );
    }

    console.log("Email sent and recorded:", insertData);

    // Simulate a successful email response
    return successResponse({ 
      message: "Email sent successfully", 
      timestamp,
      id: insertData[0].id,
      recipientsCount: recipients.length
    });
    
  } catch (error) {
    console.error("Unexpected error in send-email function:", error);
    return errorResponse(
      "Server error", 
      { message: error.message },
      500
    );
  }
});
