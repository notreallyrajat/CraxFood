import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltxnzkoxepocxihkoveo.supabase.co';
const supabaseKey = 'sb_publishable_OWp6fjURR9IUf0ZEKXjeAw_nrpCk0ar';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('dishes').select('*');
  if (error) console.error("Error fetching dishes:", error);
  else console.log("Dishes fetched successfully:", data);
}

test();
