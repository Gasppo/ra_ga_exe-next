import FormItem from "@UI/Forms/FormItem";
import HookForm from "@UI/Forms/HookForm";
import Footer from "@UI/Generic/Footer";
import HeaderBar from "@UI/Generic/HeaderBar";
import PageTitle from "@UI/Generic/Utils/PageTitle";
import { userInfoLayout } from "@UI/user/info/form/userInfo.layout";
import { obtainRole, verifyUserProfile } from "@backend/dbcalls/user";
import { UserInfoSchema, UserInfoSchemaType } from "@backend/schemas/UserInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Slide } from "@mui/material";
import ErrorAlerter from "@utils/ErrorHandler/ErrorAlerter";
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import LoadingIndicator from "@utils/LoadingIndicator/LoadingIndicator";
import { ErrorMessage } from "@utils/queries/cotizador";
import { getUserInfo } from "@utils/queries/user";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";

const Home: NextPage = () => {

    const router = useRouter()
    const { addError } = useContext(ErrorHandlerContext)
    const { userId } = router.query as { userId: string }

    const { data: userInfo, isLoading: isFetchingUserInfo } = useQuery<UserInfoSchemaType, ErrorMessage>(['userInfo', userId], () => getUserInfo(userId), {
        onError: () => addError('Error al traer información del usuario'),
        refetchOnWindowFocus: false,
    })

    const handleUserInfoSubmit = function (data: UserInfoSchemaType) {
        console.log(JSON.stringify(data))

    }

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
                                        <HookForm defaultValues={userInfo} formOptions={{ resolver: zodResolver(UserInfoSchema) }} onSubmit={handleUserInfoSubmit} >
                                            <FormItem layout={userInfoLayout} />
                                            <Button type="submit">Confirmar</Button>
                                        </HookForm>
                                    }
                                </div>
                            </LoadingIndicator>
                        </div>
                    </div>
                </Slide>
            </main>
            <Footer />
        </div>
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
    const { role } = await obtainRole(session?.user?.email || '');

    if (!correctUser) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return { props: { session, role: role.name } };
};