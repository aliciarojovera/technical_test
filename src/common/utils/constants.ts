export const statusOptions = [
  { label: "Iniciada", value: "INITIAL_STATUS" },
  { label: "Por confirmar", value: "CONFIRMATION_PENDING" },
  { label: "Confirmada", value: "CONFIRMED" },
  { label: "Cancelada", value: "CANCELLED" },
];

export const statusOptionsWithAll = [
  { label: "Todos", value: "" },
  ...statusOptions,
];

export const formatOptions = [
  { label: "Sentado", value: "SEATED" },
  { label: "Cóctel", value: "COCKTAIL" },
];

export const formatOptionsWithAll = [
  { label: "Todos", value: "" },
  ...formatOptions,
];
