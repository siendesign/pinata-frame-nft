"use client";

import { useEffect } from "react";
import { PinataFDK } from "pinata-fdk";

export default function FrameMetadata({ params }: { params: any }) {
  useEffect(() => {
    const fdk = new PinataFDK({
      pinata_jwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
      pinata_gateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY!
    });

    const metadata = fdk.getFrameMetadata(params);
    const parser = new DOMParser();
    const doc = parser.parseFromString(metadata, "text/html");
    const metaElements = doc.head.querySelectorAll("meta");

    // Add all metadata elements to document head
    const addedElements: HTMLMetaElement[] = [];
    metaElements.forEach(meta => {
      const newMeta = document.createElement("meta");
      const attributeName = meta.getAttribute("name") ? "name" : "property";
      newMeta.setAttribute(attributeName, meta.getAttribute(attributeName) || "");
      newMeta.content = meta.getAttribute("content") || "";
      document.head.appendChild(newMeta);
      addedElements.push(newMeta);
    });

    // Cleanup function to remove meta tags on unmount
    return () => {
      addedElements.forEach(element => {
        document.head.removeChild(element);
      });
    };
  }, [params]);

  return null;
}