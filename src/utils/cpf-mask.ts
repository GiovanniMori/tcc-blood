export function MaskCPF(cpf: any) {
  if (typeof cpf !== "string") return "";
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function handleCPFChange(event: React.ChangeEvent<HTMLInputElement>) {
  const input = event.target;
  const maskedCPF = MaskCPF(input.value);
  input.value = maskedCPF;
}
