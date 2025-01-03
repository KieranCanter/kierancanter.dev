import React from 'react';

/**
 * LogoSVG Component
 * Renders a custom SVG logo with geometric shapes
 * Used as a visual identifier throughout the site
 */
const LogoSVG: React.FC = () => {
    return (
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1080 1080"
        >
            {/* Main diagonal line (left) */}
            <path d="M738.26,0h-285.24L0,540l453.02,540h285.24l-453.02-540L738.26,0ZM648.44,1058.61h-85L128.18,540,563.44,21.39h85L213.18,540l435.27,518.61Z"/>
            {/* Top right section */}
            <polygon points="761.64 302.85 835.75 302.85 920.75 302.85 923.26 302.85 992.63 302.85 738.56 0 738.25 0 702.42 42.71 899.7 277.77 814.7 277.77 659.93 93.36 595.78 169.82 707.39 302.85 761.64 302.85"/>
            {/* Bottom right section */}
            <polygon points="920.75 777.15 835.75 777.15 761.64 777.15 707.39 777.15 595.78 910.18 659.93 986.64 814.7 802.23 899.7 802.23 702.42 1037.29 738.25 1080 738.56 1080 992.63 777.15 923.26 777.15 920.75 777.15"/>
            {/* Center diamond */}
            <polygon points="595.78 455.25 524.68 540 595.78 624.75 666.89 540 595.78 455.25"/>
        </svg>
    )
}

export default LogoSVG;