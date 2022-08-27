let _ = "Mint DAU token 1000000";
let account1 = principal "u4f2v-igzyj-kgr2d-ipjf5-dnkz6-sl6mm-gxues-usbeb-2bthn-pfjdq-kae";
let account2 = principal "g27n3-ynszd-oh3rr-p3xnx-vuhl4-nufyt-xlbbw-x4fsg-5pbiv-jwbkk-7qe";
let account3 = principal "psgm7-igfya-7g2cx-t5jgr-uxozt-fm7n6-xhepm-tvmw7-y4hpe-iq5o4-7qe";
let assetCanister = principal "tlwi3-3aaaa-aaaaa-aaapq-cai";
let assetSc = record { canister_id = principal "tlwi3-3aaaa-aaaaa-aaapq-cai" };
let assetStore = record { canister_id = principal "wxns6-qiaaa-aaaaa-aaaqa-cai" };
let assetStoreCanister = principal "wxns6-qiaaa-aaaaa-aaaqa-cai";
let dip20 = record { canister_id = principal "tcvdh-niaaa-aaaaa-aaaoa-cai" };
let dip20Canister = principal "tcvdh-niaaa-aaaaa-aaaoa-cai";
let dip721Canister = principal "tfuft-aqaaa-aaaaa-aaaoq-cai";
let ic = principal "aaaaa-aa";
let marketplace = record { canister_id = principal "wqmuk-5qaaa-aaaaa-aaaqq-cai" };
let marketplaceCanister = principal "wqmuk-5qaaa-aaaaa-aaaqq-cai";
let nftSc = record { canister_id = principal "tfuft-aqaaa-aaaaa-aaaoq-cai" };
let resp = variant { Ok = 5 : nat };
let stakingCanister = principal "tmxop-wyaaa-aaaaa-aaapa-cai";
let stakingSc = record { canister_id = principal "tmxop-wyaaa-aaaaa-aaapa-cai" };
