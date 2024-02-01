'use client'

import useWindowDimensions from '@/hooks/useDimensions';
import React from 'react'

type Props = {
    customHeight?: number;
}

export default function LoadingMask({ customHeight }: Props) {

    const { height } = useWindowDimensions();

    const getMinHeight = (): number => {
        if (customHeight) {
            return customHeight;
        } else if (height) {
            return height - 160;
        }
        return 0;
    }

    return (
        <div className="flex items-center justify-center bg-gray-200" style={{
            minHeight: getMinHeight(),
        }}>
            <div className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-indigo-600 border-r-indigo-600 rounded-full w-14 h-14 mb-10"></div>
        </div>
    )
}
