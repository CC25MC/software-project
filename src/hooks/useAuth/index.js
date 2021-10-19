import { supabase } from "../useSupabaseClient"

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
        let { data: Consejo, error } = await supabase
            .from('Consejo')
            .select('*')
        return { Consejo, error };
    }
    const getPerfil = async () => {
        let { data: Perfil, error } = await supabase
            .from('Perfil')
            .select('*')
            .eq("user_id", user?.id);
        return { Perfil, error };
    }

    const getAgenda = async () => {
        let{Perfil} = await getPerfil();
        let { data: Agenda, error } = await supabase
            .from('Agenda')
            .select('*')
            .eq("id_consejo", Perfil[0]?.id_consejo)
        return { Agenda, error };
    }
    const getPuntos = async () => {
        let{Perfil} = await getPerfil();
        let { data: Puntos, error } = await supabase
            .from('Puntos')
            .select('*')
            .eq("id_consejo", Perfil[0]?.id_consejo)
        return { Puntos: Puntos, error};
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

