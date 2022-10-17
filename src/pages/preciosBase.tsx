import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CreateIcon from '@mui/icons-material/Create';
import { Button, Slide, Tab, Tabs } from "@mui/material";
import { ComplejidadConfeccion, TipoPrenda } from "@prisma/client";
import HeaderBar from "@UI/Generic/HeaderBar";
import AddNewCategoryDialog from "@UI/orden/AddNewCategoryDialog";
import EditCategoryDialog from '@UI/orden/EditCategoryDialog';
import { ErrorHandlerContext } from "@utils/ErrorHandler/error";
import LoadingIndicator from '@utils/LoadingIndicator/LoadingIndicator';
import { ErrorMessage, getClothes, getComplexity } from "@utils/queries/cotizador";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React, { useContext } from "react";
import { useIsMutating, useQuery } from "react-query";
import Footer from "../UI/Generic/Footer";
import PageTitle from "../UI/Generic/Utils/PageTitle";
import ErrorAlerter from "../utils/ErrorHandler/ErrorAlerter";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCategoryDialog from '@UI/orden/DeleteCategoryDialog';

const Home: NextPage = () => {

    const { addError } = useContext(ErrorHandlerContext)
    const [confirmNewClothingOpen, setConfirmNewClothingOpen] = React.useState(false)
    const [confirmEditPricesOpen, setConfirmEditPricesOpen] = React.useState(false)
    const [confirmDeleteClothingOpen, setConfirmDeleteClothingOpen] = React.useState(false)
    const [value, setValue] = React.useState(0);

    const isMutating = !!useIsMutating()

    function a11yProps(index: number) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { data: clothesData, isFetching: isFetchingClothesData } = useQuery<TipoPrenda[], ErrorMessage>(['clothes'], getClothes, {
        refetchOnWindowFocus: false,
        initialData: [],
        onError: (error) => addError(error.error)
    });

    const { data: complexityData, isFetching: isFetchingComplexityData } = useQuery<ComplejidadConfeccion[], ErrorMessage>(['complexities'], getComplexity, {
        refetchOnWindowFocus: false,
        initialData: [],
        onError: (error) => addError(error.error)
    });

    const handleOpenNewCategoryDialog = () => {
        setConfirmNewClothingOpen(true)
    }

    const handleCloseNewCategoryConfirmDialog = () => {
        setConfirmNewClothingOpen(false)
    }

    const handleEditCategoryDialog = () => {
        setConfirmEditPricesOpen(true)
    }

    const handleCloseEditCategoryDialog = () => {
        setConfirmEditPricesOpen(false)
    }

    const handleDeleteCategoryDialog = () => {
        setConfirmDeleteClothingOpen(true)
    }

    const handleCloseDeleteCategoryDialog = () => {
        setConfirmDeleteClothingOpen(false)
    }

    const onDeleteConfirm = () => {
        console.log('Deleted !')
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
                            <PageTitle title="Precios base" hasBack />

                            <div className="flex items-center justify-center">
                                <div className="w-8/12 mt-16 bg-zinc-300 ">
                                    <div>
                                        <Tabs
                                            orientation="horizontal"
                                            variant="fullWidth"
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="Vertical tabs example"
                                            sx={{ borderRight: 1, borderColor: 'divider' }}
                                        >
                                            <Tab label="Prendas" {...a11yProps(0)} />
                                            <Tab label="Complejidades" {...a11yProps(1)} />
                                            <Tab label="Precios Base" {...a11yProps(2)} />
                                        </Tabs>
                                    </div>
                                    <div className="bg-zinc-100 m-auto flex justify-center items-center">
                                        <div hidden={value !== 0} className='w-full mb-10'>
                                            <LoadingIndicator show={isFetchingClothesData || isMutating}>
                                                <AddNewCategoryDialog onClose={handleCloseNewCategoryConfirmDialog} open={confirmNewClothingOpen} />
                                                <EditCategoryDialog onClose={handleCloseEditCategoryDialog} open={confirmEditPricesOpen} idToShow={"cl9d13a9t15665wwaiozxdddm"} />
                                                <DeleteCategoryDialog onClose={handleCloseDeleteCategoryDialog} open={confirmDeleteClothingOpen} onDeleteConfirm={onDeleteConfirm} idToDelete={'asd'} />
                                                <div className="flex justify-center items-center text-4xl font-bold mt-5">
                                                    Prendas actuales
                                                </div>
                                                <div className="mt-6">
                                                    {clothesData?.map((clothe) => (
                                                        <div key={clothe.id} className="text-2xl flex flex-row items-center justify-center">
                                                            <div className='w-1/2'>- {clothe.name}</div>
                                                            {/* button to edit clothing prices */}
                                                            <Button ><CreateIcon onClick={handleEditCategoryDialog} /></Button>
                                                            <Button ><DeleteIcon onClick={handleDeleteCategoryDialog} /></Button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-center mt-4">
                                                    <Button variant="outlined" endIcon={<ControlPointIcon />} onClick={handleOpenNewCategoryDialog}>
                                                        Nueva Prenda
                                                    </Button>
                                                </div>
                                            </LoadingIndicator>
                                        </div>

                                        <div hidden={value !== 1} className='w-full mb-10'>
                                            <LoadingIndicator show={isFetchingComplexityData || isMutating}>
                                                <div className="flex justify-center items-center text-4xl font-bold mt-5">
                                                    Complejidades
                                                </div>
                                                <div className="mt-6">
                                                    {complexityData?.map((complexity) => (
                                                        <div key={complexity.id} className="text-2xl flex flex-row items-center justify-center">
                                                            <div className='w-1/2'>- {complexity.name}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </LoadingIndicator>
                                        </div>
                                        <div hidden={value !== 2} className='w-full mb-10'>
                                            Tab 3
                                        </div>

                                    </div>
                                </div>
                            </div>

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
    return { props: { session } };
};
