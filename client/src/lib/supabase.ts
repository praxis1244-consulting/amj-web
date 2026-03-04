import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dekyswplvzsbqzcdsavu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRla3lzd3BsdnpzYnF6Y2RzYXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTAzOTYsImV4cCI6MjA4ODIyNjM5Nn0.4eBV6Gz30ZK9hrG4So3mXOxKeoB-MK6_0hKeJYeRS-c"
);
