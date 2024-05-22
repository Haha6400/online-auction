import React from 'react';
import { useMemo } from 'react';


export default function LicensePlateInput({ value, valueLength, onChange }) {
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            items.push(char);
        }
        return items;
    }, [value, valueLength]);


    const inputOnChange = (e, idx) => {
        const target = e.target;
        const targetValue = target.value.trim();
        const newValue =
            value.substring(0, idx) + targetValue + value.substring(idx + 1);

        const nextElementSibling = target.nextElementSibling;


        if (nextElementSibling && nextElementSibling instanceof HTMLInputElement) {
            nextElementSibling.focus();
        }
        onChange(newValue);

    };

    const inputOnKeyDown = (e) => {
        const target = e.target;
        const targetValue = target.value;
        target.setSelectionRange(0, targetValue.length);


        if (e.key !== 'Backspace' || target.value !== '') {
            return;
        }

        const previousElementSibling = target.previousElementSibling;

        if (previousElementSibling && previousElementSibling instanceof HTMLInputElement) {
            previousElementSibling.focus();
        }
    };

    const inputOnFocus = (e) => {
        const { target } = e;

        target.setSelectionRange(0, target.value.length);
    };


    return (
        <div className="lp-input-group">
            {valueItems.map((digit, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    className="lp-input"
                    value={digit}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            ))}
        </div>

    );
}
