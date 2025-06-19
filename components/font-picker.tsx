import { getAvailableFonts } from '@remotion/google-fonts';
import React, { useCallback } from 'react';

type FontPickerProps = {
    handleChange: (fontFamily: string) => void;
};

export const FontPicker: React.FC<FontPickerProps> = ({ handleChange }) => {
    const newFonts = getAvailableFonts();

    const onChange = useCallback(
        async (e: React.ChangeEvent<HTMLSelectElement>) => {
            const fonts = newFonts[e.target.selectedIndex];

            // Load font information
            const loaded = await fonts.load();

            // Load the font itself
            const { fontFamily } = loaded.loadFont();

            handleChange(fontFamily);
        },
        [newFonts],
    );

    return (
        <div>
            <select onChange={onChange}>
                {newFonts.map((f) => {
                    return (
                        <option key={f.importName} value={f.importName}>
                            {f.fontFamily}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};