import { cpf } from 'cpf-cnpj-validator';

export const validateCpf = (cpfToValidate: string): boolean => {
  return cpf.isValid(cpfToValidate); 
};
