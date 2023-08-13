import { xdr } from 'soroban-client';
import { Buffer } from "buffer";
import { scValStrToJs, scValToJs, addressToScVal, i128ToScVal, strToScVal } from './convert.js';
import { invoke } from './invoke.js';
import { invoke_bundle } from './invoke.js';
export * from './constants.js';
export * from './server.js';
export * from './invoke.js';
;
;
export class Ok {
    value;
    constructor(value) {
        this.value = value;
    }
    unwrapErr() {
        throw new Error('No error');
    }
    unwrap() {
        return this.value;
    }
    isOk() {
        return true;
    }
    isErr() {
        return !this.isOk();
    }
}
export class Err {
    error;
    constructor(error) {
        this.error = error;
    }
    unwrapErr() {
        return this.error;
    }
    unwrap() {
        throw new Error(this.error.message);
    }
    isOk() {
        return false;
    }
    isErr() {
        return !this.isOk();
    }
}
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
const regex = /ContractError\((\d+)\)/;
function getError(err) {
    const match = err.match(regex);
    if (!match) {
        return undefined;
    }
    if (Errors == undefined) {
        return undefined;
    }
    // @ts-ignore
    let i = parseInt(match[1], 10);
    if (i < Errors.length) {
        return new Err(Errors[i]);
    }
    return undefined;
}
export async function init({ factory, controller }, options = {}) {
    return await invoke({
        method: 'init',
        args: [((i) => addressToScVal(i))(factory),
            ((i) => addressToScVal(i))(controller)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function bundleBind({ token, balance, denorm }, options = {}) {
    
    
    return await invoke_bundle({
        method: 'bundle_bind',
        args: [((i) => xdr.ScVal.scvVec(i.map((i) => addressToScVal(i))))(token),
            ((i) => xdr.ScVal.scvVec(i.map((i) => i128ToScVal(i))))(balance),
            ((i) => xdr.ScVal.scvVec(i.map((i) => i128ToScVal(i))))(denorm)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function bind({ token, balance, denorm, admin }, options = {}) {
    return await invoke_bundle({
        method: 'bind',
        args: [((i) => addressToScVal(i))(token),
            ((i) => i128ToScVal(i))(balance),
            ((i) => i128ToScVal(i))(denorm),
            ((i) => addressToScVal(i))(admin)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function rebind({ token, balance, denorm, admin }, options = {}) {
    return await invoke({
        method: 'rebind',
        args: [((i) => addressToScVal(i))(token),
            ((i) => i128ToScVal(i))(balance),
            ((i) => i128ToScVal(i))(denorm),
            ((i) => addressToScVal(i))(admin)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function unbind({ token, user }, options = {}) {
    return await invoke({
        method: 'unbind',
        args: [((i) => addressToScVal(i))(token),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function finalize(options = {}) {

    console.log("Options", options);
    return await invoke_bundle({
        method: 'finalize',
        ...options,
        parseResultXdr: () => { },
    });
}
export async function gulp({ t }, options = {}) {
    return await invoke({
        method: 'gulp',
        args: [((i) => addressToScVal(i))(t)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function joinPool({ pool_amount_out, max_amounts_in, user }, options = {}) {
    return await invoke_bundle({
        method: 'join_pool',
        args: [((i) => i128ToScVal(i))(pool_amount_out),
            ((i) => xdr.ScVal.scvVec(i.map((i) => i128ToScVal(i))))(max_amounts_in),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function exitPool({ pool_amount_in, min_amounts_out, user }, options = {}) {
    return await invoke({
        method: 'exit_pool',
        args: [((i) => i128ToScVal(i))(pool_amount_in),
            ((i) => xdr.ScVal.scvVec(i.map((i) => i128ToScVal(i))))(min_amounts_out),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function swapExactAmountIn({ token_in, token_amount_in, token_out, min_amount_out, max_price, user }, options = {}) {
    return await invoke_bundle({
        method: 'swap_exact_amount_in',
        args: [((i) => addressToScVal(i))(token_in),
            ((i) => i128ToScVal(i))(token_amount_in),
            ((i) => addressToScVal(i))(token_out),
            ((i) => i128ToScVal(i))(min_amount_out),
            ((i) => i128ToScVal(i))(max_price),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function swapExactAmountOut({ token_in, max_amount_in, token_out, token_amount_out, max_price, user }, options = {}) {
    return await invoke({
        method: 'swap_exact_amount_out',
        args: [((i) => addressToScVal(i))(token_in),
            ((i) => i128ToScVal(i))(max_amount_in),
            ((i) => addressToScVal(i))(token_out),
            ((i) => i128ToScVal(i))(token_amount_out),
            ((i) => i128ToScVal(i))(max_price),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function depToknAmtInGetLpToknsOut({ token_in, token_amount_in, min_pool_amount_out, user }, options = {}) {
    console.log("Options", options);
    return await invoke_bundle({
        method: 'dep_tokn_amt_in_get_lp_tokns_out',
        args: [((i) => addressToScVal(i))(token_in),
            ((i) => i128ToScVal(i))(token_amount_in),
            ((i) => i128ToScVal(i))(min_pool_amount_out),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function depLpToknAmtOutGetToknIn({ token_in, pool_amount_out, max_amount_in, user }, options = {}) {
    return await invoke({
        method: 'dep_lp_tokn_amt_out_get_tokn_in',
        args: [((i) => addressToScVal(i))(token_in),
            ((i) => i128ToScVal(i))(pool_amount_out),
            ((i) => i128ToScVal(i))(max_amount_in),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function wdrToknAmtInGetLpToknsOut({ token_out, pool_amount_in, min_amount_out, user }, options = {}) {
    return await invoke({
        method: 'wdr_tokn_amt_in_get_lp_tokns_out',
        args: [((i) => addressToScVal(i))(token_out),
            ((i) => i128ToScVal(i))(pool_amount_in),
            ((i) => i128ToScVal(i))(min_amount_out),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function wdrToknAmtOutGetLpToknsIn({ token_out, token_amount_out, max_pool_amount_in, user }, options = {}) {
    return await invoke({
        method: 'wdr_tokn_amt_out_get_lp_tokns_in',
        args: [((i) => addressToScVal(i))(token_out),
            ((i) => i128ToScVal(i))(token_amount_out),
            ((i) => i128ToScVal(i))(max_pool_amount_in),
            ((i) => addressToScVal(i))(user)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function setSwapFee({ fee, caller }, options = {}) {
    return await invoke({
        method: 'set_swap_fee',
        args: [((i) => i128ToScVal(i))(fee),
            ((i) => addressToScVal(i))(caller)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function setController({ caller, manager }, options = {}) {
    return await invoke({
        method: 'set_controller',
        args: [((i) => addressToScVal(i))(caller),
            ((i) => addressToScVal(i))(manager)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function setPublicSwap({ caller, val }, options = {}) {
    return await invoke({
        method: 'set_public_swap',
        args: [((i) => addressToScVal(i))(caller),
            ((i) => xdr.ScVal.scvBool(i))(val)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function setFreezeStatus({ caller, val }, options = {}) {
    return await invoke({
        method: 'set_freeze_status',
        args: [((i) => addressToScVal(i))(caller),
            ((i) => xdr.ScVal.scvBool(i))(val)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function getTotalSupply(options = {}) {
    return await invoke({
        method: 'get_total_supply',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getController(options = {}) {
    return await invoke({
        method: 'get_controller',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getTotalDenormalizedWeight(options = {}) {
    return await invoke({
        method: 'get_total_denormalized_weight',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getNumTokens(options = {}) {
    return await invoke({
        method: 'get_num_tokens',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getCurrentTokens(options = {}) {
    return await invoke({
        method: 'get_current_tokens',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getFinalTokens(options = {}) {
    return await invoke({
        method: 'get_final_tokens',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getBalance({ token }, options = {}) {
    return await invoke({
        method: 'get_balance',
        args: [((i) => addressToScVal(i))(token)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getDenormalizedWeight({ token }, options = {}) {
    return await invoke({
        method: 'get_denormalized_weight',
        args: [((i) => addressToScVal(i))(token)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getNormalizedWeight({ token }, options = {}) {
    return await invoke({
        method: 'get_normalized_weight',
        args: [((i) => addressToScVal(i))(token)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getSpotPrice({ token_in, token_out }, options = {}) {
    return await invoke({
        method: 'get_spot_price',
        args: [((i) => addressToScVal(i))(token_in),
            ((i) => addressToScVal(i))(token_out)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getSwapFee(options = {}) {
    return await invoke({
        method: 'get_swap_fee',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function getSpotPriceSansFee({ token_in, token_out }, options = {}) {
    return await invoke({
        method: 'get_spot_price_sans_fee',
        args: [((i) => addressToScVal(i))(token_in),
            ((i) => addressToScVal(i))(token_out)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function shareId(options = {}) {
    return await invoke({
        method: 'share_id',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function isPublicSwap(options = {}) {
    return await invoke({
        method: 'is_public_swap',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function isFinalized(options = {}) {
    return await invoke({
        method: 'is_finalized',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function isBound({ t }, options = {}) {
    return await invoke({
        method: 'is_bound',
        args: [((i) => addressToScVal(i))(t)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function initialize({ admin, decimal, name, symbol }, options = {}) {
    return await invoke({
        method: 'initialize',
        args: [((i) => addressToScVal(i))(admin),
            ((i) => xdr.ScVal.scvU32(i))(decimal),
            ((i) => xdr.ScVal.scvBytes(i))(name),
            ((i) => xdr.ScVal.scvBytes(i))(symbol)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function allowance({ from, spender }, options = {}) {
    return await invoke({
        method: 'allowance',
        args: [((i) => addressToScVal(i))(from),
            ((i) => addressToScVal(i))(spender)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function incrAllow({ from, spender, amount }, options = {}) {
    return await invoke({
        method: 'incr_allow',
        args: [((i) => addressToScVal(i))(from),
            ((i) => addressToScVal(i))(spender),
            ((i) => i128ToScVal(i))(amount)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function decrAllow({ from, spender, amount }, options = {}) {
    return await invoke({
        method: 'decr_allow',
        args: [((i) => addressToScVal(i))(from),
            ((i) => addressToScVal(i))(spender),
            ((i) => i128ToScVal(i))(amount)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function balance({ id }, options = {}) {
    return await invoke({
        method: 'balance',
        args: [((i) => addressToScVal(i))(id)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function spendable({ id }, options = {}) {
    return await invoke({
        method: 'spendable',
        args: [((i) => addressToScVal(i))(id)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function authorized({ id }, options = {}) {
    return await invoke({
        method: 'authorized',
        args: [((i) => addressToScVal(i))(id)],
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function xfer({ from, to, amount }, options = {}) {
    return await invoke({
        method: 'xfer',
        args: [((i) => addressToScVal(i))(from),
            ((i) => addressToScVal(i))(to),
            ((i) => i128ToScVal(i))(amount)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function xferFrom({ spender, from, to, amount }, options = {}) {
    return await invoke({
        method: 'xfer_from',
        args: [((i) => addressToScVal(i))(spender),
            ((i) => addressToScVal(i))(from),
            ((i) => addressToScVal(i))(to),
            ((i) => i128ToScVal(i))(amount)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function burn({ from, amount }, options = {}) {
    return await invoke({
        method: 'burn',
        args: [((i) => addressToScVal(i))(from),
            ((i) => i128ToScVal(i))(amount)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function burnFrom({ spender, from, amount }, options = {}) {
    return await invoke({
        method: 'burn_from',
        args: [((i) => addressToScVal(i))(spender),
            ((i) => addressToScVal(i))(from),
            ((i) => i128ToScVal(i))(amount)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function clawback({ admin, from, amount }, options = {}) {
    return await invoke({
        method: 'clawback',
        args: [((i) => addressToScVal(i))(admin),
            ((i) => addressToScVal(i))(from),
            ((i) => i128ToScVal(i))(amount)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function setAuth({ admin, id, authorize }, options = {}) {
    return await invoke({
        method: 'set_auth',
        args: [((i) => addressToScVal(i))(admin),
            ((i) => addressToScVal(i))(id),
            ((i) => xdr.ScVal.scvBool(i))(authorize)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function mint({ admin, to, amount }, options = {}) {
    return await invoke({
        method: 'mint',
        args: [((i) => addressToScVal(i))(admin),
            ((i) => addressToScVal(i))(to),
            ((i) => i128ToScVal(i))(amount)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function setAdmin({ admin, new_admin }, options = {}) {
    return await invoke({
        method: 'set_admin',
        args: [((i) => addressToScVal(i))(admin),
            ((i) => addressToScVal(i))(new_admin)],
        ...options,
        parseResultXdr: () => { },
    });
}
export async function decimals(options = {}) {
    return await invoke({
        method: 'decimals',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function name(options = {}) {
    return await invoke({
        method: 'name',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
export async function symbol(options = {}) {
    return await invoke({
        method: 'symbol',
        ...options,
        parseResultXdr: (xdr) => {
            return scValStrToJs(xdr);
        },
    });
}
function SwapEventToXdr(swapEvent) {
    if (!swapEvent) {
        return xdr.ScVal.scvVoid();
    }
    let arr = [
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("caller"), val: ((i) => addressToScVal(i))(swapEvent["caller"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("token_amount_in"), val: ((i) => i128ToScVal(i))(swapEvent["token_amount_in"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("token_amount_out"), val: ((i) => i128ToScVal(i))(swapEvent["token_amount_out"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("token_in"), val: ((i) => addressToScVal(i))(swapEvent["token_in"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("token_out"), val: ((i) => addressToScVal(i))(swapEvent["token_out"]) })
    ];
    return xdr.ScVal.scvMap(arr);
}
function SwapEventFromXdr(base64Xdr) {
    let scVal = strToScVal(base64Xdr);
    let obj = scVal.map().map(e => [e.key().str(), e.val()]);
    let map = new Map(obj);
    if (!obj) {
        throw new Error('Invalid XDR');
    }
    return {
        caller: scValToJs(map.get("caller")),
        token_amount_in: scValToJs(map.get("token_amount_in")),
        token_amount_out: scValToJs(map.get("token_amount_out")),
        token_in: scValToJs(map.get("token_in")),
        token_out: scValToJs(map.get("token_out"))
    };
}
function JoinEventToXdr(joinEvent) {
    if (!joinEvent) {
        return xdr.ScVal.scvVoid();
    }
    let arr = [
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("caller"), val: ((i) => addressToScVal(i))(joinEvent["caller"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("token_amount_in"), val: ((i) => i128ToScVal(i))(joinEvent["token_amount_in"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("token_in"), val: ((i) => addressToScVal(i))(joinEvent["token_in"]) })
    ];
    return xdr.ScVal.scvMap(arr);
}
function JoinEventFromXdr(base64Xdr) {
    let scVal = strToScVal(base64Xdr);
    let obj = scVal.map().map(e => [e.key().str(), e.val()]);
    let map = new Map(obj);
    if (!obj) {
        throw new Error('Invalid XDR');
    }
    return {
        caller: scValToJs(map.get("caller")),
        token_amount_in: scValToJs(map.get("token_amount_in")),
        token_in: scValToJs(map.get("token_in"))
    };
}
function ExitEventToXdr(exitEvent) {
    if (!exitEvent) {
        return xdr.ScVal.scvVoid();
    }
    let arr = [
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("caller"), val: ((i) => addressToScVal(i))(exitEvent["caller"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("token_amount_out"), val: ((i) => i128ToScVal(i))(exitEvent["token_amount_out"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("token_out"), val: ((i) => addressToScVal(i))(exitEvent["token_out"]) })
    ];
    return xdr.ScVal.scvMap(arr);
}
function ExitEventFromXdr(base64Xdr) {
    let scVal = strToScVal(base64Xdr);
    let obj = scVal.map().map(e => [e.key().str(), e.val()]);
    let map = new Map(obj);
    if (!obj) {
        throw new Error('Invalid XDR');
    }
    return {
        caller: scValToJs(map.get("caller")),
        token_amount_out: scValToJs(map.get("token_amount_out")),
        token_out: scValToJs(map.get("token_out"))
    };
}
function RecordToXdr(record) {
    if (!record) {
        return xdr.ScVal.scvVoid();
    }
    let arr = [
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("balance"), val: ((i) => i128ToScVal(i))(record["balance"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("bound"), val: ((i) => xdr.ScVal.scvBool(i))(record["bound"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("denorm"), val: ((i) => i128ToScVal(i))(record["denorm"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("index"), val: ((i) => xdr.ScVal.scvU32(i))(record["index"]) })
    ];
    return xdr.ScVal.scvMap(arr);
}
function RecordFromXdr(base64Xdr) {
    let scVal = strToScVal(base64Xdr);
    let obj = scVal.map().map(e => [e.key().str(), e.val()]);
    let map = new Map(obj);
    if (!obj) {
        throw new Error('Invalid XDR');
    }
    return {
        balance: scValToJs(map.get("balance")),
        bound: scValToJs(map.get("bound")),
        denorm: scValToJs(map.get("denorm")),
        index: scValToJs(map.get("index"))
    };
}
function DataKeyToXdr(dataKey) {
    if (!dataKey) {
        return xdr.ScVal.scvVoid();
    }
    let res = [];
    switch (dataKey.tag) {
        case "Factory":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Factory"));
            break;
        case "Controller":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Controller"));
            break;
        case "SwapFee":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("SwapFee"));
            break;
        case "TotalWeight":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("TotalWeight"));
            break;
        case "AllTokenVec":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("AllTokenVec"));
            break;
        case "AllRecordData":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("AllRecordData"));
            break;
        case "TokenShare":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("TokenShare"));
            break;
        case "TotalShares":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("TotalShares"));
            break;
        case "PublicSwap":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("PublicSwap"));
            break;
        case "Finalize":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Finalize"));
            break;
        case "Freeze":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Freeze"));
            break;
    }
    return xdr.ScVal.scvVec(res);
}
function DataKeyFromXdr(base64Xdr) {
    let [tag, values] = strToScVal(base64Xdr).vec().map(scValToJs);
    if (!tag) {
        throw new Error('Missing enum tag when decoding DataKey from XDR');
    }
    return { tag, values };
}
function DataKeyTokenToXdr(dataKeyToken) {
    if (!dataKeyToken) {
        return xdr.ScVal.scvVoid();
    }
    let res = [];
    switch (dataKeyToken.tag) {
        case "Allowance":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Allowance"));
            res.push(((i) => AllowanceDataKeyToXdr(i))(dataKeyToken.values[0]));
            break;
        case "Balance":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Balance"));
            res.push(((i) => addressToScVal(i))(dataKeyToken.values[0]));
            break;
        case "Nonce":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Nonce"));
            res.push(((i) => addressToScVal(i))(dataKeyToken.values[0]));
            break;
        case "State":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("State"));
            res.push(((i) => addressToScVal(i))(dataKeyToken.values[0]));
            break;
        case "Admin":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Admin"));
            break;
        case "Decimals":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Decimals"));
            break;
        case "Name":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Name"));
            break;
        case "Symbol":
            res.push(((i) => xdr.ScVal.scvSymbol(i))("Symbol"));
            break;
    }
    return xdr.ScVal.scvVec(res);
}
function DataKeyTokenFromXdr(base64Xdr) {
    let [tag, values] = strToScVal(base64Xdr).vec().map(scValToJs);
    if (!tag) {
        throw new Error('Missing enum tag when decoding DataKeyToken from XDR');
    }
    return { tag, values };
}
function AllowanceDataKeyToXdr(allowanceDataKey) {
    if (!allowanceDataKey) {
        return xdr.ScVal.scvVoid();
    }
    let arr = [
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("from"), val: ((i) => addressToScVal(i))(allowanceDataKey["from"]) }),
        new xdr.ScMapEntry({ key: ((i) => xdr.ScVal.scvSymbol(i))("spender"), val: ((i) => addressToScVal(i))(allowanceDataKey["spender"]) })
    ];
    return xdr.ScVal.scvMap(arr);
}
function AllowanceDataKeyFromXdr(base64Xdr) {
    let scVal = strToScVal(base64Xdr);
    let obj = scVal.map().map(e => [e.key().str(), e.val()]);
    let map = new Map(obj);
    if (!obj) {
        throw new Error('Invalid XDR');
    }
    return {
        from: scValToJs(map.get("from")),
        spender: scValToJs(map.get("spender"))
    };
}
const Errors = [
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" },
    { message: "" }
];
