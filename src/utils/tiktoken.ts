import wasm from "@dqbd/tiktoken/lite/tiktoken_bg.wasm?module";
import model from "@dqbd/tiktoken/encoders/cl100k_base.json" assert { type: 'json' }
import { init, Tiktoken } from "@dqbd/tiktoken/lite/init";

let encoder: Tiktoken;
/* 
	* This is webassembly wrapper for tiktoken to count tokens in the message.
*/
export default async function getTokensCount(text: string) {
	if(!encoder) {
		await init((imports) => WebAssembly.instantiate(wasm, imports));
		encoder = new Tiktoken(
			model.bpe_ranks,
			model.special_tokens,
			model.pat_str,
		)
	}
	return encoder.encode(text).length
}