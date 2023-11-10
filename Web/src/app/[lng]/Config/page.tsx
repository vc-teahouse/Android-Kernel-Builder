import React from "react";

import { Configuration } from "../Components/Configuarion/client";

export default function Page({ params: { lng } }: { params: { lng: string } }) {
  return (
    <Configuration lng={lng}></Configuration>
  );
}
