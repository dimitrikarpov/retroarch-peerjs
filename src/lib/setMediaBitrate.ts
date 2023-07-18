/*
workaround to set higher stream media quality
https://stackoverflow.com/questions/57653899/how-to-increase-the-bitrate-of-webrtc
*/
export const setMediaBitrate = (sdp: string) => {
  const arr = sdp.split("\r\n")
  arr.forEach((str, i) => {
    if (/^a=fmtp:\d*/.test(str)) {
      arr[i] =
        str +
        ";x-google-max-bitrate=20000;x-google-min-bitrate=0;x-google-start-bitrate=6000"
    } else if (/^a=mid:(1|video)/.test(str)) {
      arr[i] += "\r\nb=AS:20000"
    }
  })

  return arr.join("\r\n")
}
