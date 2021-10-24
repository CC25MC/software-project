import { supabase, supabaseAxios } from "../useSupabaseClient"

export const useAuth = () => {


    const signUp = async (email, password, phone, name, id, id_advice) => {
        const data = await supabase.auth.signUp({
            email: email,
            password: password,
            data: { phone, name, cedula: id }
        })
        if (data?.user) {
            const newRoom = await supabase
                .from('Perfil')
                .insert({ nombre_c: name, user_id: data?.user.id, cedula: id, phone: phone, id_consejo: id_advice });
            console.log(newRoom);
        }
        return {
            user: data?.user,
            error: data?.error
        }
    };

    const signIn = async (email, password) => {
        const { user, error } = await supabase.auth.signIn({
            email: email,
            password: password
        })
        return {
            user, error
        }
    };

    const user = supabase.auth.user();

    const getConsejo = async () => {
        let { data: Consejo, error } = await supabaseAxios.get("/Consejo")
        return { Consejo, error };
    }
    const getPerfil = async () => {
        let { data: Perfil, error } = await supabaseAxios.get(`/Perfil?user_id=eq.${user?.id}`)
        return { Perfil, error };
    }

    const getAgenda = async () => {
        let {Perfil} = await getPerfil();
        let { data: Agenda, error } = await supabaseAxios.get(`/Agenda?id_consejo=eq.${Perfil[0]?.id_consejo}&select=*`)
        return { Agenda, error };
    }
    const getPuntos = async () => {
        let{Perfil} = await getPerfil();
        let { data: Puntos, error } = await supabaseAxios.get(`/Puntos?id_consejo=eq.${Perfil[0]?.id_consejo}&select=*`)
        return { Puntos, error};
    }
    const update = async (email, password, phone) => {
        const { user, error } = await supabase.auth.update({
            email: email,
            password: password,
            phone: phone
        })
        return {
            user, error
        }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        return error ? false : true;

    }

    const verifyEmail = async (email) => {
        const { user, error } = await supabase.auth.signIn({
            email: email
        })
        return {
            user,
            error
        }
    };


    return {
        signUp,
        signIn,
        update,
        signOut,
        verifyEmail,
        user,
        getConsejo,
        getPerfil,
        getAgenda,
        getPuntos
    };
};

