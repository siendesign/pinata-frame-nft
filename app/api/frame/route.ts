import { NextRequest, NextResponse } from "next/server"
import { getConnectedAddressForUser } from "@/utils/fc";
import { mintNft, balanceOf } from "@/utils/mint";

import { PinataFDK } from "pinata-fdk";
// const fdk = new PinataFDK({
//   pinata_jwt: process.env.PINATA_JWT as string,
//   pinata_gateway: process.env.GATEWAY_URL as string,
// });

const fdk = new PinataFDK({
    pinata_jwt: process.env.PINATA_JWT!,
    pinata_gateway: process.env.PINATA_GATEWAY!
  });

export async function GET(req: NextRequest) {
  try {
    const frameMetadata = await fdk.getFrameMetadata({
      post_url: `${process.env.BASE_URL}/frame`,
      buttons: [{ label: "Mint NFT", action: "post" }],
      aspect_ratio: "1:1",
      cid: "QmSr4zReFsPHSyB9Jn6Q2UcaQHRqd4wXeznTMsdYNgmHBc",
    });
    return new NextResponse(frameMetadata);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("body:", body);

  const fid = body.untrustedData.fid;
  const address = await getConnectedAddressForUser(fid);

  console.log("address",address);

  const balance = await balanceOf(address);
  console.log(balance);
  if (typeof balance === "number" && balance !== null && balance < 1) {
    try {
    //   const mint = await mintNft("0x620E56fe54a8E13153E4Be7Bfa590b17bb48DfA8");
      const mint = await mintNft(address);
      console.log(mint);
      const frameMetadata = await fdk.getFrameMetadata({
        post_url: `${process.env.BASE_URL}/redirect`,
        buttons: [{ label: "Learn How to Make This", action: "post_redirect" }],
        aspect_ratio: "1:1",
        cid: "QmSr4zReFsPHSyB9Jn6Q2UcaQHRqd4wXeznTMsdYNgmHBc",
      });
      return new NextResponse(frameMetadata);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } else {
    const frameMetadata = await fdk.getFrameMetadata({
      post_url: `${process.env.BASE_URL}/redirect`,
      buttons: [{ label: "Learn How to Make This", action: "post_redirect" }],
      aspect_ratio: "1:1",
      cid: "QmSr4zReFsPHSyB9Jn6Q2UcaQHRqd4wXeznTMsdYNgmHBc",
    });
    return new NextResponse(frameMetadata);
  }
}