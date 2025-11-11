"use client"

import axios from "axios"

const getPortfolio = async () => {
  const email = "bhumi.sahayata10@gmail.com";

  try {
    const res = await fetch("/api/v1/user/fetchportfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ e: email }), // match key 'e' used in backend
    });

    if (!res.ok) {
      throw new Error("Failed to fetch portfolio");
    }

    const data = await res.json();
    console.log("Portfolio data:", data);
  } catch (error) {
    console.error(error);
  }
};

getPortfolio();


export default function page(){
    return <>
    <h1>Hello</h1>
    </>
}