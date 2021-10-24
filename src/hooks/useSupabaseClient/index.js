import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SUPABASE_URL, SUPABASE_KEY } from "@env";

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey,{localStorage: AsyncStorage});

export const supabaseAxios = axios.create({
    baseURL: supabaseUrl+"/rest/v1",
    headers:{
        apiKey: supabaseKey
    }
})