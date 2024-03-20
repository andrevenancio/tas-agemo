import type { NextApiRequest, NextApiResponse } from "next"

import { Step } from "@/types"

const steps: Step[] = [
  {
    uid: 0,
    title: "Remove Images Background",
    description: "Remove the background from the input image",
    color: "#fff9d8",
    steps: [
      {
        uid: 1,
        title: "Preprocessing",
        description: "Perform any necessary preprocessing steps",
        color: "#fff9d8",
      },
      {
        uid: 2,
        title: "Background Segmentation",
        description: "Segment the background from the foreground object",
        color: "#fff9d8",
      },
      {
        uid: 3,
        title: "Refinement",
        description: "Refine the background removal result",
        color: "#fff9d8",
      },
      {
        uid: 4,
        title: "Postprocessing",
        description: "Perform final adjustments or cleanup",
        color: "#fff9d8",
      },
    ],
  },
  {
    uid: 5,
    title: "Generate Mask",
    description:
      "Inpaint the background of the image with a new one based on a given prompt",
    color: "#a2e2a9",
    steps: [
      {
        uid: 6,
        title: "Generate Mask",
        description: "Create a mask based on the input prompt",
        color: "#a2e2a9",
      },
      {
        uid: 7,
        title: "Apply Mask",
        description: "Apply the generated mask to the image",
        color: "#a2e2a9",
      },
      {
        uid: 8,
        title: "Blend Background",
        description: "Blend the new background with the inpainted image",
        color: "#a2e2a9",
      },
    ],
  },
  {
    uid: 9,
    title: "Inpaint Image the App",
    description:
      "Inpaint the background of the image with a new one based on a given prompt",
    color: "#b0ecff",
  },
  {
    uid: 10,
    title: "Prepare workflow outputs",
    description:
      "Inpaint the background of the image with a new one based on a given prompt",
    color: "#d1aaff",
    steps: [
      {
        uid: 11,
        title: "Select Output Format",
        description: "Choose the format for the output image",
        color: "#d1aaff",
      },
      {
        uid: 12,
        title: "Prepare Metadata",
        description: "Include any necessary metadata with the output",
        color: "#d1aaff",
      },
    ],
  },
  {
    uid: 13,
    title: "Save image",
    description: "Saves the new generated image",
    color: "#ffe890",
  },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Step[]>
) {
  res.status(200).json(steps)
}
