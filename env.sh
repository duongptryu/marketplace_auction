let _ = "Mint DAU token 1000000";
let account1 = principal "u4f2v-igzyj-kgr2d-ipjf5-dnkz6-sl6mm-gxues-usbeb-2bthn-pfjdq-kae";
let account2 = principal "g27n3-ynszd-oh3rr-p3xnx-vuhl4-nufyt-xlbbw-x4fsg-5pbiv-jwbkk-7qe";
let account3 = principal "psgm7-igfya-7g2cx-t5jgr-uxozt-fm7n6-xhepm-tvmw7-y4hpe-iq5o4-7qe";
let assetCanister = principal "qjdve-lqaaa-aaaaa-aaaeq-cai";
let assetSc = record { canister_id = principal "qjdve-lqaaa-aaaaa-aaaeq-cai" };
let assetStore = record { canister_id = principal "qaa6y-5yaaa-aaaaa-aaafa-cai" };
let assetStoreCanister = principal "qaa6y-5yaaa-aaaaa-aaafa-cai";
let dip20 = record { canister_id = principal "renrk-eyaaa-aaaaa-aaada-cai" };
let dip20Canister = principal "renrk-eyaaa-aaaaa-aaada-cai";
let dip721Canister = principal "rdmx6-jaaaa-aaaaa-aaadq-cai";
let ic = principal "aaaaa-aa";
let marketplace = record { canister_id = principal "qhbym-qaaaa-aaaaa-aaafq-cai" };
let marketplaceCanister = principal "qhbym-qaaaa-aaaaa-aaafq-cai";
let nftSc = record { canister_id = principal "rdmx6-jaaaa-aaaaa-aaadq-cai" };
let resp = variant { Ok = 5 : nat };
let stakingCanister = principal "qoctq-giaaa-aaaaa-aaaea-cai";
let stakingSc = record { canister_id = principal "qoctq-giaaa-aaaaa-aaaea-cai" };
