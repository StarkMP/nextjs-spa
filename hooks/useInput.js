import { useCallback, useState } from 'react';

export default function useInput(initialValue, callback) {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback(
        (e) => {
            const val = e.target.value;
    
            return callback ? callback(val, setValue) : setValue(val);
        },
        [callback]
    );

    const clear = useCallback(() => setValue(''), []);

    return { value, onChange, clear };
}