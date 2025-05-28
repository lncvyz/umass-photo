import { randomBytes } from 'crypto';
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  const supabaseApiKey = process.env.SUPABASE_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  if(!supabaseApiKey) throw new Error("No API key found!");
  if(!supabaseUrl) throw new Error("No Supabase URL found!");

  const client = createClient(supabaseUrl, supabaseApiKey);
  const requestData = await request.json();
  client.auth.signInWithOtp(requestData);

  // if no email, redirect to login page

  const userData = await client
    .from("photoclubuser")
    .select("id, username, email, bio, role")
    .eq("email", requestData)
    .single();
  
  if (!userData) {
    // redirect to create acct
  }
}

// npm run dev to test; or postman