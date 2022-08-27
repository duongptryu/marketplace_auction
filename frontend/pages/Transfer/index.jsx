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

function Transfer() {
    const [marketplace_auction, { canisterDefinition }] = useCanister("marketplace_auction", { mode: 'anonymous' })
    const [dip20, { loading20, error20 }] = useCanister("dip20", { mode: 'anonymous' })
    const { principal } = useConnect()
    const [value, setValue] = React.useState(0);
    const [product, setProduct] = React.useState(undefined);
    const [listBids, setlistBids] = React.useState(undefined);
    const [wallet] = useWallet()
    const [assets] = useBalance()
    const [inputNumToken, setInputNumToken] = React.useState('');
    const params = useParams();
    const stateMarket = canisterDefinition.canisterId;
    console.log('stateMarket', stateMarket)
    // handle Bid
    const handleChangeInputBid = event => {
        setInputNumToken(event.target.value);

        console.log('value is:', event.target.value);
    };
    // get the product
    const getProduct = async () => {
        try {
            const datas = await marketplace_auction.GetAuction(parseInt(params.id));
            // lay ngay den date Line
            const a = replaceNumber(datas.Ok.product.startTime) + replaceNumber(datas.Ok.product.auctionTime);
            const strTime = parseInt(datas.Ok.product.startTime) / Math.pow(10, 6)
            const dateLine = moment(a / 1000000);
            datas.Ok.product.dateLine = dateLine.format("DD MMM YYYY hh:mm a");
            const currentTime = moment();
            // datas.Ok.product.startTime = ;
            const curTime = new Date().getTime()
            const durTime = parseInt(datas.Ok.product.auctionTime) / Math.pow(10, 6)
            const r = (curTime - strTime) / durTime

            if (parseInt(dateLine.diff(currentTime, 'seconds')) > 0) {
                datas.Ok.product.processToBid = parseInt(dateLine.diff(currentTime, 'seconds')) + ' seconds';
            } else {
                datas.Ok.product.processToBid = 'Out of time';
            }

            if (dateLine > currentTime) {
                datas.Ok.product.processBar = parseInt(r * 100)
            } else {
                datas.Ok.product.processBar = 100
            }
            setProduct(datas);
            getHistoryBid()
        }
        catch (e) {
            console.log('message error', e)
        }

    };

    const getHistoryBid = async () => {
        const datas = await marketplace_auction.GetBids(parseInt(params.id));
        console.log('datas Bids', datas);
        setlistBids(datas)
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
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

    const handleBid = async () => {

        try {
            const hasAllowed = await window.ic.plug.requestConnect();
            // console.log('-->', typeof (principal))
            if (hasAllowed) {
                console.log('Plug wallet is connected');
            } else {
                console.log('Plug wallet connection was refused')
            }
            const res = await dip20.approve(Principal.fromText(principal), Principal.fromText(stateMarket), BigInt(inputNumToken))
            console.log('mum', res);
            const biding = await marketplace_auction.BidAuction(Principal.fromText(principal), {
                auctionId: 2,
                amount: BigInt(inputNumToken),
            })
            console.log('biding', biding);
            getProduct()
            getHistoryBid()
        }
        catch (e) {
            console.log('error', e)
        }
    }

    const onConnectPlug = async () => {
        try {
            const publicKey = await window.ic.plug.requestConnect();
            console.log(`The connected user's public key is:`, publicKey);

        } catch (e) {
            console.log(e);
        }
    }

    const getAmount = (amountt, unitt) => {
        let amountToken = ' 0';
        amountToken = amountt.filter(e => e.symbol === unitt)
        if (amountToken.length > 0) {
            amountToken = amountToken[0].amount
        } else {
            amountToken = ' 0'
        }
        return amountToken + ' ' + unitt
    }

    const handleClaimToken = async () => {
        console.log('wallet-->', wallet)
        if (!wallet || !principal) {
            await onConnectPlug()
        } else {
            try {
                console.log('-->', typeof (principal), Principal.fromText(principal), BigInt(product.Ok.product.id))

                const res = await marketplace_auction.ClaimNft(Principal.fromText(principal), BigInt(3))
                console.log('res--<>', res)
            }
            catch (e) {
                console.log('err', e)
            }
        }

    }

    React.useEffect(() => {
        getProduct()
        getHistoryBid()
    }, [wallet]);
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
            <MKBox pt={5} pb={6}>
                <Container style={{ "backgroundColor": "#ffffffd9", "boxShadow": "0rem 0.625rem 0.9375rem -0.1875rem rgb(0 0 0 / 10%), 0rem 0.25rem 0.375rem -0.125rem rgb(0 0 0 / 5%)" }}>
                    <Grid container>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Your Collections
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={30}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </Grid>
                </Container>
            </MKBox>
        </BaseLayout>
    );
}

export default Transfer;
