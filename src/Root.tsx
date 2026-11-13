import React from "react";
import { Composition } from "remotion";
import { ColdEarth } from "./ColdEarth";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ColdEarth"
    component={ColdEarth}
    durationInFrames={2040}
    fps={30}
    width={1080}
    height={1920}
  />
);
