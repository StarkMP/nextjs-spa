import { useCallback, useState } from 'react';

export default function useModal() {
    const [active, setActive] = useState(false);

    const onClose = useCallback(() => setActive(false), []);

    return { active, setActive, onClose };
}