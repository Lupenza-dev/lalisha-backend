import { Input } from '@/components/ui/input';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Input>, 'type' | 'inputMode' | 'value' | 'onChange'> & {
    value: string | number;
    onValueChange: (value: string) => void;
};

function normalizeMoneyInput(value: string): string {
    const cleaned = value.replace(/,/g, '').replace(/[^\d.]/g, '');
    const [whole = '', ...decimalParts] = cleaned.split('.');

    if (decimalParts.length === 0) {
        return whole;
    }

    return `${whole || '0'}.${decimalParts.join('').slice(0, 2)}`;
}

export function MoneyInput({ value, onValueChange, ...props }: Props) {
    return (
        <Input
            {...props}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            onChange={(event) => onValueChange(normalizeMoneyInput(event.target.value))}
        />
    );
}
