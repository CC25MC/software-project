import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.REACT_NATIVE_SUPABASE_URL || "https://hwuzigdplraxqkfrtbqf.supabase.co";
const supabaseKey = process.env.REACT_NATIVE_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDQwNzczMCwiZXhwIjoxOTQ5OTgzNzMwfQ.mkEjBrP7gnKEK_S5zvGlq30tNmH4R9VjbgquY-bBezY";
export const supabase = createClient(supabaseUrl, supabaseKey,{localStorage: AsyncStorage as any});
