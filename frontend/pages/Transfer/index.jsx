import React from 'react';
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput"
import MKTypography from "components/MKTypography";
import MKProgress from "components/MKProgress";
import BaseLayout from "layouts/sections/components/BaseLayout";

import PropTypes from 'prop-types';
import './style.css';
import bgVideo from "assets/video/top-block-bg_1.mp4";
import moment from 'moment';
import { Route, Routes, useParams } from 'react-router-dom';
import { useBalance, useWallet, useConnect, useCanister } from "@connect2ic/react";
import { Principal } from '@dfinity/principal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useAlert } from 'react-alert';

function Transfer() {
    const [dip721, { canisterDefinition }] = useCanister("dip721", { mode: 'anonymous' })
    const [dip20, { loading20, error20 }] = useCanister("dip20", { mode: 'anonymous' })
    const { principal } = useConnect()
    const [value, setValue] = React.useState(0);
    const [product, setProduct] = React.useState(undefined);
    const [listMyNft, setListMyNft] = React.useState(undefined);
    const [wallet] = useWallet()
    const [nft,setNft] = React.useState(undefined);
    const [inputWalletClient, setInputWalletClient] = React.useState('');
    const [inputWalletUser, setInputWalletUser] = React.useState('');
    const params = useParams();
    const stateMarket = canisterDefinition.canisterId;
    const alert = useAlert()
    console.log('stateMarket', stateMarket)
    // handle Bid
    const handleChangeInputWalletClient = event => {
        setInputWalletClient(event.target.value);

        console.log('value setInputWalletClient is:', event.target.value);
    };
    const handleChangeWalletUser = event => {
        setInputWalletUser(event.target.value);

        console.log('value setInputWalletUser is:', event.target.value);
    };

    const videoTag = {
        objectFit: "cover",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: '0',
        left: "0",
        zIndex: "-1"
    };

    const getMyToken = async () => {

        try {
            console.log('principal',principal)        

            const res = await dip721.getMyNfts(Principal.fromText(principal))
            setListMyNft(res);
            setInputWalletUser(principal)
            console.log('res',res)        
        }
        catch (e) {
            console.log('error', e)
        }
    }

    const handleTransfer = async () => {
        try {
            const res = await dip721.transfer(Principal.fromText(principal),nft, Principal.fromText(inputWalletUser))
        }
        catch(e) {
            console.log('error', e)
        }
    }


    React.useEffect(() => {
        if(principal) {
            getMyToken()
        }
        else {
            alert.error('Connect wallet please!')
        }
    }, [principal]);
    return (
        <BaseLayout
            breadcrumb={[
                { label: "Home", route: "/presentation" },
                { label: "Transfer" },
            ]}
            title=""
        >
            <video style={videoTag} autoPlay loop muted>
                <source src={bgVideo} type='video/mp4' />
            </video>
            <MKBox pt={5} pb={6} minHeight="75vh"
                width="100%"
                py={3}
                sx={{
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    display: "grid",
                    placeItems: "center",
                    justifyContent: "center",

                }}>
                <Container style={{ "backgroundColor": "#ffffffd9", "boxShadow": "0rem 0.625rem 0.9375rem -0.1875rem rgb(0 0 0 / 10%), 0rem 0.25rem 0.375rem -0.125rem rgb(0 0 0 / 5%)", "padding": "20px" }}>
                    <Grid container textAlign={'center'}>
                        <Box sx={{
                            minWidth: 420,
                            backgroundSize: "cover",
                            backgroundPosition: "top",
                            display: "grid",
                            placeItems: "center",
                        }}>
                            <MKTypography>Transfer</MKTypography>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Your Collections
                                </InputLabel>
                                <NativeSelect
                                    onChange={setNft}
                                >

                                  {listMyNft.map((e, index) => <option value={e.id.toString}>{e.name}</option>)}
                                </NativeSelect>
                                <br></br>
                                <MKInput label="Your wallet" value={inputWalletUser} onChange={handleChangeWalletUser} fullWidth></MKInput>
                                <br></br>

                                <MKInput label="Wallet recevie" value={inputWalletClient} onChange={handleChangeInputWalletClient} fullWidth></MKInput>
                                <br></br>                                <br></br>
                                <MKButton variant="gradient" color="info" size="large" onClick={handleTransfer}>Transfer </MKButton>
                            </FormControl>
                        </Box>
                    </Grid>
                </Container>
            </MKBox>
        </BaseLayout>
    );
}

export default Transfer;
