import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://dekyswplvzsbqzcdsavu.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRla3lzd3BsdnpzYnF6Y2RzYXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTAzOTYsImV4cCI6MjA4ODIyNjM5Nn0.4eBV6Gz30ZK9hrG4So3mXOxKeoB-MK6_0hKeJYeRS-c";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
