export interface QrInputProps {
  /** Called with the QR payload when the user presses Generate. */
  onGenerate: (content: string) => void;
}
