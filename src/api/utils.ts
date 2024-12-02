export function randoxHex(length: number = 8) {
	const hexCharacters = '0123456789ABCDEF';
	let result = '';
	const charactersLength = hexCharacters.length;
	for (let i = 0; i < length; i++) {
		result += hexCharacters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export function shiftEncrypt(input: string, shiftAmount: number) {
	const chars = input.split('');
	const encryptedChars = chars.map(char => {
		const ascii = char.charCodeAt(0);
		if (ascii == 35) {
			return String.fromCharCode(45);
		}
		const shiftedAscii = ascii + shiftAmount;
		return String.fromCharCode(shiftedAscii);
	});
	const encryptedString = encryptedChars.join('');
	return encryptedString;
}

export function toHex(num: number) {
	const str = num.toString(16);
	const len = str.length;
	if (len % 2 == 1) {
		return '0' + str;
	}
	return str;
}

export function sign(key: string, ts: number) {
	const newTs = ts + (ts % 100);
	const key2 = parseInt(key, 16);
	//document.write("  newTs:" + newTs +"  key2=" + key2);
	const result = Math.abs(key2 ^ newTs);
	//document.write("  result:" + result +"  ");
	return toHex(result);
}
export function getServerTime() {
	const serverTsDifference = 0// sessionStorage.getItem('serverTsDifference');
	const lt = Math.floor(Date.now() / 1000);
	if (serverTsDifference) {
		return lt + Number(serverTsDifference);
	}
	return lt;
}
export function getSolanaRpcHeard(shiftAmount: number = 2) {
	const ts = getServerTime();
	const key = randoxHex();
	const ret = sign(key, ts);

	const a = 'afgjj#icw';
	const b = 'afgjj#rq';
	const c = 'afgjj#qgel';
	const back: any = {};
	back[shiftEncrypt(a, shiftAmount)] = key;
	back[shiftEncrypt(b, shiftAmount)] = ts.toString();
	back[shiftEncrypt(c, shiftAmount)] = ret;

	return back;
}
