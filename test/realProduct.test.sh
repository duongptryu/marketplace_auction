#!/usr/local/bin/ic-repl
load "../env.sh";

identity account1 "../config/account1.pem";
"Daction real NFT";
"- Should create product correctly";
let resp = call marketplaceCanister.AddOrder(
    account1,
    "REAL_PRODUCT",
    "Day la real product 1",
    1,
    "description 1",
    1000,
    20000,
    dip20Canister,
    60000000000,
    "Nhieu link anh",
    "https://picsum.photos/600/400"
);
resp;
assert resp != variant { Err };

identity account2 "../config/account2.pem";
"- Should create product correctly 2";
let resp = call marketplaceCanister.AddOrder(
    account2,
    "REAL_PRODUCT",
    "Day la real product 2",
    1,
    "description 2",
    1000,
    20000,
    dip20Canister,
    60000000000,
    "Nhieu link anh",
    "https://picsum.photos/600/400",
);
resp;
assert resp != variant { Err };

"- Should create product correctly 2";
marketplaceCanister;
let resp = call marketplaceCanister.AddOrder(
    account2,
    "REAL_PRODUCT",
    "Day la real product 3",
    1,
    "description 3",
    1000,
    20000,
    dip20Canister,
    60000000000,
    "Nhieu link anh",
    "https://picsum.photos/600/400"
);
resp;
assert resp != variant { Err };


"Voting";
" - Should voting correctly 1";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.VoteAuctionPending(account2, record {auctionPendingId=1; "Up"});
resp;

" - Should voting correctly 2";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.VoteAuctionPending(account2, record {auctionPendingId=2; "Up"});
resp;

" - Should voting correctly 3";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.VoteAuctionPending(account2, record {auctionPendingId=3; "Down"});
resp;


"- Approve auction pending";
identity account3 "../config/account3.pem";
let resp = call marketplaceCanister.ApproveAuctionPending(account3, 1);
resp;

let resp = call marketplaceCanister.ApproveAuctionPending(account3, 2);
resp;

let resp = call marketplaceCanister.ApproveAuctionPending(account3, 3);
resp;

