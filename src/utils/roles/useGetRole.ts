import { Role } from "@prisma/client";
import { errorHandle } from "@utils/queries/cotizador";
import { useQuery } from "react-query";

export const useGetRole = (email: string) => {

    const fetchRole = async (email: string): Promise<Role> => fetch(`/api/user/obtainRole`, { method: 'POST', headers: { "Content-Type": "application/json", accept: "application/json" }, body: JSON.stringify({ email: email }) })
        .then(res => res.ok ? res.json() : errorHandle(res))
        .catch((error) => { throw error });

    const { data, isFetching } = useQuery(['role', email], () => fetchRole(email))

    return { role: data?.name || 'N/A', isFetchingRole: isFetching }

}