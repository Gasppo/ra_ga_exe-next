import FormItem from "@UI/Forms/FormItem";
import HookForm from "@UI/Forms/HookForm";
import Footer from "@UI/Generic/Footer";
import HeaderBar from "@UI/Generic/HeaderBar";
import PageTitle from "@UI/Generic/Utils/PageTitle";
import { userInfoLayout } from "@UI/user/info/form/userInfo.layout";
import { obtainRole, verifyUserProfile } from "@backend/dbcalls/user";

import { UserInfoSchemaType } from "@backend/schemas/UserInfoSchema";
import { UserInfoUpdateSchema, UserInfoUpdateSchemaType } from "@backend/schemas/UserInfoUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Slide } from "@mui/material";
import ErrorAlerter from "@utils/ErrorHandler/ErrorAlerter";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import LoadingIndicator from "@utils/LoadingIndicator/LoadingIndicator";
import { ErrorMessage } from "@utils/queries/cotizador";
import { getUserInfo, updateUser } from "@utils/queries/user";
import { adminRole } from "@utils/roles/SiteRoles";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useContext } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";

const Home: NextPage = () => {

    const router = useRouter()
    const queryClient = useQueryClient()

    const { addError } = useContext(ErrorHandlerContext)
    const { userId } = router.query as { userId: string }

    const { data: userInfo, isLoading: isFetchingUserInfo } = useQuery<UserInfoSchemaType, ErrorMessage>(['userInfo', userId], () => getUserInfo(userId), {
        onError: () => addError('Error al traer información del usuario'),
        refetchOnWindowFocus: false,
    })

    const handleUserInfoSubmit = function (data: UserInfoSchemaType) {

        data = { ...data, userId: userId, id: userInfo?.id }
        delete data.createdAt
        delete data.updatedAt
        modifyUserInfoMutation(data)
    }

    const { mutate: modifyUserInfoMutation } = useMutation<UserInfoUpdateSchemaType, ErrorMessage, UserInfoUpdateSchemaType>
        (
            (data) => updateUser(data), {
            onError: () => addError('Error al modificar información del usuario'),
            onSuccess: () => {
                addError('Información modificada exitosamente', 'success')
                queryClient.invalidateQueries(['userInfo', userId])
                queryClient.invalidateQueries(['reducedUserInfo'])
            }
        })


    return (
        <div className="bg-split-white-black">
            <Head>
                <title>HS-Taller</title>
                <meta name="description" content="Ramiro Onate, Gaspar Garcia, Exequiel videla" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeaderBar />
            <main>
                <Slide in={true} timeout={500} direction='up'>
                    <div>
                        <ErrorAlerter />
                        <div className="container mx-auto flex flex-col min-h-[80vh] md:min-h-screen p-4 bg-white mt-20 rounded-none md:rounded-3xl shadow-2xl">
                            <LoadingIndicator show={isFetchingUserInfo && !userInfo} >
                                <PageTitle title="Mis datos" hasBack={false} />
                                <div className="flex justify-center items-center">
                                    {!isFetchingUserInfo && userInfo &&
                                        <div className="md:w-1/4 w-3/4">
                                            <HookForm defaultValues={userInfo} formOptions={{ resolver: zodResolver(UserInfoUpdateSchema) }} onSubmit={handleUserInfoSubmit} >
                                                <FormItem layout={userInfoLayout} />
                                                <div className='w-full mt-6 flex flex-row md:flex-row items-center md:justify-around justify-between'>
                                                    <Button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold md:py-2 md:px-4 rounded">Confirmar</Button>
                                                    <Button onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold md:py-2 md:px-4 rounded">Cancelar</Button>
                                                </div>
                                            </HookForm>
                                        </div>
                                    }
                                </div>
                            </LoadingIndicator>
                        </div>
                    </div >
                </Slide >
            </main >
            <Footer />
        </div >
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const correctUser = await verifyUserProfile(context.query.userId, session.user.email)

    const getUserRole = await obtainRole(session?.user?.email || '');

    if (!correctUser) {
        if (getUserRole?.role?.name !== adminRole) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }

        }
    }
    return { props: { session, role: getUserRole?.role?.name } };
};