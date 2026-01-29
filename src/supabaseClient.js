import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://ydmumpaarisrlnpybhcp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkbXVtcGFhcmlzcmxucHliaGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjc5MjEsImV4cCI6MjA3Mjc0MzkyMX0.RFsW2XO3VxR-KoPjGLXfhLZs9gCoz--vGdlFI5hq6sQ";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
