import * as SorobanClient from 'soroban-client'
import { RPC_URL } from './constants.js'

/**
 * SorobanClient.Server instance, initialized using {@link RPC_URL} used to
 * initialize this library.
 */
export const Server = new SorobanClient.Server(RPC_URL, { allowHttp: RPC_URL.startsWith('http://') });
