let _ = "Mint DAU token 1000000";
let account1 = principal "u4f2v-igzyj-kgr2d-ipjf5-dnkz6-sl6mm-gxues-usbeb-2bthn-pfjdq-kae";
let account2 = principal "g27n3-ynszd-oh3rr-p3xnx-vuhl4-nufyt-xlbbw-x4fsg-5pbiv-jwbkk-7qe";
let account3 = principal "psgm7-igfya-7g2cx-t5jgr-uxozt-fm7n6-xhepm-tvmw7-y4hpe-iq5o4-7qe";

let dip20 = record { canister_id = principal "qsgjb-riaaa-aaaaa-aaaga-cai" };
let dip20Canister = principal "qsgjb-riaaa-aaaaa-aaaga-cai";
let dip721Canister = principal "qvhpv-4qaaa-aaaaa-aaagq-cai";
let ic = principal "aaaaa-aa";
let marketplace = record { canister_id = principal "q3fc5-haaaa-aaaaa-aaahq-cai" };
let marketplaceCanister = principal "q3fc5-haaaa-aaaaa-aaahq-cai";
let nftSc = record { canister_id = principal "qvhpv-4qaaa-aaaaa-aaagq-cai" };
let reserveCanister = principal "q4eej-kyaaa-aaaaa-aaaha-cai";
let reserveSc = record { canister_id = principal "q4eej-kyaaa-aaaaa-aaaha-cai" };
let resp = variant { Ok = 3 : nat };
