
export const useGetRole = (email: string) => {

    const adminGroup = ['garciagb24@gmail.com', 'admin@admin.com']

    if (adminGroup.includes(email)) {
        return 'admin'
    }

    return 'user'
}