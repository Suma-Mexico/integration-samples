/* eslint-disable @typescript-eslint/no-explicit-any */
const selectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color:
      state.isSelected || state.isFocused
        ? "var(--color-tag-sign-success)"
        : "var(--text-color-main)",
    backgroundColor: state.isFocused
      ? "var(--bg-tag-sign-success)"
      : "transparent",
  }),
  control: (provided: any) => ({
    ...provided,
    borderColor: "#cfc2fd",
    backgroundColor: "var(--bg-colot-input)",
    color: "var(--text-color-main)",
    boxShadow: "#64646f21 0px 1px 22px 0px",
  }),
  menuList: (provided: any) => ({ ...provided, height: "90px" }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--bg-colot-input)",
    position: "absolute",
    fontSize: "0.83rem",
  }),
  input: (provided: any) => ({ ...provided, color: "var(--text-color-main)" }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--text-color-main)",
    fontSize: "0.8rem",
  }),
};

export { selectStyles };
