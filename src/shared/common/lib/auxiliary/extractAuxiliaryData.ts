import { IAuxiliaryData } from "./auxiliaryData";

export default function extractAuxiliaryData({
  features
}: IAuxiliaryData) {
  return {
    features: features || []
  };
}
