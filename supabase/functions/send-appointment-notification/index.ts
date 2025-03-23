
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key from environment variable
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Set up CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentData {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  location: string | null;
  type: string;
}

interface RequestBody {
  appointment: AppointmentData;
  recipients?: string[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const reqBody = await req.json();
    console.log("Request body:", JSON.stringify(reqBody));
    
    // Destructure with default values to prevent undefined errors
    const { appointment, recipients = ["user@example.com"] } = reqBody as RequestBody;

    if (!appointment) {
      throw new Error("Appointment data is required");
    }

    console.log("Sending email notification for appointment:", appointment.title);
    console.log("Recipients:", recipients);

    // Format appointment dates
    const startTime = formatDate(appointment.start_time);
    const endTime = formatDate(appointment.end_time);

    // Create HTML for the email
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f5f5f5; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; border: 1px solid #eaeaea; border-radius: 0 0 5px 5px; }
            .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }
            h1 { color: #007bff; margin: 0; }
            .detail { margin-bottom: 10px; }
            .label { font-weight: bold; }
            .recipients { margin-top: 20px; border-top: 1px solid #eaeaea; padding-top: 10px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Appointment: ${appointment.title}</h1>
            </div>
            <div class="content">
              <p>A new appointment has been scheduled:</p>
              
              <div class="detail">
                <span class="label">Type:</span> ${appointment.type}
              </div>
              
              <div class="detail">
                <span class="label">Start:</span> ${startTime}
              </div>
              
              <div class="detail">
                <span class="label">End:</span> ${endTime}
              </div>
              
              ${appointment.location ? `
              <div class="detail">
                <span class="label">Location:</span> ${appointment.location}
              </div>
              ` : ''}
              
              ${appointment.description ? `
              <div class="detail">
                <span class="label">Description:</span><br>
                ${appointment.description}
              </div>
              ` : ''}
              
              <p>Please add this appointment to your calendar.</p>
              
              <div class="recipients">
                <p>This notification was sent to: ${recipients.join(', ')}</p>
              </div>
            </div>
            <div class="footer">
              This is an automated notification. Please do not reply to this email.
            </div>
          </div>
        </body>
      </html>
    `;

    // Send the email with proper error handling
    console.log("Attempting to send email via Resend...");
    
    const emailData = {
      from: "Appointments <onboarding@resend.dev>",
      to: recipients,
      subject: `New Appointment: ${appointment.title}`,
      html: html,
    };
    
    console.log("Email data:", JSON.stringify(emailData));
    
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Resend API error:", error);
      throw new Error(`Resend API error: ${error.message || JSON.stringify(error)}`);
    }

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true, message: "Email notification sent" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("Error in send-appointment-notification function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 200, // Return 200 even on error to prevent the FunctionsHttpError
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
