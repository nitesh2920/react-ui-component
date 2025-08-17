import { useState } from "react";
import type { ChangeEvent } from "react";
import { Eye, EyeOff, X, AlertCircle } from "lucide-react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  type?: string;
  theme?: "light" | "dark";
}

const sizes = {
  sm: "text-sm h-9 px-3 py-2.5",
  md: "text-base h-11 px-4 py-3",
  lg: "text-lg h-14 px-5 py-4",
};

const variants = {
  filled: {
    light: "bg-gray-50 border border-gray-200 focus:border-blue-500",
    dark: "bg-gray-800 border border-gray-700 text-white focus:border-blue-400",
  },
  outlined: {
    light: "bg-white border-2 border-gray-200 focus:border-blue-500",
    dark: "bg-gray-900 border-2 border-gray-700  text-white focus:border-blue-400",
  },
  ghost: {
    light: "bg-transparent border border-transparent focus:border-blue-500",
    dark: "bg-transparent border border-transparent text-white focus:border-blue-400",
  },
};

export const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  showClearButton = false,
  showPasswordToggle = false,
  type = "text",
  theme = "light",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;
  const hasError = invalid || !!errorMessage;
  const themeClasses = variants[variant][theme];
  const sizeClasses = sizes[size];
  const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18;

  const clearInput = () =>
    onChange?.({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);

  return (
    <div className="w-full max-w-md mx-auto">
      {label && (
        <label
          className={`block mb-1 font-medium ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          } ${hasError ? "text-red-600 dark:text-red-400" : ""}`}
        >
          {label}
          {hasError && <AlertCircle className="inline ml-1 w-4 h-4" />}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            block w-full rounded-lg transition focus:outline-none focus:ring-2
            disabled:cursor-not-allowed disabled:opacity-50
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            ${sizeClasses} ${themeClasses}
            ${
              hasError
                ? "border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-950"
                : "focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
            }
            ${(showClearButton && value) || (showPasswordToggle && type === "password")
              ? "pr-10"
              : ""}
          `}
        />

        {/* Clear Button */}
        {showClearButton && value && !disabled && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X size={iconSize} />
          </button>
        )}

        {/* Password Toggle */}
        {showPasswordToggle && type === "password" && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={iconSize} /> : <Eye size={iconSize} />}
          </button>
        )}
      </div>

      {/* Messages */}
      {hasError && errorMessage ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle size={14} /> {errorMessage}
        </p>
      ) : (
        helperText && (
          <p
            className={`mt-2 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
};

export default InputField;
