import { useState } from 'react';

export default function useButton() {
    const [loading, setLoading] = useState(false);

    return { loading, setLoading };
}