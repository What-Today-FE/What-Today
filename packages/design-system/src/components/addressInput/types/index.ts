export interface DaumPostcodeData {
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
  bname: string;
  buildingName: string;
  apartment: 'Y' | 'N';
}

export interface AddressInputProps {
  onChange?: (value: string) => void;
  value?: string;
}
