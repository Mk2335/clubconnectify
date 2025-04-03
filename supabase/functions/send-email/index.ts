
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { recipients, subject, content, templateId }: EmailPayload = await req.json();

    // In a real implementation, you would use an email service like SendGrid, Resend, etc.
    // For this example, we'll simulate email sending and store in the database
    
    const timestamp = new Date().toISOString();
    
    // Get the current user if available
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id || "system";

    // Store the communication record in our new table
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

    console.log("Email sent and recorded:", data);

    // Simulate a successful email response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully", 
        timestamp,
        id: data[0].id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
