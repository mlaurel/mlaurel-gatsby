import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
    console.log('is Price onChange working?');
    return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
    return (
        <div>
            <h2>
                {type.title} {value && formatMoney(value / 100)}
            </h2>
            <p>{type.description}</p>
            <input
                type={type.name}
                value={value}
                onChange={(event) =>
                    onChange(createPatchFrom(event.target.value))
                }
                ref={inputComponent}
            />
        </div>
    );
}

PriceInput.focus = function () {
    this._inputElement.focus();
};
