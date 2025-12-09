import React from 'react';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, value, onValueChange, className, ...props }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        // Remove all non-digits
        const digits = inputValue.replace(/\D/g, '');

        if (!digits) {
            onValueChange('');
            return;
        }

        // Convert to currency format
        const numberValue = parseInt(digits) / 100;

        const formatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(numberValue);

        onValueChange(formatted);
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${className}`}
                placeholder="R$ 0,00"
                {...props}
            />
        </div>
    );
};
